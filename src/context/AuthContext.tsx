"use client"

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthChecked: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

// 2. Buat Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthChecked, setIsAtuhChecked] = useState(false)

    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
        setIsAtuhChecked(true);
    }, []);

    const login = (token: string) => {
        Cookies.set("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        Cookies.remove("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isAuthChecked }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook untuk akses context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
