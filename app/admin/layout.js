"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../lib/authStore";

export default function AdminLayout({ children }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!useAuthStore.getState().user) {
      router.push("/login");
    }
  }, [router]);

  if (!mounted || !user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="text-2xl font-black mb-10">
          Admin<span className="text-[#d4af37]">Panel</span>
        </div>
        
        <nav className="grid gap-3 flex-1">
          <Link 
            href="/admin" 
            className="p-3 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/add-product" 
            className="p-3 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Add Product
          </Link>
          <Link 
            href="/admin/categories" 
            className="p-3 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Categories
          </Link>
        </nav>

        <button 
          onClick={() => {
            logout();
            router.push("/login");
          }} 
          className="p-3 text-left rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors mt-auto"
        >
          Logout
        </button>
      </aside>
      
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
