import type { Metadata } from "next";
import { Kalam, Libertinus_Serif, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const kalamFont = Kalam({
  weight:"700",
  variable: "--font-kalam",
  subsets: ["latin"],
});
const libertinusSerif = Libertinus_Serif({
  weight:["400", "700"],
  variable: "--font-libertinus",
  subsets: ["latin"],
});
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vipperbordet",
  description: "En lille løsning når bordet vipper",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${kalamFont.variable} ${libertinusSerif.variable} ${libreBaskerville.variable}`}>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
