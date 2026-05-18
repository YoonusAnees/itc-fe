"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useQuotationStore } from "../lib/quotationStore";

export default function Navbar() {
    const items = useQuotationStore((state) => state.items);

    return (
        <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <Link href="/" className="text-2xl font-black tracking-wide">
                    <div className="w-[150px] h-[50px]">
                        <img src="./icon.jpg" alt="ITC Gold House" className="w-full h-full object-contain">
                        </img>
                    </div>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/" className="text-gray-600 hover:text-black">
                        Home
                    </Link>
                    
                    <Link href="/products" className="text-gray-600 hover:text-black">
                        Products
                    </Link>

                    <Link href="/products?featured=true" className="text-gray-600 hover:text-black">
                        New Arrivals
                    </Link>

                    <Link href="/about" className="text-gray-600 hover:text-black">
                        About Us
                    </Link>
                    
                    <Link href="/contact" className="text-gray-600 hover:text-black">
                        Contact Us
                    </Link>

                    <Link
                        href="/quotation"
                        className="relative flex items-center gap-2 text-gray-600 hover:text-black"
                    >
                        <ShoppingBag size={18} />
                        Quotation

                        {items.length > 0 && (
                            <span className="absolute -right-5 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-black">
                                {items.length}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}