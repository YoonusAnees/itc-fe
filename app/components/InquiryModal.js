"use client";

import { useState } from "react";
import api from "../lib/api";

export default function InquiryModal({ product, type }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    message: "",
  });

  const submitInquiry = async (e) => {
    e.preventDefault();

    await api.post("/quotes", {
      ...form,
      requestType: type,
      preferredContactMethod: "WhatsApp",
      items: [
        {
          productId: product._id,
          productName: product.name,
          purity: product.purity,
          weight: product.weight,
          image: product.images?.[0] || "",
        },
      ],
    });

    alert("Request submitted successfully");

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 px-6 py-4"
      >
        {type}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-[30px] luxury-card p-6">
            <h2 className="text-3xl font-bold">
              {type}
            </h2>

            <form
              onSubmit={submitInquiry}
              className="mt-6 grid gap-4"
            >
              <input
                required
                placeholder="Full Name"
                className="rounded-xl bg-white/10 px-4 py-4 outline-none"
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
                className="rounded-xl bg-white/10 px-4 py-4 outline-none"
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

              <input
                placeholder="Email"
                className="rounded-xl bg-white/10 px-4 py-4 outline-none"
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
                className="rounded-xl bg-white/10 px-4 py-4 outline-none"
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />

              <button className="rounded-full bg-[#d4af37] px-6 py-4 font-bold text-black">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}