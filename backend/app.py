from flask import Flask, render_template, request, redirect, url_for, jsonify
import yfinance as yf

app = Flask(__name__)

@app.route('/portfoliooverview')
def portfolio_overview():
    return jsonify()

#Information on instruments currently in Portfolio
@app.route('/portfolioinstrument/<string:instrumenttype>/<string:ticker>')
def portfolio_equity(ticker):
    return jsonify()

#Add new instrument to Portfolio
@app.route('/addinstrument/<string:instrumenttype>/<ticker>')
def portfolio_add_equity(ticker):
    return jsonify()

#Remove instrument from Portfolio
@app.route('/delinstrument/<string:instrumenttype>/<ticker>')
def portfolio_del_equity(ticker):
    return jsonify()

#Search for instrument
@app.route('/searchinstrument/<string:instrumenttype>/', methods=['GET'])
def search_equity():
    query = request.args.get('query')
    return jsonify()

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



if __name__ == '__main__':
    app.run(debug=True)