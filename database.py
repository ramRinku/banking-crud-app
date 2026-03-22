import sqlite3

def connect_db():
    conn = sqlite3.connect("bank.db")
    return conn

def create_table():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL NOT NULL
    )
    """)

    conn.commit()
    conn.close()