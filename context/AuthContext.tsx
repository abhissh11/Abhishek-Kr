"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface UserProfile {
  email: string;
  name?: string;
  picture?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  authenticated: boolean;
  loading: boolean;
  login: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  checkSession: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkSession = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    } catch (err) {
      console.error("Failed to check auth session:", err);
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Authentication failed.";
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      setUser(data.user);
      setAuthenticated(true);
      toast.success("Welcome back, Admin!");
      return { success: true };
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        return { success: false, error: "Sign-in popup was closed before completing." };
      }
      const errorMsg = error.message || "Failed to sign in.";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await firebaseSignOut(auth);
      setUser(null);
      setAuthenticated(false);
      toast.info("Logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  return (
    <AuthContext.Provider
      value={{ user, authenticated, loading, login, logout, checkSession }}
    >
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

