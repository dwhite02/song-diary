import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useAuth } from './contexts/AuthContext'; // Adjust the path as needed
import SongEntry from './components/SongEntry';
import Login from './components/Login';

const AppRoutes = () => {
    const { isLoggedIn } = useAuth(); // Access the authentication context

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <SongEntry /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            {/* Add other routes as needed */}
        </Routes>
    );
};

export default AppRoutes;

