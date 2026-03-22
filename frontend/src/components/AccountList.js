import React, { useState, useEffect } from 'react';
import { accountsAPI } from '../api/client';
import EditAccountForm from './EditAccountForm';
import './AccountList.css';

function AccountList() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingAccount, setEditingAccount] = useState(null);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await accountsAPI.getAll();
            setAccounts(response.data);
        } catch (err) {
            setError('Failed to fetch accounts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (account) => {
        setEditingAccount(account);
    };

    const handleAccountUpdated = (updatedAccount) => {
        setAccounts(accounts.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc));
        setEditingAccount(null);
    };

    const handleEditCancel = () => {
        setEditingAccount(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                await accountsAPI.delete(id);
                setAccounts(accounts.filter(acc => acc.id !== id));
            } catch (err) {
                setError('Failed to delete account');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading accounts...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="account-list">
            <h2>Accounts</h2>
            {accounts.length === 0 ? (
                <p className="no-accounts">No accounts found</p>
            ) : (
                <table className="accounts-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(account => (
                            <tr key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.name}</td>
                                <td>${account.balance.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(account)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(account.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button className="btn-refresh" onClick={fetchAccounts}>
                Refresh
            </button>
            {editingAccount && (
                <EditAccountForm
                    account={editingAccount}
                    onAccountUpdated={handleAccountUpdated}
                    onCancel={handleEditCancel}
                />
            )}
        </div>
    );
}

export default AccountList;
