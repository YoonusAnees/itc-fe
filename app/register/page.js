"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../lib/api";
import { useAuthStore } from "../lib/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Assuming typical auth endpoint
      const res = await api.post("/auth/register", form);
      const data = res.data;
      
      const user = data.user || data.data;
      const token = data.token;

      if (user && token) {
        login(user, token);
        router.push("/admin");
      } else {
        // If the API doesn't return a token on register, push to login
        router.push("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-md rounded-[30px] luxury-card p-8">
        <div className="text-center">
          <h1 className="text-4xl font-black">Register Admin</h1>
          <p className="mt-2 text-gray-500">Create an account to manage products</p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">Full Name</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">Email Address</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-[#d4af37] px-6 py-4 font-bold text-black transition hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#d4af37] hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  );
}
