import sqlite3

# Connect to the database (or create it)
conn = sqlite3.connect('../portfolio.db', check_same_thread=False)
db_cursor = conn.cursor()

# Clear data from tables
db_cursor.execute("DELETE FROM transactions;")
db_cursor.execute("DELETE FROM stocks;")
db_cursor.execute("DELETE FROM bonds;")
db_cursor.execute("DELETE FROM cash;")
db_cursor.execute("DELETE FROM current_holdings;")

transactions_data = [
    (1, 'buy', 'stock', '2024-01-15'), (2, 'sell', 'stock', '2024-01-20'),
    (3, 'buy', 'bond', '2024-02-01'), (4, 'buy', 'cash', '2024-02-10'),
    (5, 'sell', 'bond', '2024-03-05'), (6, 'buy', 'stock', '2024-03-15'),
    (7, 'buy', 'stock', '2024-03-20'), (8, 'sell', 'cash', '2024-04-01'),
    (9, 'buy', 'bond', '2024-04-10'), (10, 'sell', 'stock', '2024-04-15'),
    (11, 'buy', 'cash', '2024-04-20'), (12, 'buy', 'stock', '2024-04-25'),
    (13, 'sell', 'bond', '2024-05-01'), (14, 'buy', 'cash', '2024-05-05'),
    (15, 'buy', 'stock', '2024-05-10'), (16, 'sell', 'bond', '2024-05-15'),
    (17, 'buy', 'cash', '2024-05-20'), (18, 'sell', 'stock', '2024-05-25'),
    (19, 'buy', 'bond', '2024-06-01'), (20, 'buy', 'cash', '2024-06-05'),
    (21, 'buy', 'stock', '2024-06-10'), (22, 'sell', 'bond', '2024-06-15'),
    (23, 'buy', 'cash', '2024-06-20'), (24, 'sell', 'stock', '2024-06-25'),
    (25, 'buy', 'bond', '2024-07-01'), (26, 'buy', 'cash', '2024-07-05'),
    (27, 'buy', 'stock', '2024-07-10'), (28, 'sell', 'bond', '2024-07-15'),
    (29, 'buy', 'cash', '2024-07-20'), (30, 'sell', 'stock', '2024-07-25')
]

stocks_data = [
    (1, 1, 'AAPL', 50, 150.00), (2, 2, 'AAPL', 20, 155.00), (3, 6, 'GOOG', 10, 2800.00),
    (4, 7, 'MSFT', 30, 300.00), (5, 10, 'AAPL', 25, 160.00), (6, 12, 'AMZN', 15, 3300.00),
    (7, 15, 'GOOG', 5, 2850.00), (8, 18, 'AAPL', 40, 165.00), (9, 21, 'MSFT', 20, 305.00),
    (10, 24, 'GOOG', 8, 2900.00), (11, 27, 'AMZN', 12, 3350.00), (12, 30, 'AAPL', 30, 170.00)
]

bonds_data = [
    (1, 3, 'US Treasury', 1000.00, 1.50), (2, 5, 'US Treasury', 500.00, 1.50),
    (3, 9, 'Corporate Bond', 2000.00, 3.00), (4, 13, 'Municipal Bond', 1500.00, 2.50),
    (5, 16, 'US Treasury', 1000.00, 1.75), (6, 19, 'Corporate Bond', 2500.00, 3.50),
    (7, 22, 'Municipal Bond', 2000.00, 2.75), (8, 25, 'US Treasury', 1500.00, 2.00),
    (9, 28, 'Corporate Bond', 3000.00, 3.75)
]

cash_data = [
    (1, 4, 2000.00), (2, 8, 1500.00), (3, 11, 2500.00), (4, 14, 3000.00),
    (5, 17, 3500.00), (6, 20, 4000.00), (7, 23, 4500.00), (8, 26, 5000.00),
    (9, 29, 5500.00)
]

current_holdings_data = [
    (1, 'stock', 'AAPL', 'Apple', 30, 150.67, None, None),
    (2, 'stock', 'GOOG', 'Alphabet', 10, 2800.00, None, None),
    (4, 'cash', None, None, None, None, None, 2000.00),
    (5, 'stock', 'MSFT', 'Micro', 50, 300.00, None, None),
    (6, 'stock', 'AMZN', 'Amazon', 15, 3300.00, None, None),
    (9, 'cash', None, None, None, None, None, 4000.00)
]

# Insert data into tables
db_cursor.executemany("INSERT INTO transactions (transaction_id, transaction_type, instrument_type, transaction_date) VALUES (?, ?, ?, ?);", transactions_data)
db_cursor.executemany("INSERT INTO stocks (stock_id, transaction_id, ticker, volume, price) VALUES (?, ?, ?, ?, ?);", stocks_data)
db_cursor.executemany("INSERT INTO bonds (bond_id, transaction_id, name, face_value, interest_rate) VALUES (?, ?, ?, ?, ?);", bonds_data)
db_cursor.executemany("INSERT INTO cash (cash_id, transaction_id, amount) VALUES (?, ?, ?);", cash_data)
db_cursor.executemany("INSERT INTO current_holdings (holding_id, instrument_type, ticker, name, number_of_shares, average_price_paid, face_value, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", current_holdings_data)

# Commit the transaction
conn.commit()

# Close the connection
conn.close()