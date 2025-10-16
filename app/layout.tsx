import type { Metadata } from "next";
import "./globals.css";
import { Amiri, Lato } from "next/font/google";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri"
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato"
});

export const metadata: Metadata = {
  title: "Neomorphic Oasis | Login",
  description:
    "Login to the Neomorphic Oasis application, inspired by Islamic architectural artistry and crafted for accessible, modern interactions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${amiri.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
