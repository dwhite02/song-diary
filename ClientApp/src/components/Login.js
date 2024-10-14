import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import fetchData from '../services/fetchService';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const { login } = useAuth(); // Access the login function from context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogin = async (demo = false) => {
        setLoading(true);
        setError('');

        try {
            const loginData = demo
                ? { username: 'demouser', password: 'Password123!' }
                : { username, password };

            const result = await fetchData('/account/login', 'POST', loginData);

            if (result && result.message) {
                // Call the login function from context to set user data
                login(result); // Pass the full result in case you want to use more data later

                // Redirect to the entries page after successful login
                navigate('/'); // Adjust the path to where your entries component is routed
            }
        } catch (err) {
            // If the error response is JSON, display the message
            if (err.response && err.response.message) {
                setError(err.response.message);
            } else {
                // For other errors, use the default error message
                setError(JSON.parse(err.message).message || 'An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: 300, margin: 'auto', textAlign: 'center', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                margin="normal"
                disabled={loading}
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                disabled={loading}
            />
            {error && <Typography color="error">{error}</Typography>}
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleLogin()}
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleLogin(true)} // Demo login
                        sx={{ mt: 1 }}
                    >
                        Login as Demo User
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Login;
