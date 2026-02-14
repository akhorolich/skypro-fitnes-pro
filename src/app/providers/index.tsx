'use client';
import { CoursesProvider } from "./coursesProvider";
import { AuthProvider } from "./authProvider";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CoursesProvider>
        {children}
        <ToastContainer className="notifications" />
      </CoursesProvider>
    </AuthProvider>
  );
}
