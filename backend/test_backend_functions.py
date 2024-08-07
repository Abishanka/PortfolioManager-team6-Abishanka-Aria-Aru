#%%
# from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from data import datafunctions as data_func

#%%
# TEST CURRENT HOLDINGS
current_holdings = data_func.fetch_current_holdings()
# current holdings is tuple (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount)
stocks_sum = 0
bonds_sum = 0 
cash_sum = 0
for entry in current_holdings:
    instrument_type = entry[1]
    match instrument_type:
        case 'cash':
            cash_sum += entry[7]
        case 'bond':
            bonds_sum += entry[7]
        case 'stock':
            stocks_sum += (entry[4]*entry[5])
        case _:
            pass
print ({
    'cash': cash_sum,
    'bond': bonds_sum,
    'stock': stocks_sum
})
# %%
# ADD CASH
amount = 900
data_func.add_cash(amount)
last_cash_transaction = data_func.fetch_last_transaction('cash')
print({'status': 'success', 'last_transaction': last_cash_transaction})
# %%
## BUY STOCK

ticker = 'TSLA'
amount = 8

stock_info = data_func.get_stock_info(ticker)
price = stock_info['price']
data_func.buy_stock(ticker, amount, price)
last_stock_transaction = data_func.fetch_last_transaction('stocks')
print({'status': 'success',
            'last_transaction': last_stock_transaction})
# %%

## HOLDINGS HISTORY
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
print ((holdings_history_list))

# %%
