import React, { createContext, useContext, useState } from 'react';

// this holds access token and a way to update it:
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// import { AuthContext } from './AuthProvider';

// a small helper to avoid repeating useContext(AuthContext) everywhere:
export const useAuth = () => useContext(AuthContext);
