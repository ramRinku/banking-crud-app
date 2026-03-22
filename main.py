from database import create_table
from crud import *

def menu():
    print("\n--- Banking System ---")
    print("1. Create Account")
    print("2. View Accounts")
    print("3. Update Account")
    print("4. Delete Account")
    print("5. Exit")

create_table()

while True:
    menu()
    choice = input("Enter choice: ")

    if choice == "1":
        name = input("Enter name: ")
        balance = float(input("Enter balance: "))
        create_account(name, balance)
        print("Account created!")

    elif choice == "2":
        accounts = get_accounts()
        for acc in accounts:
            print(acc)

    elif choice == "3":
        acc_id = int(input("Enter account ID: "))
        name = input("Enter new name: ")
        balance = float(input("Enter new balance: "))
        update_account(acc_id, name, balance)
        print("Updated!")

    elif choice == "4":
        acc_id = int(input("Enter account ID: "))
        delete_account(acc_id)
        print("Deleted!")

    elif choice == "5":
        break

    else:
        print("Invalid choice")