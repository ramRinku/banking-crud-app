import React, { useState } from 'react';
import { accountsAPI } from '../api/client';
import './AccountForm.css';

function AccountForm({ onAccountCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        balance: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            // Validate inputs
            if (!formData.name.trim()) {
                setError('Name is required');
                return;
            }
            if (!formData.balance || isNaN(formData.balance) || parseFloat(formData.balance) < 0) {
                setError('Balance must be a valid positive number');
                return;
            }

            const response = await accountsAPI.create({
                name: formData.name,
                balance: parseFloat(formData.balance),
            });

            setSuccess(true);
            setFormData({ name: '', balance: '' });

            // Notify parent component
            if (onAccountCreated) {
                onAccountCreated(response.data);
            }

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create account');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="account-form">
            <h2>Create New Account</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Account created successfully!</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Account Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter account name"
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="balance">Initial Balance:</label>
                    <input
                        type="number"
                        id="balance"
                        name="balance"
                        value={formData.balance}
                        onChange={handleChange}
                        placeholder="Enter initial balance"
                        step="0.01"
                        min="0"
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
}

export default AccountForm;
