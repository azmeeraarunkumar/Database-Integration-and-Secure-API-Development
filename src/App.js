import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                Loading Application...
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    {currentUser
                        ? "Sports Management Dashboard"
                        : "Sports Management Portal - Login"}
                </h1>
            </header>

            <main>
                {!currentUser ? (
                    <LoginPage />
                ) : (
                    <HomePage />
                )}
            </main>
        </div>
    );
}

export default App;