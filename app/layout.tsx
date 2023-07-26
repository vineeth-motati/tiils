import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tools",
  description: "Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <div className="flex">
            <Topbar />
          </div>
          <div className="flex">
            <Sidebar side="left" />
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
