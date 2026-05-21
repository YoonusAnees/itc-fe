
"use client";
import about from "../../public/about.jpg";
export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-[#070604] text-white">
      {/* BACKGROUND ART */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[-140px] h-[420px] w-[420px] rounded-full bg-[#d4af37]/18 blur-[130px]" />

        <div className="absolute right-[-180px] top-[240px] h-[520px] w-[520px] rounded-full bg-[#8a6b18]/18 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* HERO */}
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
        {/* IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105"
          style={{
            backgroundImage:
                                    `url(${about.src})`,
          
          }}
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#070604]/70 to-[#070604]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_38%)]" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="mx-auto mb-7 flex w-fit items-center gap-3 rounded-full border border-[#d4af37]/25 bg-black/35 px-5 py-3 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.9)]" />

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5d676]">
              Our Story
            </span>
          </div>

          <h1 className="font-serif text-6xl font-black leading-[0.95] md:text-8xl">
            About
            <span className="block bg-gradient-to-r from-[#d4af37] via-[#fff1a8] to-[#b8860b] bg-clip-text text-transparent">
              ITC Gold House
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Where timeless elegance meets exceptional craftsmanship. Discover
            handcrafted luxury gold jewelry designed to celebrate life’s most
            meaningful moments.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* LEFT IMAGE */}
          <div className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/15 bg-white/[0.04] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/15 via-transparent to-transparent" />

            <img
              src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
              alt="Luxury Gold Jewelry"
              className="relative z-10 h-[650px] w-full rounded-[30px] object-cover"
            />

            <div className="absolute bottom-7 left-7 z-20 rounded-full border border-[#d4af37]/30 bg-black/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f5d676] backdrop-blur-md">
              ITC Gold House
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/15 bg-white/[0.04] p-8 shadow-[0_25px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-12">
            <div className="absolute right-[-70px] top-[-70px] h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#d4af37]">
                Luxury Craftsmanship
              </p>

              <h2 className="mt-4 font-serif text-4xl font-black leading-tight sm:text-5xl">
                Jewelry Crafted
                <span className="block text-[#d4af37]">
                  With Perfection
                </span>
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-8 text-white/60">
                <p>
                  Welcome to{" "}
                  <strong className="text-white">
                    ITC Gold House
                  </strong>
                  , where timeless elegance meets exceptional craftsmanship. For
                  decades, we have been dedicated to providing our discerning
                  clients with the finest gold jewelry, sourced and crafted with
                  the utmost care and precision.
                </p>

                <p>
                  Our collection spans everything from breathtaking bridal sets
                  to delicate everyday pieces. Whether you are looking for 18K,
                  22K, or 24K gold, our extensive selection ensures that you
                  will find the perfect piece to celebrate life’s most precious
                  moments.
                </p>

                <p>
                  At ITC Gold House, we don’t just sell jewelry; we help you
                  create memories that will last for generations. Experience the
                  luxury of premium gold, designed just for you.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-[#f5d676]">
                  916 Gold
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-widest text-white/60">
                  Premium Jewelry
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-widest text-white/60">
                  Luxury Finish
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}