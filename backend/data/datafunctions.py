import sqlite3
import yfinance as yf

db_conn = sqlite3.connect('portfolio.db')
db_cursor = db_conn.cursor()

# returns a dictionary of the relevant info needed for front end stock info 
def get_stock_info(ticker):
    yf_ticker = yf.Ticker(ticker)
    info = yf_ticker.info
    bid = info['bid']
    ask = info['ask']
    price = round((bid+ask)/2, 2)
    div_yield = info['dividendYield']
    year_low = info['fiftyTwoWeekLow']
    year_high = info['fiftyTwoWeekHigh']
    trailing_PE = info['trailingPE']
    return_info = {
        'price': price,
        'dividendYield': div_yield,
        '52-wk-low': year_low,
        '52-wk-high': year_high,
        'trailing_PE': trailing_PE
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

def buy_stock():
    pass

def buy_bond():
    pass

def sell_stock():
    pass

def sell_bond():
    pass

def add_cash():
    pass

def remove_cash():
    pass
