import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import CustomCursor from "@/components/CustomCursor";
import { DataProvider } from "@/context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Domain & Hosting Manager",
  description: "Premium Domain Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} cursor-none`}>
        <DataProvider>
          <SmoothScroll>
            <CustomCursor />
            <Intro />
            <Header />
            <main className="min-h-screen pt-24 px-10">
              {children}
            </main>
          </SmoothScroll>
        </DataProvider>
      </body>
    </html>
  );
}
