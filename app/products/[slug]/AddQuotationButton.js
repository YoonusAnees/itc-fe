"use client";

import { useQuotationStore } from "../../lib/quotationStore";

export default function AddQuotationButton({ product }) {
  const addItem = useQuotationStore((state) => state.addItem);

  return (
    <button
      onClick={() => {
        addItem(product);
        alert("Added to quotation bag");
      }}
      className="rounded-full border border-[#d4af37] px-6 py-4 font-bold text-[#d4af37]"
    >
      Add to Quotation
    </button>
  );
}