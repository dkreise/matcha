import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// this holds access token and a way to update it:
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [accessToken, setAccessToken] = useState(null);
    const [accessToken, setAccessToken] = useState(() => {
        return localStorage.getItem('accessToken') || null;
    });

    const logout = async () => {
        try {
            await axios.get('/api/auth/logout', { withCredentials: true });
            setAccessToken(null);
            localStorage.removeItem('accessToken');
            window.location.href = '/login'; // safer than navigate when called outside components
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// import { AuthContext } from './AuthProvider';

// a small helper to avoid repeating useContext(AuthContext) everywhere:
export const useAuth = () => useContext(AuthContext);
