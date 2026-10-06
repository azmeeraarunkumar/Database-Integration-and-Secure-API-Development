import React, { useState } from 'react';
import { loginUser } from '../services/api';

function LoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        try {
            const response = await loginUser({
                user: userId,
                password: password
            });

            if (response.data && response.data.session_token) {
                localStorage.setItem(
                    'session_token',
                    response.data.session_token
                );

                console.log('Login successful');

                // Reload the app so AuthContext detects the new token
                window.location.reload();
            } else {
                setError('Login successful, but no token received.');
            }

        } catch (err) {
            console.error('Login error:', err);

            if (err.response) {
                setError(
                    err.response.data?.error ||
                    `Login failed: ${err.response.status}`
                );
            } else {
                setError('Cannot connect to backend server.');
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>

            <form onSubmit={handleLogin} style={styles.form}>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        Member ID:
                    </label>

                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        Password:
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                {error && (
                    <p style={styles.error}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    style={styles.button}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        gap: '15px'
    },

    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },

    label: {
        marginBottom: '5px',
        fontWeight: 'bold'
    },

    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    },

    button: {
        padding: '10px 15px',
        backgroundColor: '#6a1b9a',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    },

    error: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center'
    }
};

export default LoginPage;