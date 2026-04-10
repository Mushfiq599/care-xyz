import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Care.xyz - Trusted Care Services",
  description: "Find trusted babysitting, elderly care, and home care services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}