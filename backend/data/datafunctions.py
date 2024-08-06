import sqlite3
import yfinance as yf

db_conn = sqlite3.connect('portfolio.db', check_same_thread=False)
db_cursor = db_conn.cursor()

# returns a dictionary of the relevant info needed for front end stock info 
# if stock does not have dividend, yield is '-'
def get_stock_info(ticker):
    yf_ticker = yf.Ticker(ticker)
    info = yf_ticker.info
    bid = info['bid']
    ask = info['ask']
    open = info['open']
    price = round((bid+ask)/2, 2)
    if 'dividendYield' in info.keys():
        div_yield = info['dividendYield']
    else:
        div_yield = '-'
    year_low = info['fiftyTwoWeekLow']
    year_high = info['fiftyTwoWeekHigh']
    if 'trailingPE' in info.keys():
        trailing_PE = info['trailingPE']
    else:
        trailing_PE = '-' 
    return_info = {
        'price': price,
        'dividendYield': div_yield,
        '52-wk-low': year_low,
        '52-wk-high': year_high,
        'trailing_PE': trailing_PE,
        'open': open
    }
    return return_info

# returns a dataframe with the date as the index and close price in column 'Close'
# period options ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max']
def get_stock_price_history(ticker, period):
    yf_ticker = yf.Ticker(ticker)
    price_hist_df = yf_ticker.history(period=period)
    return price_hist_df['Close']

def createdb():
    db_cursor.execute((
        "CREATE TABLE transactions ("
            "transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "transaction_type TEXT NOT NULL CHECK (transaction_type IN ('buy', 'sell')),"
            "instrument_type TEXT NOT NULL CHECK (instrument_type IN ('stock', 'bond', 'cash')),"
            "transaction_date DATE NOT NULL"
        ");"
    ))
    db_cursor.execute((
        "CREATE TABLE stocks ("
            "stock_id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "transaction_id INTEGER NOT NULL,"
            "ticker TEXT NOT NULL,"
            "volume INTEGER NOT NULL,"
            "price DECIMAL(10, 2) NOT NULL,"
            "FOREIGN KEY (transaction_id) REFERENCES transactions (transaction_id)"
        ");"
    ))
    db_cursor.execute((
        "CREATE TABLE bonds ("
            "bond_id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "transaction_id INTEGER NOT NULL,"
            "name TEXT NOT NULL,"
            "face_value DECIMAL(10, 2) NOT NULL,"
            "interest_rate DECIMAL(5, 2) NOT NULL,"
            "FOREIGN KEY (transaction_id) REFERENCES transactions (transaction_id)"
        ");"
    ))
    db_cursor.execute((
        "CREATE TABLE cash ("
            "cash_id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "transaction_id INTEGER NOT NULL,"
            "amount DECIMAL(10, 2) NOT NULL,"
            "FOREIGN KEY (transaction_id) REFERENCES transactions (transaction_id)"
        ");"
    ))
    db_cursor.execute(("""
    CREATE TABLE current_holdings (
        holding_id INTEGER PRIMARY KEY AUTOINCREMENT,
        instrument_type TEXT NOT NULL CHECK (instrument_type IN ('stock', 'bond', 'cash')),
        ticker TEXT,
        name TEXT,
        number_of_shares INTEGER,
        average_price_paid DECIMAL(10, 2),
        face_value DECIMAL(10, 2),
        amount DECIMAL(10, 2)
    );"""
    ))
    db_cursor.execute(("""
    CREATE TABLE holdings_history (
        date DATE PRIMARY KEY DEFAULT GETDATE,
        cash DECIMAL(10,2) NOT NULL,
        bonds DECIMAL(10,2) NOT NULL,               
        stocks DECIMAL(10,2) NOT NULL
    );"""
    ))
    # insert into holding table a cash row initialized to 0
    db_cursor.execute(f"""
    INSERT INTO current_holdings (instrument_type, amount)
    VALUES ('cash', 0);
    """ )
    db_conn.commit()
    

def fetch_investment_summary():
    pass

def fetch_market_overview():
    pass

def fetch_portfolio_stock():
    pass

def fetch_portfolio_bond():
    pass

def fetch_stock_holdings():
    pass

def fetch_bond_holding():
    pass

# returns a tuple of the reccord returned fields are: stock_id, transaction_id, ticker, volume, price
def fetch_last_transaction(table):
    if table == 'cash':
        id = 'cash'
    else:
        id = table[:-1]
    db_cursor.execute(f"""
        SELECT * FROM {table} ORDER BY {id}_id DESC LIMIT 1
        """)
    results = db_cursor.fetchone()
    return results 

def fetch_current_holdings():
    db_cursor.execute(f"""
        SELECT * FROM current_holdings 
        """)
    results = db_cursor.fetchall()
    return results 

def insert_holdings_history(cash_sum, bonds_sum, stocks_sum):
    # insert row into holdings history  
    db_cursor.execute(f"""
    INSERT INTO holdings_history (date, cash, bonds, stocks)
    VALUES (DATE(now), {cash_sum}, {bonds_sum}, {stocks_sum});
    """)
    db_conn.commit()
    
def fetch_holdings_history():
    db_cursor.execute(f"""
        SELECT * FROM holdings_history ORDER BY date
        """)
    results = db_cursor.fetchall()
    return results 

