"use client";
import { useState } from "react";

export default function ProductGallery({ images, alt }) {
  const fallbackImage = "https://images.unsplash.com/photo-1617038220319-276d3cfab638";
  const [selectedImage, setSelectedImage] = useState(images?.[0] || fallbackImage);

  if (!images || images.length === 0) {
    return (
      <div className="overflow-hidden rounded-[40px] luxury-card p-4">
        <img
          src={fallbackImage}
          alt={alt}
          className="h-[700px] w-full rounded-[32px] object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-[40px] luxury-card p-4">
        <img
          src={selectedImage}
          alt={alt}
          className="h-[700px] w-full rounded-[32px] object-cover transition-opacity duration-300"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 px-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                selectedImage === img 
                  ? "border-[#d4af37] shadow-md scale-105" 
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <img
                src={img}
                alt={`${alt} thumbnail ${idx + 1}`}
                className="h-24 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
