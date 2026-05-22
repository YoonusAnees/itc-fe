import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "ITC Gold House",
  description: "Luxury Gold Jewelry",
};

export default function RootLayout({ children }) {
    return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`flex min-h-screen flex-col ${playfair.variable} ${outfit.variable} font-sans`}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}