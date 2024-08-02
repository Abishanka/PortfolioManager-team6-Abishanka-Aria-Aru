from flask import Flask, render_template, request, redirect, url_for, jsonify
from data import datafunctions as data_func

app = Flask(__name__)

@app.route('/portfoliooverview')
def portfolio_overview():
    return jsonify()

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
        return {'status': 'fail - NOT IMPL',
                    'last_transaction': False}

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
        return {'status': 'fail - NOT IMPL',
                    'last_transaction': False}

#Search for instrument
@app.route('/searchinstrument/<string:instrumenttype>/', methods=['GET'])
def search_equity():
    query = request.args.get('query')
    return jsonify()

if __name__ == '__main__':
    app.run(debug=True)