import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PiDotsNineBold } from "react-icons/pi";
import Link from "next/link";

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
        <div className="flex">
          <div className="text-center justify-center">
            <Link
              href={"/"}
              className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
            >
              <PiDotsNineBold className="w-full scale-150" />
            </Link>
          </div>
          <div className="w-screen h-12">
            <h1 className="px-3 w-fit h-12 text-xl leading-[48px]">Tools</h1>
          </div>
        </div>
        <div className="flex">
          <div className="w-16">
            <Sidebar />
          </div>
          <div className="w-full rounded-md overflow-hidden shadow-customShadow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
