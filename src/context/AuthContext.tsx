"use client"

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface Coupon {
    id: number;
    code: string;
    discount: number;
    expiresAt: string;
}

interface Point {
    id: number;
    userId: number;
    amount: number;
    expiredAt: string;
}

interface DecodedToken {
    id: number;
    email: string;
    role: "CUSTOMER" | "ORGANIZER";
    username: string;
    referralCode: string;
    coupons: Coupon[];
    userPoints: Point[];
    profileImg: string;
}

interface AuthContextProps {
    isLoggedIn: boolean;
    user: DecodedToken | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    switchRole: () => Promise<void>
    refreshUser: () => Promise<void>
    isAuthChecked: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

// 2. Buat Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<DecodedToken | null>(null)
    const [isAuthChecked, setIsAuthChecked] = useState(false)
    const [token, setToken] = useState<string | null>(Cookies.get("token") || null);

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
        setToken(token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);
    };


    const refreshUser = async () => {
        const token = Cookies.get("token");
        if (!token) return;

        try {
            const res = await axios.patch(
                "http://localhost:3030/auth/profile-img/refresh",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newToken = res.data?.data?.token;
            if (newToken) {
                // Simpan token baru ke cookie
                Cookies.set("token", newToken, { path: "/" });

                // Decode dan update user di context
                const decoded = jwtDecode<DecodedToken>(newToken);
                setUser(decoded);
                setToken(newToken);
            } else {
                console.warn("No token returned from refresh endpoint");
            }
        } catch (err) {
            console.error("Failed to refresh user:", err);
        }
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
            setToken(newToken);
        } catch (error) {
            console.error("Failed to switch role:", error);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                token,
                login,
                logout,
                switchRole,
                refreshUser,
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
