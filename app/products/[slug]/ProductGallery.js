"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, alt }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638";

  const galleryImages = images?.length ? images : [fallbackImage];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="flex flex-col gap-5">
      {/* MAIN IMAGE */}
      <div className="group relative overflow-hidden rounded-[38px] border border-[#d4af37]/20 bg-black/30 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
        <div className="pointer-events-none absolute inset-0 rounded-[38px] bg-gradient-to-br from-[#d4af37]/20 via-transparent to-transparent opacity-70" />

        <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#d4af37]/15 blur-3xl" />

        <div className="relative z-10 h-64 sm:h-[420px] md:h-[520px] lg:h-[700px] w-full rounded-[30px] overflow-hidden">
          <Image
            src={selectedImage}
            alt={alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="pointer-events-none absolute bottom-7 left-7 z-20 rounded-full border border-[#d4af37]/30 bg-black/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f5d676] backdrop-blur-md">
          ITC Gold House
        </div>
      </div>

      {/* THUMBNAILS */}
      {galleryImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto px-2 pb-3 scrollbar-hide">
          {galleryImages.map((img, idx) => {
            const active = selectedImage === img;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative flex-shrink-0 overflow-hidden rounded-2xl border transition-all duration-300 ${active
                    ? "scale-105 border-[#d4af37] shadow-[0_10px_30px_rgba(212,175,55,0.28)]"
                    : "border-white/10 opacity-60 hover:scale-105 hover:border-[#d4af37]/40 hover:opacity-100"
                  }`}
              >
                <div className="h-20 w-20 sm:h-24 sm:w-24 relative">
                  <Image src={img} alt={`${alt} thumbnail ${idx + 1}`} fill className="object-cover" />
                </div>

                {active && (
                  <span className="absolute inset-0 rounded-2xl bg-[#d4af37]/10" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}