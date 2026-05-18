"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import api from "../lib/api";
import { useQuotationStore } from "../lib/quotationStore";

export default function QuotationPage() {
    const { items, removeItem, clearItems } =
        useQuotationStore();

    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        email: "",
        message: "",
    });

    const submitQuote = async (e) => {
        e.preventDefault();

        await api.post("/quotes", {
            ...form,
            requestType: "Quotation",
            preferredContactMethod: "WhatsApp",
            items,
        });

        alert("Quotation request submitted");

        clearItems();
    };

    return (
        <main className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">
                Request Latest Price
            </p>

            <h1 className="mt-3 text-5xl font-black">
                Quotation Bag
            </h1>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="grid gap-5">
                    {items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex gap-5 rounded-[30px] luxury-card p-4"
                        >
                            <img
                                src={item.image}
                                alt={item.productName}
                                className="h-28 w-28 rounded-2xl object-cover"
                            />

                            <div className="flex flex-1 items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {item.productName}
                                    </h3>

                                    <p className="mt-2 text-gray-500">
                                        {item.purity} Gold · {item.weight}g
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        removeItem(item.productId)
                                    }
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={submitQuote}
                    className="rounded-[30px] luxury-card p-6"
                >
                    <h2 className="text-3xl font-black">
                        Your Details
                    </h2>

                    <div className="mt-6 grid gap-4">
                        <input
                            required
                            placeholder="Full Name"
                            className="rounded-xl bg-black/5 text-gray-900 px-4 py-4 outline-none border border-black/10 focus:border-[#d4af37]"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    customerName: e.target.value,
                                })
                            }
                        />

                        <input
                            required
                            placeholder="Phone Number"
                            className="rounded-xl bg-black/5 text-gray-900 px-4 py-4 outline-none border border-black/10 focus:border-[#d4af37]"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                })
                            }
                        />

                        <input
                            placeholder="Email Address"
                            className="rounded-xl bg-black/5 text-gray-900 px-4 py-4 outline-none border border-black/10 focus:border-[#d4af37]"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />

                        <textarea
                            rows="5"
                            placeholder="Message"
                            className="rounded-xl bg-black/5 text-gray-900 px-4 py-4 outline-none border border-black/10 focus:border-[#d4af37]"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    message: e.target.value,
                                })
                            }
                        />

                        <button className="rounded-full bg-[#d4af37] px-6 py-4 font-bold text-black">
                            Submit Quotation Request
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}