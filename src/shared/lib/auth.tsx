"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import type { User } from "@/features/auth/api/types";
import { authApi } from "@/features/auth/api/auth";

type AuthContextType = {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  fetchMe: () => Promise<void>;
  logout: () => void;
  addSelectedCourse: (courseId: string) => void;
  removeSelectedCourse: (courseId: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (typeof window !== "undefined") {
      if (user) {
        // store only identifier (email) to localStorage
        window.localStorage.setItem("user", user.email);
      } else {
        window.localStorage.removeItem("user");
      }
    }
  };

  const fetchMe = useCallback(async () => {
    try {
      const res = await authApi.me();
      setUser(res.user);
    } catch (err) {
      setUser(null);
    }
  }, []);

  const relogin = () => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("token");
    if (token) fetchMe();
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    }
    setUserState(null);
  };

  const addSelectedCourse = (courseId: string) => {
    setUserState((prev) => {
      if (!prev) return prev;
      if (prev.selectedCourses.includes(courseId)) return prev;
      return { ...prev, selectedCourses: [...prev.selectedCourses, courseId] };
    });
  };

  const removeSelectedCourse = (courseId: string) => {
    setUserState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        selectedCourses: prev.selectedCourses.filter((c) => c !== courseId),
      };
    });
  };

  React.useEffect(() => {
    relogin();
  }, []);

  const value: AuthContextType = {
    user,
    isAuth: Boolean(user),
    setUser,
    fetchMe,
    logout,
    addSelectedCourse,
    removeSelectedCourse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
