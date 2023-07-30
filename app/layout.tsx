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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${inter.className}`}>
        <UserProvider loginUrl="" profileUrl="">
          <Topbar />
          <div className="flex">
            <Sidebar />
            <section className="z-10 flex w-full h-auto overflow-auto rounded-md">
              {children}
            </section>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
