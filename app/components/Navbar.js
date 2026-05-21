"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useQuotationStore } from "../lib/quotationStore";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function SearchInput({ className = "relative hidden md:block", onSearch }) {
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
        if (onSearch) onSearch();
    };

    return (
        <form onSubmit={handleSearch} className={className}>
            <input
                type="text"
                placeholder="Search jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-48 xl:w-64 rounded-full border border-gray-200 bg-white px-4 py-2 pr-10 text-sm text-black outline-none focus:border-[#d4af37] focus:bg-white transition-all placeholder:text-gray-400"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#d4af37]">
                <Search size={16} />
            </button>
        </form>
    );
}

function NavLinks({ className = "hidden lg:flex items-center gap-8 mx-8 font-medium text-sm", onItemClick }) {
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
        <nav className={className}>
            <Link href="/" className={getLinkClass("/")} onClick={onItemClick}>
                Home
            </Link>

            <Link href="/products" className={getLinkClass("/products")} onClick={onItemClick}>
                Products
            </Link>

            <Link href="/products?featured=true" className={getLinkClass("/products?featured=true", true)} onClick={onItemClick}>
                New Arrivals
            </Link>

            <Link href="/about" className={getLinkClass("/about")} onClick={onItemClick}>
                About Us
            </Link>

            <Link href="/contact" className={getLinkClass("/contact")} onClick={onItemClick}>
                Contact
            </Link>
        </nav>
    );
}

import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const items = useQuotationStore((state) => state.items);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Close mobile menu on desktop resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen
                    ? "bg-white/95 backdrop-blur-md text-black shadow-sm"
                    : "bg-white/95 text-black lg:glass-effect lg:text-white"
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-[120px] h-[40px] md:w-[140px] md:h-[45px]">
                        <img 
                            src={isScrolled || isMobileMenuOpen ? "/ITC black.png" : "/ITC white.png"} 
                            alt="ITC Gold House" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                </Link>

                <Suspense fallback={<nav className="hidden lg:flex items-center gap-8 mx-8 font-medium text-sm"></nav>}>
                    <NavLinks />
                </Suspense>

                <div className="flex items-center gap-4 md:gap-6">
                    <Suspense fallback={<div className="w-48 xl:w-64 h-[38px] rounded-full bg-gray-100/50 hidden md:block animate-pulse"></div>}>
                        <SearchInput />
                    </Suspense>

                    <Link
                        href="/quotation"
                        className="relative flex items-center gap-2 hover:text-[#d4af37] transition-colors font-medium text-sm group"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Quotation</span>

                        {items.length > 0 && (
                            <span className="absolute -right-3 sm:-right-5 -top-2 sm:-top-3 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] sm:text-xs font-bold text-black shadow-lg">
                                {items.length}
                            </span>
                        )}
                    </Link>

                    <button 
                        className="lg:hidden p-1 hover:text-[#d4af37] transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white text-black border-t border-gray-100 overflow-hidden shadow-xl"
                    >
                        <div className="px-6 py-6 flex flex-col gap-6">
                            <div className="md:hidden">
                                <Suspense fallback={<div className="h-10"></div>}>
                                    <SearchInput className="relative block w-full" onSearch={() => setIsMobileMenuOpen(false)} />
                                </Suspense>
                            </div>
                            <Suspense fallback={<div></div>}>
                                <NavLinks 
                                    className="flex flex-col gap-4 font-medium text-sm text-gray-800" 
                                    onItemClick={() => setIsMobileMenuOpen(false)} 
                                />
                            </Suspense>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}