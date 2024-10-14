import React, { useState } from 'react';
import { Button } from '@mui/material';
import fetchData from '../services/fetchService';
import ConfirmDialog from './ConfirmDialog'; // Import the ConfirmDialog component
import { useAuth } from '../contexts/AuthContext'; // Import the Auth context
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Logout = ({ onLogout }) => {
    const { logout } = useAuth(); // Access the logout function from context
    const [confirmOpen, setConfirmOpen] = useState(false);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogout = async () => {
        try {
            await fetchData('/account/logout', 'POST');
            logout(); // Call the logout function from context

            // Redirect to the login page after logout
            navigate('/login'); // Adjust the path if needed
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => setConfirmOpen(true)}>
                Logout
            </Button>
            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
            />
        </>
    );
};

export default Logout;



