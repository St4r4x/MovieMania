import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/src/components/auth-provider/AuthProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "MoviaMania",
   description: "The best place to find your favorite movies",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={nunito.className} style={{ backgroundImage: "var(--body-background-gradient)" }}>
            <AuthProvider>{children}</AuthProvider>
         </body>
      </html>
   );
}
