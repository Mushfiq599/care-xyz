import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Care.xyz - Trusted Care Services",
  description: "Find trusted babysitting, elderly care, and home care services.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-256.png", sizes: "256x256", type: "image/png" },
    ]
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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