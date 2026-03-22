import React, { useState, useEffect } from 'react';
import { accountsAPI } from '../api/client';
import './EditAccountForm.css';

function EditAccountForm({ account, onAccountUpdated, onCancel }) {
    const [formData, setFormData] = useState({
        name: account.name,
        balance: account.balance,
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

            const response = await accountsAPI.update(account.id, {
                name: formData.name,
                balance: parseFloat(formData.balance),
            });

            setSuccess(true);

            // Notify parent component
            if (onAccountUpdated) {
                onAccountUpdated(response.data);
            }

            // Close form after 1 second
            setTimeout(() => {
                onCancel();
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to update account');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-account-form">
            <div className="edit-form-container">
                <h2>Edit Account #{account.id}</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Account updated successfully!</div>}
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
                        <label htmlFor="balance">Balance:</label>
                        <input
                            type="number"
                            id="balance"
                            name="balance"
                            value={formData.balance}
                            onChange={handleChange}
                            placeholder="Enter balance"
                            step="0.01"
                            min="0"
                            disabled={loading}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={loading} className="btn-save">
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                        <button type="button" onClick={onCancel} disabled={loading} className="btn-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAccountForm;
