from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from data import datafunctions as data_func

app = Flask(__name__)
CORS(app)

# returns list of dictionary with keys: date, cash, bonds, stocks, total --- holdings history
@app.route('/portfoliooverview')
def portfolio_overview():
    holdings_history = data_func.fetch_holdings_history()
    # holdings history is list of tuple (date, cash, bonds, stocks)
    holdings_history_list = []
    for entry in holdings_history:
        entry_dict = {
            'date': entry[0],
            'cash': entry[1],
            'bonds': entry[2],
            'stocks': entry[3],
            'total': entry[1] + entry[2] + entry[3]
        }
        holdings_history_list.append(entry_dict)
    filtered_holdings_history_list = holdings_history_list[::20]

    return jsonify(holdings_history_list)

# call at 4 pm everyday -- saves current value of holdings into holdings_history table
@app.route('/saveHoldings')
def save_holdings():
    current_holdings = data_func.fetch_current_holdings()
    # current holdings is list of tuple (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount)
    stocks_sum = 0
    bonds_sum = 0 
    cash_sum = 0
    for entry in current_holdings:
        match entry[1]:
            case 'cash':
                cash_sum += entry[7]
            case 'bond':
                bonds_sum += entry[7]
            case 'stock':
                stocks_sum += (entry[4]*entry[5])
            case _:
                pass
    data_func.insert_holdings_history(cash_sum, bonds_sum, stocks_sum)
    return jsonify()

# returns dictionary of summary of holdings with keys: cash, bond, stock
@app.route('/currentholdingssum')
def current_holdings_sum():
    current_holdings = data_func.fetch_current_holdings()
    # current holdings is list of tuple (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount)
    stocks_sum = 0
    bonds_sum = 0 
    cash_sum = 0
    for entry in current_holdings:
        match entry[1]:
            case 'cash':
                cash_sum += float(entry[7])
            case 'bond':
                bonds_sum += entry[7]
            case 'stock':
                stock_info = data_func.get_stock_info(entry[2])
                stocks_sum += (float(entry[4])*float(stock_info['price']))
            case _:
                pass
    return ({
        'cash': round(float(cash_sum), 2),
        'bond': round(bonds_sum, 2),
        'stock': round(stocks_sum, 2)
    })

# returns dictionary with field net_cash_deposits
@app.route('/netcashdeposits')
def net_cash_deposits():
    net_cash_deposits = data_func.fetch_net_cash_deposits()
    return ({
        'net_cash_deposits': net_cash_deposits[0]
    })

# returns list of dictionary of current holdings 
@app.route('/currentholdings')
def current_holdings():
    current_holdings = data_func.fetch_current_holdings()
    holdings = []
    # current holdings is tuple (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount)
    for entry in current_holdings:
        instrument_type = entry[1]
        if instrument_type == 'stock':
            ticker = entry[2]
            avg_price_paid = entry[5]
            stock_info = data_func.get_stock_info(ticker)
            shares_owned = entry[4]
            market_value = round(shares_owned * stock_info['price'],2)
            todays_return = round((float(stock_info['price']-stock_info['open'])/float(stock_info['open']))*float(100), 2)
            total_return = round((float(stock_info['price']-float(avg_price_paid))/float(avg_price_paid))*float(100), 2)
            p_l = round((float(shares_owned) * float(stock_info['price'])) - (float(shares_owned)*float(avg_price_paid)), 2)
            holding_dict = {
                'ticker': ticker,
                'instrumentType': instrument_type,
                'sharesOwned': shares_owned,
                'marketValue': market_value,
                'currentPrice': stock_info['price'],    
                'todaysReturns': todays_return,   # percentage  
                'totalReturn': total_return, # percentage
                'p_l': p_l # nominal total retrun
            }
            holdings.append(holding_dict)
        elif instrument_type == 'bond':
            holding_dict = {
                'name': entry[3],
                'instrumentType': instrument_type,
                'face_value': entry[6],
                'amount': entry[7],
            }
            holdings.append(holding_dict)
        elif instrument_type == 'cash':
            holding_dict = {
                'instrumentType': instrument_type,
                'amount': entry[7],
            }
            holdings.append(holding_dict)
    return  (jsonify(holdings))

