from database import connect_db

# CREATE
def create_account(name, balance):
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO accounts (name, balance) VALUES (?, ?)", (name, balance))

    conn.commit()
    conn.close()

# READ
def get_accounts():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM accounts")
    data = cursor.fetchall()

    conn.close()
    return data

# UPDATE
def update_account(account_id, name, balance):
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE accounts SET name=?, balance=? WHERE id=?",
        (name, balance, account_id)
    )

    conn.commit()
    conn.close()

# DELETE
def delete_account(account_id):
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM accounts WHERE id=?", (account_id,))

    conn.commit()
    conn.close()