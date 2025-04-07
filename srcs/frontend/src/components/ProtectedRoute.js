import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

const ProtectedRoute = ({ children }) => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        console.log("No access token, redirecting to login");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
