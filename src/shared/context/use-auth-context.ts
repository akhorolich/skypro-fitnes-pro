"use client";

import { useContext } from "react";
import { AuthCtx } from "./auth-context";

export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context)
    throw new Error("useAuth использутся вне своего контекста AuthProvider");
  return context;
};
