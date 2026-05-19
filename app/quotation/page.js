"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import api from "../lib/api";
import { useQuotationStore } from "../lib/quotationStore";

export default function QuotationPage() {
    const { items, removeItem, clearItems } = useQuotationStore();

    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const submitQuote = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/quotes", {
                ...form,
                requestType: "Quotation",
                preferredContactMethod: "WhatsApp",
                items,
            });

            alert("Quotation request submitted successfully");

            clearItems();

            setForm({
                customerName: "",
                phone: "",
                email: "",
                message: "",
            });
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#070604] text-white">
            {/* BACKGROUND */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-180px] top-[-140px] h-[420px] w-[420px] rounded-full bg-[#d4af37]/20 blur-[120px]" />

                <div className="absolute right-[-180px] top-[200px] h-[500px] w-[500px] rounded-full bg-[#8a6b18]/20 blur-[140px]" />

                <div className="absolute bottom-[-240px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%)]" />

                <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>

            <section className="relative mx-auto max-w-7xl px-6 py-20">
                {/* HERO */}
                <div className="relative overflow-hidden rounded-[38px] border border-[#d4af37]/20 bg-white/[0.04] px-8 py-12 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                    <div className="absolute right-[-70px] top-[-80px] h-56 w-56 rounded-full border border-[#d4af37]/20" />

                    <div className="absolute bottom-[-90px] left-[-90px] h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />

                    <div className="relative z-10">
                        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#d4af37]">
                            Request Latest Price
                        </p>

                        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                            Quotation Bag
                        </h1>

                        <p className="mt-5 max-w-2xl leading-8 text-white/60">
                            Submit your jewelry selections and receive a personalized quotation
                            from ITC Gold House.
                        </p>
                    </div>
                </div>

                <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    {/* LEFT SIDE */}
                    <div className="grid gap-5">
                        {items.length === 0 ? (
                            <div className="rounded-[34px] border border-[#d4af37]/15 bg-white/[0.04] p-12 text-center shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-3xl text-[#d4af37]">
                                    ✦
                                </div>

                                <h2 className="text-2xl font-black">
                                    Your quotation bag is empty
                                </h2>

                                <p className="mt-3 text-white/55">
                                    Add jewelry products to receive a personalized quotation.
                                </p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item.productId}
                                    className="group relative flex gap-5 overflow-hidden rounded-[30px] border border-[#d4af37]/15 bg-white/[0.04] p-4 shadow-[0_15px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/35"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="relative z-10 h-28 w-28 rounded-2xl object-cover"
                                    />

                                    <div className="relative z-10 flex flex-1 items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                {item.productName}
                                            </h3>

                                            <p className="mt-2 text-white/50">
                                                {item.purity} Gold · {item.weight}g
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.productId)}
                                            className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400 transition hover:scale-110 hover:bg-red-500/20"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={submitQuote}
                        className="relative overflow-hidden rounded-[34px] border border-[#d4af37]/18 bg-white/[0.04] p-7 shadow-[0_25px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    >
                        <div className="absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-[#d4af37]/10 blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black">
                                Your Details
                            </h2>

                            <p className="mt-3 text-white/55">
                                Fill in your contact details and our team will contact you shortly.
                            </p>

                            <div className="mt-8 grid gap-4">
                                <input
                                    required
                                    value={form.customerName}
                                    placeholder="Full Name"
                                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            customerName: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    required
                                    value={form.phone}
                                    placeholder="Phone Number"
                                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    value={form.email}
                                    placeholder="Email Address"
                                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                />

                                <textarea
                                    rows="5"
                                    value={form.message}
                                    placeholder="Message"
                                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            message: e.target.value,
                                        })
                                    }
                                />

                                <button
                                    disabled={loading || items.length === 0}
                                    className="mt-3 rounded-full bg-[#d4af37] px-6 py-4 font-black text-black shadow-[0_12px_35px_rgba(212,175,55,0.3)] transition hover:-translate-y-1 hover:bg-[#f5d676] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Submit Quotation Request"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}