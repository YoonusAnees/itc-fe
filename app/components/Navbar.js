"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useQuotationStore } from "../lib/quotationStore";
import {
    useRouter,
    useSearchParams,
    usePathname,
} from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";

function SearchInput({ className = "relative hidden md:block", onSearch }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef(null);
    const queryParam = searchParams.get("search") || "";

    const handleSearch = (e) => {
        e.preventDefault();
        const val = inputRef.current?.value?.trim() || "";
        if (val) {
            router.push(`/products?search=${encodeURIComponent(val)}`);
        } else {
            router.push("/products");
        }
        if (onSearch) onSearch();
    };

    return (
        <form onSubmit={handleSearch} className={className}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search jewelry..."
                defaultValue={queryParam}
                className="w-full md:w-40 lg:w-44 xl:w-56 rounded-full border border-gray-200 bg-white px-4 py-2 pr-10 text-sm text-black outline-none focus:border-[#d4af37] transition-all placeholder:text-gray-400"
            />

            <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#d4af37]"
            >
                <Search size={16} />
            </button>
        </form>
    );
}

function NavLinks({
    className = "hidden lg:flex items-center gap-5 xl:gap-8 mx-4 xl:mx-8 font-medium text-sm",
    onItemClick,
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isFeatured = searchParams.get("featured") === "true";

    const getLinkClass = (path, checkFeatured = false) => {
        let isActive = false;

        if (path === "/") {
            isActive = pathname === "/";
        } else if (path === "/products" && !checkFeatured) {
            isActive =
                pathname.startsWith("/products") && !isFeatured;
        } else if (
            path === "/products?featured=true" ||
            checkFeatured
        ) {
            isActive =
                pathname.startsWith("/products") && isFeatured;
        } else {
            isActive = pathname.startsWith(path);
        }

        return `transition-colors whitespace-nowrap ${
            isActive
                ? "text-[#d4af37]"
                : "hover:text-[#d4af37]"
        }`;
    };

    return (
        <nav className={className}>
            <Link
                href="/"
                className={getLinkClass("/")}
                onClick={onItemClick}
            >
                Home
            </Link>

            <Link
                href="/products"
                className={getLinkClass("/products")}
                onClick={onItemClick}
            >
                Products
            </Link>

            <Link
                href="/products?featured=true"
                className={getLinkClass(
                    "/products?featured=true",
                    true
                )}
                onClick={onItemClick}
            >
                New Arrivals
            </Link>

            <Link
                href="/about"
                className={getLinkClass("/about")}
                onClick={onItemClick}
            >
                About Us
            </Link>

            <Link
                href="/contact"
                className={getLinkClass("/contact")}
                onClick={onItemClick}
            >
                Contact
            </Link>
        </nav>
    );
}

export default function Navbar() {
    const items = useQuotationStore((state) => state.items);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener("resize", handleResize);
    }, []);

    // Close mobile search/menu when clicking outside header
    useEffect(() => {
        const onPointerDown = (e) => {
            if (!headerRef.current) return;
            if (!headerRef.current.contains(e.target)) {
                setIsMobileSearchOpen(false);
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileSearchOpen || isMobileMenuOpen) {
            document.addEventListener("pointerdown", onPointerDown);
        }

        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [isMobileSearchOpen, isMobileMenuOpen]);

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-50 overflow-x-hidden transition-all duration-300 ${
                isScrolled || isMobileMenuOpen
                    ? "bg-white/95 backdrop-blur-md text-black shadow-sm"
                    : "glass-effect text-white"
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4 gap-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div className="relative w-[100px] h-[36px] sm:w-[120px] sm:h-[40px] md:w-[140px] md:h-[45px]">
                        <Image
                            src={
                                isScrolled || isMobileMenuOpen
                                    ? "/ITC black.png"
                                    : "/ITC white.png"
                            }
                            alt="ITC Gold House"
                            fill
                            sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, 140px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="flex-1 flex justify-center min-w-0">
                    <Suspense
                        fallback={
                            <nav className="hidden lg:flex items-center gap-5"></nav>
                        }
                    >
                        <NavLinks />
                    </Suspense>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 md:gap-4 shrink-0">
                    {/* Desktop Search */}
                    <Suspense
                        fallback={
                            <div className="w-40 h-[38px] rounded-full bg-gray-100/50 hidden md:block animate-pulse"></div>
                        }
                    >
                        <SearchInput />
                    </Suspense>

                    {/* Mobile Search Button */}
                    {/* <button
                        className="md:hidden p-2 h-12 w-12 flex items-center justify-center rounded-full hover:text-[#d4af37] transition-colors shrink-0"
                        onClick={() => {
                            setIsMobileSearchOpen((v) => !v);
                            setIsMobileMenuOpen(false);
                        }}
                        aria-label="Toggle search"
                    >
                        <Search size={20} />
                    </button> */}

                    {/* Quotation */}
                    <Link
                        href="/quotation"
                        className="relative flex items-center gap-2 hover:text-[#d4af37] transition-colors font-medium text-sm group shrink-0 p-2 sm:p-0 rounded-md"
                        onClick={() =>
                            setIsMobileMenuOpen(false)
                        }
                    >
                        <ShoppingBag
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                        />

                        <span className="hidden sm:inline">
                            Quotation
                        </span>

                        {items.length > 0 && (
                            <span className="absolute -right-3 sm:-right-5 -top-2 sm:-top-3 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] sm:text-xs font-bold text-black shadow-lg">
                                {items.length}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 h-12 w-12 flex items-center justify-center rounded-full hover:text-[#d4af37] transition-colors shrink-0"
                        onClick={() =>
                            setIsMobileMenuOpen(
                                !isMobileMenuOpen
                            )
                        }
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Search (togglable) */}
            {/* {isMobileSearchOpen && (
                <div className="md:hidden px-6 pb-4 bg-transparent">
                    <SearchInput
                        className="relative block w-full"
                        onSearch={() => setIsMobileSearchOpen(false)}
                    />
                </div>
            )} */}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white text-black border-t border-gray-100 shadow-xl">
                    <div className="px-6 py-6 flex flex-col gap-6">
                        {/* Mobile Search */}
                        <div className="md:hidden">
                            <Suspense
                                fallback={
                                    <div className="h-10"></div>
                                }
                            >
                                <SearchInput
                                    className="relative block w-full"
                                    onSearch={() =>
                                        setIsMobileMenuOpen(
                                            false
                                        )
                                    }
                                />
                            </Suspense>
                        </div>

                        {/* Mobile Nav */}
                        <Suspense fallback={<div></div>}>
                            <NavLinks
                                className="flex flex-col gap-4 font-medium text-sm text-gray-800"
                                onItemClick={() =>
                                    setIsMobileMenuOpen(false)
                                }
                            />
                        </Suspense>
                    </div>
                </div>
            )}
        </header>
    );
}