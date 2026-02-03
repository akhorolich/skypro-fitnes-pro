import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@/components/ui/header";
import { ToastContainer } from "react-toastify";
import { CoursesProvider } from "./providers/coursesProvider";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "./providers/authProvider";

const RobotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Skypro Fitness Pro",
  description: "Fitness tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${RobotoSans.variable}`}>
        <main>
          <AuthProvider>
            <Header />
            <CoursesProvider>
              <Suspense fallback={<p>Loading...</p>}><div id="page">{children}</div></Suspense>
            </CoursesProvider>
            <ToastContainer className="notifications" />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
