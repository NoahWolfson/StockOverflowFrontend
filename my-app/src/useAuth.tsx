import React, { createContext, useContext, useState } from 'react';
import { AuthType } from './Interfaces/AuthType';

interface AuthContextType {
    isAuthenticated: AuthType;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<AuthType>>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
/**
 * the purpose of this component is to have isAuthenticated be used as a globel variable in order that the nav bar will be updated to either logged in or log out depedning on if there is an account logged 
 * in or not. This solution is brought by ChatGPT
 * @returns 
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState({isAuth: "", picStr: ""});

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};