#Add new instrument to Portfolio
@app.route('/addinstrument/<string:instrumenttype>')
def portfolio_add_equity(instrumenttype):
    amount = float(request.args.get('amount'))
    
    if instrumenttype == 'stock':
        # get current stock price
        ticker = request.args.get('ticker')
        stock_info = data_func.get_stock_info(ticker)
        price = stock_info['price']
        results = data_func.buy_stock(ticker, amount, price)
        status = results['status']
        if status == 'Fail':
            return {'status': 'fail'}
        last_stock_transaction = data_func.fetch_last_transaction('stocks')
        if (last_stock_transaction[2] != ticker and last_stock_transaction[3] != amount):
            return {'status': 'fail',
                    'last_transaction': last_stock_transaction}
        return {'status': 'success',
                    'last_transaction': last_stock_transaction}
    elif instrumenttype == 'cash':
        data_func.add_cash(amount)
        last_cash_transaction = data_func.fetch_last_transaction('cash')
        if (last_cash_transaction[2] != amount):
            return {'status': 'fail',
                    'last_transaction': last_cash_transaction}
        return {'status': 'success',
                    'last_transaction': last_cash_transaction}
    else:
        # TODO: NOT IMPLEMENTED BOND 
        return ({'status': 'fail - NOT IMPL',
                    'last_transaction': False})

#Remove instrument from Portfolio
@app.route('/delinstrument/<string:instrumenttype>')
def portfolio_del_equity(instrumenttype):
    amount = float(request.args.get('amount'))
    
    if instrumenttype == 'stock':
        # get current stock price
        ticker = request.args.get('ticker')
        stock_info = data_func.get_stock_info(ticker)
        price = stock_info['price']
        results = data_func.sell_stock(ticker, amount, price)
        status = results['status']
        if status == 'Fail':
            return {'status': 'fail'}
        last_stock_transaction = data_func.fetch_last_transaction('stocks')
        if (last_stock_transaction[2] != ticker and last_stock_transaction[3] != amount):
            return {'status': 'fail',
                    'last_transaction': last_stock_transaction}
        return {'status': 'success',
                    'last_transaction': last_stock_transaction}
    elif instrumenttype == 'cash':
        data_func.remove_cash(amount)
        last_cash_transaction = data_func.fetch_last_transaction('cash')
        if (last_cash_transaction[2] != amount):
            return {'status': 'fail',
                    'last_transaction': last_cash_transaction}
        return {'status': 'success',
                    'last_transaction': last_cash_transaction}
    else:
        # TODO: NOT IMPLEMENTED BOND 
        return ({'status': 'fail - NOT IMPL',
                    'last_transaction': False})

# returns stock info and relevant info if stock is in holding
@app.route('/stockinfo')
def stock_info():
    ticker = request.args.get('ticker')
    stock_info = data_func.get_stock_info(ticker)
    in_holdings = data_func.fetch_stock_in_current_holdings(ticker)
    # none if record does not exist with ticker ; tuple (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount )
    if in_holdings == None or len(in_holdings) == 0:
        stock_info['in_holdings'] = False
    else:
        stock_info['in_holdings'] = True
        stock_info['number_of_shares'] = in_holdings[4]
        stock_info['average_price_paid'] = in_holdings[5]
        stock_info['p_l'] = round((float(in_holdings[4]) * float(stock_info['price'])) - (float(in_holdings[4])*float(in_holdings[5])), 2)

    return stock_info # {'price', 'dividendYield', '52-wk-low', '52-wk-high', 'trailing_PE', 'in_holding', 'number_of_shares', 'average_price_paid'}

# returns stock info and relevant info if stock is in holding
@app.route('/stockhistory')
def stock_chart():
    ticker = request.args.get('ticker')
    period = request.args.get('period') # period options ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max']
    stock_price_history = data_func.get_stock_price_history(ticker, period)
    return stock_price_history # {'time_date_list', 'time_min_list', 'price_list'} --- time list is null based on intraday or not 

# returns stock info and relevant info if stock is in holding
@app.route('/marketOverview')
def market_overview():
    # get sp500
    sp500_performance = data_func.get_stock_performance('^GSPC', ['YTD', '1d'])
    # get NASDAQ
    nasdaq_performance = data_func.get_stock_performance('^IXIC', ['YTD', '1d'])
    # get DJI
    dji_performance = data_func.get_stock_performance('^DJI', ['YTD', '1d'])
    
    return {
        'sp500': sp500_performance,
        'nasdaq': nasdaq_performance, 
        'dow_jones': dji_performance
    }

# returns list of dictionary with keys: transaction_id, transaction_type, instrument_type, transaction_date, amount, ticker, volume, price, name, face_value, interest_rate
@app.route('/transactions')
def transactions():
    transactions = data_func.fetch_transactions()
    transactions_list = []
    for entry in transactions:
        entry_dict = {
            'transaction_id': entry[0],
            'transaction_type': entry[1],
            'instrument_type': entry[2],
            'transaction_date': entry[3],
            'amount': entry[4],
            'ticker': entry[5],
            'volume': entry[6],
            'price': entry[7],
            'name': entry[8],
            'face_value': entry[9],
            'interest_rate': entry[10],
        }
        transactions_list.append(entry_dict)
    return jsonify(transactions_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)