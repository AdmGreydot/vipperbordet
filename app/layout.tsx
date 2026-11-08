import type { Metadata } from "next";
import { Kalam, Libertinus_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Vipperbordet – Stabilitet til borde i caféer og restauranter",
  description:
    "Undgå borde, der vipper. Bestil praktiske bordkiler til caféer, restauranter, hoteller og virksomheder.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da" className={`${kalamFont.variable} ${libertinusSerif.variable}`}>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
