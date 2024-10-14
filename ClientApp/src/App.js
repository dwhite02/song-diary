import React from 'react';
import { AuthProvider } from './contexts/AuthContext'; // Adjust the path as needed
import AppRoutes from './AppRoutes'; // Ensure you're importing correctly
import Layout from './components/Layout';
import './custom.css';

const App = () => {
    return (
        <AuthProvider>
            <Layout>
                <AppRoutes /> {/* Render routes directly here */}
            </Layout>
        </AuthProvider>
    );
};

export default App;

