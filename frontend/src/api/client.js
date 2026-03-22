import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Accounts API
export const accountsAPI = {
    getAll: () => apiClient.get('/accounts'),
    getById: (id) => apiClient.get(`/accounts/${id}`),
    create: (data) => apiClient.post('/accounts', data),
    update: (id, data) => apiClient.put(`/accounts/${id}`, data),
    delete: (id) => apiClient.delete(`/accounts/${id}`),
};

export default apiClient;
