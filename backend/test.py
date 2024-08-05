from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from data import datafunctions as data_func

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
print ({
    'cash': cash_sum,
    'bond': bonds_sum,
    'stock': stocks_sum
})