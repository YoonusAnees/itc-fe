"use client";

import { useState } from "react";
import { useQuotationStore } from "../../lib/quotationStore";

export default function AddQuotationButton({ product }) {
  const addItem = useQuotationStore((state) => state.addItem);

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2200);
  };

  return (
    <button
      onClick={handleAdd}
      className={`group relative w-full overflow-hidden rounded-full border px-6 py-4 font-black tracking-wide transition-all duration-300 ${added
          ? "border-[#d4af37] bg-[#d4af37] text-black shadow-[0_12px_35px_rgba(212,175,55,0.35)]"
          : "border-[#d4af37]/40 bg-white/[0.04] text-[#f5d676] hover:-translate-y-1 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_12px_35px_rgba(212,175,55,0.28)]"
        }`}
    >
      {/* GLOW */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />

      {/* CONTENT */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {added ? (
          <>
            <span className="text-lg">✓</span>
            Added to Bag
          </>
        ) : (
          <>
            <span className="text-lg">✦</span>
            Add to Quotation
          </>
        )}
      </span>
    </button>
  );
}