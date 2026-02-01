import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { ToastContainer } from "react-toastify";
import { CoursesProvider } from "./providers/coursesProvider";
import { Suspense } from "react";

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
          <Header />
          <CoursesProvider>
            <Suspense fallback={<p>Loading...</p>}><div id="page">{children}</div></Suspense>
          </CoursesProvider>
          <ToastContainer className="notifications" />
        </main>
      </body>
    </html>
  );
}
