"use client";
import { authApi } from "@/features/auth/api/auth";
import { User } from "@/features/auth/api/types";
import { AuthCtx, IAuthContext } from "@/shared/context/auth-context";
import React, { useCallback, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (typeof window !== "undefined") {
      if (user) {
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
    if (token) {
      fetchMe();
      return;
    }
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

  const value: IAuthContext = {
    user,
    isAuth: Boolean(user),
    setUser,
    fetchMe,
    logout,
    addSelectedCourse,
    removeSelectedCourse,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
