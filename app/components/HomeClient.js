"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import hero from "../../public/hero.jpg";

export default function HomeClient({ products }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="overflow-hidden bg-[#070604] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#070604]">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-45 scale-105"
          style={{
            backgroundImage:
              `url(${hero.src})`,
          }}
        />

        {/* Dark Luxury Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#070604] via-black/70 to-black/30" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_38%)]" />

        {/* Gold Glow Art */}
        <div className="pointer-events-none absolute left-[-180px] top-[-160px] h-[460px] w-[460px] rounded-full bg-[#d4af37]/20 blur-[130px]" />
        <div className="pointer-events-none absolute right-[-180px] bottom-[-160px] h-[520px] w-[520px] rounded-full bg-[#8a6b18]/25 blur-[140px]" />

        {/* Gold Line Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-8 left-6 hidden rounded-full border border-[#d4af37]/25 bg-black/35 px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#f5d676] backdrop-blur-md md:block"
        >
          916 Gold · Premium Craft
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-7 flex w-fit items-center gap-3 rounded-full border border-[#d4af37]/25 bg-black/35 px-5 py-3 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.9)]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5d676]">
              Luxury Jewelry Collection
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-6xl font-black leading-[0.95] text-white drop-shadow-xl md:text-8xl lg:text-9xl"
          >
            ITC Gold
            <span className="block bg-gradient-to-r from-[#d4af37] via-[#fff1a8] to-[#b8860b] bg-clip-text text-transparent">
              House
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 drop-shadow-md sm:text-lg"
          >
            Premium handcrafted gold jewelry with timeless elegance. Discover
            rings, necklaces, chains, bangles and bridal collections crafted for
            luxury moments.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#collection"
              className="rounded-full bg-[#d4af37] px-10 py-5 font-black text-black shadow-[0_0_35px_rgba(212,175,55,0.35)] transition hover:-translate-y-1 hover:bg-[#f5d676]"
            >
              Explore Collection
            </a>

            <Link
              href="/products"
              className="rounded-full border border-[#d4af37]/35 bg-white/[0.04] px-10 py-5 font-black text-[#f5d676] backdrop-blur-md transition hover:-translate-y-1 hover:border-[#d4af37] hover:bg-white/[0.08]"
            >
              View All Jewelry
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED COLLECTION */}
      <section
        id="collection"
        className="relative mx-auto max-w-7xl px-6 py-24"
      >
        <div className="pointer-events-none absolute left-[-200px] top-20 h-[420px] w-[420px] rounded-full bg-[#d4af37]/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-[-160px] bottom-10 h-[460px] w-[460px] rounded-full bg-[#8a6b18]/15 blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#d4af37]">
              Featured Collection
            </p>

            <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-white sm:text-5xl">
              Premium Gold Jewelry
            </h2>

            <p className="mt-4 max-w-xl leading-8 text-white/55">
              Explore our selected luxury pieces with elegant finishing,
              timeless detailing and premium craftsmanship.
            </p>
          </div>

          <Link
            href="/products"
            className="w-fit rounded-full border border-[#d4af37]/35 bg-white/[0.04] px-7 py-4 font-bold text-[#f5d676] transition hover:-translate-y-1 hover:bg-[#d4af37] hover:text-black"
          >
            Browse All
          </Link>
        </motion.div>

        <div className="relative z-10 mt-14">
          {products.length === 0 ? (
            <div className="rounded-[34px] border border-[#d4af37]/15 bg-white/[0.04] p-12 text-center text-white/55 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-3xl text-[#d4af37]">
                ✦
              </div>

              <h3 className="text-2xl font-black text-white">
                No products found
              </h3>

              <p className="mt-3">
                Featured jewelry items will appear here once added.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 35 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.65, ease: "easeOut" },
                    },
                  }}
                  className="group relative rounded-[30px] border border-[#d4af37]/15 bg-white/[0.035] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-2 hover:border-[#d4af37]/45 hover:bg-white/[0.07]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-[#d4af37]/18 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}