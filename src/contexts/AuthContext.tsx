"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  LoginApiResponse,
  RegisterApiResponse,
  Merchant,
} from "@/store/services/authService";
import { getCookie, deleteCookie } from "cookies-next/client";

interface AuthContextType {
  authData: LoginApiResponse | RegisterApiResponse | null;
  merchant: Merchant | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuthData: (data: LoginApiResponse | RegisterApiResponse) => void;
  setRegisterData: (data: RegisterApiResponse) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setAuthDataState] = useState<
    LoginApiResponse | RegisterApiResponse | null
  >(null);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuthData = localStorage.getItem("authData");
      if (savedAuthData) {
        try {
          const parsed = JSON.parse(savedAuthData) as
            | LoginApiResponse
            | RegisterApiResponse;
          setAuthDataState(parsed);
          setMerchant(parsed.data.merchant);
          if ("token" in parsed.data && parsed.data.token) {
            setToken(parsed.data.token);
          }
        } catch (error) {
          console.error("Error parsing saved auth data:", error);
        }
      }
    }
  }, []);

  const setAuthData = (data: LoginApiResponse | RegisterApiResponse) => {
    setAuthDataState(data);
    setMerchant(data.data.merchant);
    if ("token" in data.data && data.data.token) {
      setToken(data.data.token);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("authData", JSON.stringify(data));
    }
  };

  const setRegisterData = (data: RegisterApiResponse) => {
    setAuthDataState(data);
    setMerchant(data.data.merchant);
    if (data.data.token) {
      setToken(data.data.token);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("authData", JSON.stringify(data));
    }
  };

  const clearAuthData = () => {
    setAuthDataState(null);
    setMerchant(null);
    setToken(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("authData");
    }

    // Clear cookies
    deleteCookie("token");
    deleteCookie("refreshToken");
  };

  const isAuthenticated = !!token && !!merchant;

  return (
    <AuthContext.Provider
      value={{
        authData,
        merchant,
        token,
        isAuthenticated,
        setAuthData,
        setRegisterData,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
