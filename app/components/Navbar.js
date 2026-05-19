"use client";

import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { useQuotationStore } from "../lib/quotationStore";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
                className="w-48 xl:w-64 rounded-full border border-gray-200 bg-white px-4 py-2 pr-10 text-sm outline-none focus:border-[#d4af37] focus:bg-white transition-all placeholder:text-gray-400"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#d4af37]">
                <Search size={16} />
            </button>
        </form>
    );
}

function NavLinks() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isFeatured = searchParams.get("featured") === "true";

    const getLinkClass = (path, checkFeatured = false) => {
        let isActive = false;
        
        if (path === "/") {
            isActive = pathname === "/";
        } else if (path === "/products" && !checkFeatured) {
            isActive = pathname.startsWith("/products") && !isFeatured;
        } else if (path === "/products?featured=true" || checkFeatured) {
            isActive = pathname.startsWith("/products") && isFeatured;
        } else {
            isActive = pathname.startsWith(path);
        }

        return `transition-colors ${isActive ? "text-[#d4af37]" : "hover:text-[#d4af37]"}`;
    };

    return (
        <nav className="hidden lg:flex items-center gap-8 mx-8 font-medium text-sm">
            <Link href="/" className={getLinkClass("/")}>
                Home
            </Link>

            <Link href="/products" className={getLinkClass("/products")}>
                Products
            </Link>

            <Link href="/products?featured=true" className={getLinkClass("/products?featured=true", true)}>
                New Arrivals
            </Link>

            <Link href="/about" className={getLinkClass("/about")}>
                About Us
            </Link>

            <Link href="/contact" className={getLinkClass("/contact")}>
                Contact
            </Link>
        </nav>
    );
}

import { motion } from "framer-motion";

export default function Navbar() {
    const items = useQuotationStore((state) => state.items);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white/50 backdrop-blur-md text-black" : "glass-effect text-white"
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="shrink-0">
                    <div className="w-[140px] h-[45px]">
                        <img 
                            src={isScrolled ? "/ITC black.png" : "/ITC white.png"} 
                            alt="ITC Gold House" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                </Link>

                <Suspense fallback={<nav className="hidden lg:flex items-center gap-8 mx-8 font-medium text-sm"></nav>}>
                    <NavLinks />
                </Suspense>

                <div className="flex items-center gap-6">
                    <Suspense fallback={<div className="w-48 xl:w-64 h-[38px] rounded-full bg-gray-100/50 hidden md:block animate-pulse"></div>}>
                        <SearchInput />
                    </Suspense>

                    <Link
                        href="/quotation"
                        className="relative flex items-center gap-2 hover:text-[#d4af37] transition-colors font-medium text-sm group"
                    >
                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                        Quotation

                        {items.length > 0 && (
                            <span className="absolute -right-5 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-black shadow-lg">
                                {items.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}