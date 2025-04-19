import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/common/MainLayout";


export const metadata: Metadata = {
  title: "Book Store",
  description: "A simple book store app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <MainLayout>
          {children}
        </MainLayout>
        
      </body>
    </html>
  );
}
