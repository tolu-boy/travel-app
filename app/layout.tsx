import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Go paddi",
  description: "Travel app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
          {/* Top Header */}
          <Header />

          {/* Sidebar + Page Content Wrapper */}
          <div className="flex">
            <Sidebar />

            <ReactQueryProvider>
            <main className="flex-1 p-4 min-h-screen">{children}</main>
          </ReactQueryProvider>
            {/* Main Content Area */}
          </div>
      </body>
    </html>

  );
}
