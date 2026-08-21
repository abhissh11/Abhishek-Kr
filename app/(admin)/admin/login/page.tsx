"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function AdminLoginPage() {
  const { authenticated, loading, login } = useAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && authenticated) {
      router.push("/admin/dashboard");
    }
  }, [authenticated, loading, router]);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      const res = await login();
      if (res.success) {
        router.push("/admin/dashboard");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <p className="text-neutral-400">Loading authentication status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-neutral-900/80 border border-neutral-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Admin Portal
          </h2>
          <p className="text-sm text-neutral-400">
            Single-Admin Google Authentication
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoggingIn}
            className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 border border-neutral-700 rounded-xl shadow-sm bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="w-5 h-5" />
            <span>
              {isLoggingIn ? "Authenticating..." : "Sign in with Google"}
            </span>
          </button>
        </div>

        <p className="text-xs text-center text-neutral-500 pt-4">
          Protected route. Unauthorized login attempts are rejected server-side.
        </p>
      </div>
    </div>
  );
}