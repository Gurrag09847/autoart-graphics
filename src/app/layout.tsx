import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/ui/toaster";
import { Toaster as SonnerToaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "AutoArt Graphics",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Navbar />
          <main className="pt-16 pb-4 mx-auto min-h-screen">
          {children}
          </main>
          <Toaster />
          <SonnerToaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
