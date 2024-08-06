from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from data import datafunctions as data_func

app = Flask(__name__)
CORS(app)

# returns list of dictionary with keys: date, cash, bonds, stocks, total
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
                cash_sum += entry[7]
            case 'bond':
                bonds_sum += entry[7]
            case 'stock':
                stocks_sum += (entry[4]*entry[5])
            case _:
                pass
    return ({
        'cash': cash_sum,
        'bond': bonds_sum,
        'stock': stocks_sum
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
            todays_return = round((stock_info['price']-stock_info['open'])/stock_info['open'], 2)
            total_return = round((stock_info['price']-avg_price_paid)/avg_price_paid, 2)
            holding_dict = {
                'ticker': ticker,
                'instrumentType': instrument_type,
                'sharesOwned': shares_owned,
                'marketValue': market_value,
                'currentPrice': stock_info['price'],    
                'todaysReturns': todays_return,   # percentage  
                'totalReturn': total_return, # percentage
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
    amount = request.args.get('amount')
    
    if instrumenttype == 'stock':
        # get current stock price
        ticker = request.args.get('ticker')
        stock_info = data_func.get_stock_info(ticker)
        price = stock_info['price']
        data_func.buy_stock(ticker, amount, price)
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
    amount = request.args.get('amount')
    
    if instrumenttype == 'stock':
        # get current stock price
        ticker = request.args.get('ticker')
        stock_info = data_func.get_stock_info(ticker)
        price = stock_info['price']
        data_func.sell_stock(ticker, amount, price)
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

### ------ duplicate endpoint ------- 
# #Search for instrument
# @app.route('/searchinstrument/<string:instrumenttype>/', methods=['GET'])
# def search_equity():
#     ticker = request.args.get('ticker')
#     stock_info = data_func.get_stock_info(ticker)
#     return (stock_info)

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
    return stock_info # {'price', 'dividendYield', '52-wk-low', '52-wk-high', 'trailing_PE', 'in_holding', 'number_of_shares', 'average_price_paid'}

# TODO: make endpoint for transaction history
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