import React, { useState } from 'react';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';
import './App.css';

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleAccountCreated = () => {
        // Trigger refresh of the account list
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="App">
            <header className="app-header">
                <h1>🏦 Banking System</h1>
                <p>Manage your accounts with ease</p>
            </header>
            <main className="app-main">
                <AccountForm onAccountCreated={handleAccountCreated} />
                <AccountList key={refreshTrigger} />
            </main>
            <footer className="app-footer">
                <p>&copy; 2024 Banking System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
