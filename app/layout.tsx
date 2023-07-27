import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { getCurrentUser } from "@/lib/session";

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
  const session = await getCurrentUser();
  console.log(session);
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <div className="flex">
            <Topbar />
          </div>
          <div className="flex">
            <Sidebar side="left" session={session} />
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
