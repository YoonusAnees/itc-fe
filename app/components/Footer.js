import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16 mt-auto">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/">
            <div className="w-[150px] h-[50px] bg-white rounded-lg p-2 mb-6">
              <img src="/icon.jpg" alt="ITC Gold House" className="w-full h-full object-contain" />
            </div>
          </Link>
          <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
            Premium handcrafted gold jewelry with timeless elegance.
            Discover rings, necklaces, chains, bangles and bridal collections.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wider text-[#d4af37]">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/products?featured=true" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-6 tracking-wider text-[#d4af37]">Contact</h3>
          <ul className="space-y-4 text-gray-400">
            <li>123 Luxury Avenue, Suite 400</li>
            <li>Gold District, NY 10001</li>
            <li className="mt-4"><a href="tel:+94770000000" className="hover:text-white transition-colors">+94 77 000 0000</a></li>
            <li><a href="mailto:inquiries@itcgoldhouse.com" className="hover:text-white transition-colors">inquiries@itcgoldhouse.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} ITC Gold House. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
