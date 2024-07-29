from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime
import enum

from .database import Base

#PYDANTIC DATA SCHEMA
# Enum for transaction type
class TransactionType(enum.Enum):
    BUY = "buy"
    SELL = "sell"

# Base class for all transactions
class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    type = Column(Enum(TransactionType), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

    __mapper_args__ = {
        'polymorphic_identity': 'transaction',
        'polymorphic_on': type
    }

    def __repr__(self):
        return f"<Transaction(id={self.id}, type={self.type}, date={self.date})>"

# Stock subclass of Transaction
class Stock(Transaction):
    __tablename__ = 'stocks'

    id = Column(Integer, ForeignKey('transactions.id'), primary_key=True)
    ticker = Column(String(10), nullable=False)
    volume = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': TransactionType.BUY
    }

    def __repr__(self):
        return (f"<Stock(id={self.id}, ticker={self.ticker}, volume={self.volume}, "
                f"price={self.price}, type={self.type}, date={self.date})>")

# Bond subclass of Transaction
class Bond(Transaction):
    __tablename__ = 'bonds'

    id = Column(Integer, ForeignKey('transactions.id'), primary_key=True)
    name = Column(String(50), nullable=False)
    face_value = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': TransactionType.SELL
    }

    def __repr__(self):
        return (f"<Bond(id={self.id}, name={self.name}, face_value={self.face_value}, "
                f"interest_rate={self.interest_rate}, type={self.type}, date={self.date})>")

# Portfolio class
class Portfolio(Base):
    __tablename__ = 'portfolios'

    id = Column(Integer, primary_key=True)
    cash_amount = Column(Float, nullable=False, default=0.0)
    transactions = relationship('Transaction', backref='portfolio', lazy='dynamic')

    def add_transaction(self, transaction):
        self.transactions.append(transaction)

    def remove_transaction(self, transaction):
        self.transactions.remove(transaction)

    def __repr__(self):
        return f"<Portfolio(id={self.id}, cash_amount={self.cash_amount})>"

def get_engine(uri):
    return create_engine(uri)

def create_tables(engine):
    Base.metadata.create_all(engine)
