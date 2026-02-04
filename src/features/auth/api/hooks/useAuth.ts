"use client";
import { useState } from "react";
import { authApi } from "../auth";
import type { LoginRequest, RegisterRequest } from "../types";
import { ApiError } from "@/shared/api/client";
import { useAuth } from "@/shared/context/use-auth-context";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchMe } = useAuth();

  const login = async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      await fetchMe();
      return data;
    } catch (err) {
      const requestError = err as ApiError;
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.me();
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      const requestError = err as ApiError;
      setError(requestError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, getMe, loading, error } as const;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(payload: RegisterRequest) {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (err) {
      const requestError = err as ApiError;
      setError(requestError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { register, loading, error } as const;
}
