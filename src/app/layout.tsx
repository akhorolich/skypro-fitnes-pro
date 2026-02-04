import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@/components/ui/header";
import { Suspense } from "react";
import { Providers } from "./providers";
import "./globals.css";

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
          <Providers>
            <Header />
            <Suspense fallback={<p>Loading...</p>}>
              <div id="page">{children}</div>
            </Suspense>
          </Providers>
        </main>
      </body>
    </html>
  );
}
