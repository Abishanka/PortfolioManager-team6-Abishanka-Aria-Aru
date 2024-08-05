from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from data import datafunctions as data_func

app = Flask(__name__)
CORS(app)

@app.route('/portfoliooverview')
def portfolio_overview():
    return jsonify()

@app.route('/currentholdingssum')
def current_holdings_sum():
    current_holdings = data_func.fetch_current_holdings
    # current holdings is tuple (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount)
    stocks_sum = 0
    bonds_sum = 0 
    cash_sum = 0
    for entry in current_holdings:
        match entry[1]:
            case 'cash':
                cash_sum += entry[7]
            case 'bonds':
                bonds_sum += entry[7]
            case 'stocks':
                stocks_sum += (entry[4]*entry[5])
            case _:
                pass
    return ({
        'cash': cash_sum,
        'bond': bonds_sum,
        'stock': stocks_sum
    })

# TODO: market value, todays returns as percent, total return as percentage, current 
@app.route('/currentholdings')
def current_holdings():
    current_holdings = data_func.fetch_current_holdings()
    holdings = []
    # current holdings is tuple (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount)
    for entry in current_holdings:
        holding_dict = {
            'instrument_type': entry[1],
            'ticker': entry[2],
            'name': entry[3],
            'number_of_shares': entry[4],
            'average_price_paid': entry[5],
            'face_value': entry[6],
            'amount': entry[7]
        }
        holdings.append(holding_dict)
    return ({
        'holdings': holdings,
    })

@app.route('/stockinfo')
def stock_info():
    ticker = request.args.get('ticker')
    stock_info = data_func.get_stock_info(ticker)
    return stock_info # {'price', 'dividendYield', '52-wk-low', '52-wk-high', 'trailing_PE'}

#Information on instruments currently in Portfolio
@app.route('/portfolioinstrument/<string:instrumenttype>/<string:ticker>')
def portfolio_equity(instrumenttype, ticker):
    return jsonify()

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

#Search for instrument
@app.route('/searchinstrument/<string:instrumenttype>/', methods=['GET'])
def search_equity():
    ticker = request.args.get('ticker')
    stock_info = data_func.get_stock_info(ticker)
    return (stock_info)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)