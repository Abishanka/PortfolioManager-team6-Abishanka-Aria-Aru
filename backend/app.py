from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

@app.route('/portfoliooverview')
def portfolio_overview():
    return jsonify()

#Information on instruments currently in Portfolio
@app.route('/portfolioinstrument/equity/<ticker>')
def portfolio_equity(ticker):
    return jsonify()

@app.route('/portfolioinstrument/bond/<ticker>')
def portfolio_bond(ticker):
    return jsonify()

@app.route('/portfolioinstrument/cash/<ticker>')
def portfolio_cash(ticker):
    return jsonify()

#Add new instrument to Portfolio
@app.route('/addinstrument/equity/<ticker>')
def portfolio_add_equity(ticker):
    return jsonify()

@app.route('/addinstrument/bond/<ticker>')
def portfolio_add__bond(ticker):
    return jsonify()

@app.route('/addinstrument/cash/<ticker>')
def portfolio_add__cash(ticker):
    return jsonify()

#Remove instrument from Portfolio
@app.route('/delinstrument/equity/<ticker>')
def portfolio_del_equity(ticker):
    return jsonify()

@app.route('/delinstrument/bond/<ticker>')
def portfolio_del__bond(ticker):
    return jsonify()

@app.route('/delinstrument/cash/<ticker>')
def portfolio_del__cash(ticker):
    return jsonify()

#Search for instrument
@app.route('/searchinstrument/equity/', methods=['GET'])
def search_equity():
    query = request.args.get('query')
    return jsonify()

@app.route('/searchinstrument/bond/', methods=['GET'])
def search_bond():
    query = request.args.get('query')
    return jsonify()

@app.route('/searchinstrument/cash/', methods=['GET'])
def search_cash():
    query = request.args.get('query')
    return jsonify()




if __name__ == '__main__':
    app.run(debug=True)