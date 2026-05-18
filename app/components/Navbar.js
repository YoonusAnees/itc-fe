"use client";

import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { useQuotationStore } from "../lib/quotationStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const query = searchParams.get("search");
        setSearchQuery(query || "");
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/products');
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative hidden md:block">
            <input 
                type="text" 
                placeholder="Search jewelry..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-64 rounded-full border border-gray-200 bg-white/50 px-4 py-2 pr-10 text-sm outline-none focus:border-[#d4af37] focus:bg-white transition-all placeholder:text-gray-400"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#d4af37]">
                <Search size={16} />
            </button>
        </form>
    );
}

export default function Navbar() {
    const items = useQuotationStore((state) => state.items);

    return (
        <header className="sticky top-0 z-50 glass-effect">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="shrink-0">
                    <div className="w-[140px] h-[45px]">
                        <img src="/icon.jpg" alt="ITC Gold House" className="w-full h-full object-contain">
                        </img>
                    </div>
                </Link>

                <nav className="hidden lg:flex items-center gap-8 mx-8 font-medium text-sm">
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
                    
                    <Link href="/contact" className="text-gray-600 hover:text-[#d4af37] transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-6">
                    <Suspense fallback={<div className="w-48 xl:w-64 h-[38px] rounded-full bg-gray-100/50 hidden md:block animate-pulse"></div>}>
                        <SearchInput />
                    </Suspense>

                    <Link
                        href="/quotation"
                        className="relative flex items-center gap-2 text-gray-600 hover:text-[#d4af37] transition-colors font-medium text-sm"
                    >
                        <ShoppingBag size={18} />
                        Quotation

                        {items.length > 0 && (
                            <span className="absolute -right-5 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-black">
                                {items.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}