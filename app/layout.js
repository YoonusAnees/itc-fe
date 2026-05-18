import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "ITC Gold House",
  description: "Luxury Gold Jewelry",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}