def fetch_transactions():
    db_cursor.execute(f"""
        SELECT t.transaction_id, transaction_type, instrument_type, transaction_date, amount, ticker, volume, price, name, face_value, interest_rate 
            FROM transactions as t
                LEFT JOIN cash as c on t.transaction_id = c.transaction_id 
                LEFT JOIN stocks as s on t.transaction_id = s.transaction_id
                LEFT JOIN bonds as b on t.transaction_id = b.transaction_id
        """)
    results = db_cursor.fetchall()
    return results 

def fetch_stock_in_current_holdings(ticker):
    db_cursor.execute(f"""
        SELECT * FROM current_holdings
        WHERE ticker = {ticker}
        """)
    results = db_cursor.fetchone()
    return results 

def buy_stock(ticker, num_shares, price):
    # insert transaction into transaction table
    db_cursor.execute(f"""
    INSERT INTO transactions (transaction_type, instrument_type, transaction_date)
    VALUES ('buy' ,'stock', DATE('now'));
    """ )
    db_conn.commit()
    # insert purchase into stocks table
    db_cursor.execute(f"""
    INSERT INTO stocks (transaction_id, ticker, volume, price)
    VALUES (last_insert_rowid() , '{ticker}', {num_shares}, {price});
    """  )
    db_conn.commit()
    # insert row into holdings if row for ticker does not exist 
    db_cursor.execute(f"""
    INSERT INTO current_holdings (instrument_type, ticker, number_of_shares, average_price_paid)
    SELECT 'stock', '{ticker}', 0, 0
    WHERE NOT EXISTS (SELECT 1 FROM current_holdings WHERE ticker = '{ticker}');
    """)
    db_conn.commit()
    # updates values in holding table 
    db_cursor.execute(f"""
    UPDATE current_holdings
    SET number_of_shares = {num_shares} + number_of_shares,
        average_price_paid = ((number_of_shares*average_price_paid) + ({num_shares}*{price}))/({num_shares}+number_of_shares)
    WHERE ticker = '{ticker}';
    """)
    db_conn.commit()
    # update cash holdings
    db_cursor.execute(f"""
    UPDATE current_holdings
    SET amount = amount - ({num_shares}*{price})
    WHERE instrument_type = 'cash';
    """)
    db_conn.commit()
    return ({'status': "success",
             'rows_impacted': db_cursor.rowcount})

def buy_bond():
    pass

def sell_stock(ticker, num_shares, price):
    # insert transaction into transaction table
    db_cursor.execute(f"""
    INSERT INTO transactions (transaction_type, instrument_type, transaction_date)
    VALUES ('sell' ,'stock', DATE('now'));
    """ )
    db_conn.commit()
    # insert sale into stocks table
    db_cursor.execute(f"""
    INSERT INTO stocks (transaction_id, ticker, volume, price)
    VALUES (last_inset_rowid() , '{ticker}', {num_shares}, {price});
    """  )
    db_conn.commit()
    # updates values in holding table 
    db_cursor.execute(f"""
    UPDATE current_holdings
    SET number_of_shares = number_of_shares - {num_shares}
    WHERE ticker = '{ticker}';
    """)
    db_conn.commit()
    # removes row if no holding 
    db_cursor.execute(f"""
    DELETE FROM current_holdings
    WHERE number_of_shares = 0;
    """)
    db_conn.commit()
    # update cash holding 
    db_cursor.execute(f"""
    UPDATE current_holdings
    SET amount = amount + ({num_shares} * {price})
    WHERE instrument_type = cash;
    """)
    db_conn.commit()
    return ({'status': "success",
             'rows_impacted': db_cursor.rowcount})
    

def sell_bond():
    pass

def add_cash(amount):
    # update cash in holdings 
    db_cursor.execute(f"""
    UPDATE current_holdings
    SET amount = amount + {amount}
    WHERE instrument_type = 'cash';
    """)
    db_conn.commit()
    # add to transaction table
    db_cursor.execute(f"""
    INSERT INTO transactions (transaction_type, instrument_type, transaction_date)
    VALUES ('buy' ,'cash', DATE('now'));
    """ )
    db_conn.commit()
    # add to cash table 
    db_cursor.execute(f"""
    INSERT INTO cash (transaction_id, amount)
    VALUES (last_insert_rowid(), {amount});
    """ )
    db_conn.commit()
    return ({'status': "success",
             'rows_impacted': db_cursor.rowcount})

def remove_cash(amount):
    # update cash in holdings 
    db_cursor.execute(f"""
    UPDATE current_holdings
    SET amount = amount - {amount}
    WHERE instrument_type = 'cash';
    """)
    db_conn.commit()
    # add to transaction table
    db_cursor.execute(f"""
    INSERT INTO transactions (transaction_type, instrument_type, transaction_date)
    VALUES ('sell' ,'cash', DATE('now'));
    """ )
    db_conn.commit()
    # add to cash table 
    db_cursor.execute(f"""
    INSERT INTO cash (transaction_id, amount)
    VALUES (last_inset_rowid(), {amount});
    """ )
    db_conn.commit()
    return ({'status': "success",
             'rows_impacted': db_cursor.rowcount})
