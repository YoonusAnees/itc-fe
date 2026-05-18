"use client";

import Link from "next/link";
import { useQuotationStore } from "../lib/quotationStore";

export default function ProductCard({ product }) {
  const addItem = useQuotationStore((state) => state.addItem);

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const whatsappMessage = encodeURIComponent(
    `Hi, I want to inquire about this jewelry:\n\n${product.name}\nPurity: ${product.purity}\nWeight: ${product.weight}g`
  );

  return (
    <div className="group overflow-hidden rounded-[30px] luxury-card">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-[300px] w-full overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10">
            <span className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl border border-white/10">
              View Product
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          {product.purity} Gold
        </p>

        <h3 className="text-2xl font-bold">
          {product.name}
        </h3>

        <p className="mt-3 text-gray-500">
          Weight: {product.weight}g
        </p>

        <div className="mt-6 grid gap-3">
          <a
            href={`https://wa.me/${number}?text=${whatsappMessage}`}
            target="_blank"
            className="rounded-full bg-[#d4af37] px-5 py-4 text-center font-bold text-black"
          >
            WhatsApp Inquiry
          </a>

          <button
            onClick={() => {
              addItem(product);
              alert("Added to quotation bag");
            }}
            className="rounded-full border border-[#d4af37] px-5 py-4 font-bold text-[#d4af37]"
          >
            Add to Quotation
          </button>
        </div>
      </div>
    </div>
  );
}