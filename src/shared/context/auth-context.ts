"use client";
import { createContext, useContext} from "react";
import type { User } from "@/features/auth/api/types";

export interface IAuthContext {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  fetchMe: () => Promise<void>;
  logout: () => void;
  addSelectedCourse: (courseId: string) => void;
  removeSelectedCourse: (courseId: string) => void;
};

export const AuthCtx = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};