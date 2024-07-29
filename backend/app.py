from flask import Flask, render_template, request, redirect, url_for, jsonify

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

if __name__ == '__main__':
    app.run(debug=True)