"use client"

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface DecodedToken {
    id: string;
    email: string;
    role: "CUSTOMER" | "ORGANIZER";
    username: string;
    referralCode: string;
}

interface AuthContextProps {
    isLoggedIn: boolean;
    user: DecodedToken | null;
    login: (token: string) => void;
    logout: () => void;
    switchRole: () => Promise<void>
    isAuthChecked: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

// 2. Buat Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<DecodedToken | null>(null)
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setUser(decoded);
                setIsLoggedIn(true);
            } catch (err) {
                console.error("Invalid token:", err);
                Cookies.remove("token");
            }
        }
        setIsAuthChecked(true);
    }, []);

    const login = (token: string) => {
        Cookies.set("token", token);
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded)
        setIsLoggedIn(true);
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsLoggedIn(false);
    };

    const switchRole = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3030/auth/switch-role",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            const newToken = res.data.token;
            Cookies.set("token", newToken);
            const decoded = jwtDecode<DecodedToken>(newToken);
            setUser(decoded);
        } catch (error) {
            console.error("Failed to switch role:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                login,
                logout,
                switchRole,
                isAuthChecked,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook untuk akses context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return context;
};
