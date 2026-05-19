import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#070604] text-white">
      {/* BACKGROUND ART */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] bottom-[-180px] h-[420px] w-[420px] rounded-full bg-[#d4af37]/14 blur-[130px]" />
        <div className="absolute right-[-140px] top-[-160px] h-[420px] w-[420px] rounded-full bg-[#8a6b18]/16 blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:46px_46px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* BRAND */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <div className="mb-6 flex h-[62px] w-[170px] items-center justify-center">
                <img
                  src="/ITC white.png"
                  alt="ITC Gold House"
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>

            <p className="max-w-md leading-8 text-white/55">
              Premium handcrafted gold jewelry with timeless elegance. Discover
              rings, necklaces, chains, bangles and bridal collections crafted
              for your luxury moments.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#f5d676]">
                916 Gold
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60">
                Premium Jewelry
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60">
                Luxury Finish
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-black tracking-wider text-[#d4af37]">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {[
                ["Home", "/"],
                ["Products", "/products"],
                ["New Arrivals", "/products?featured=true"],
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-white/50 transition hover:text-[#f5d676]"
                  >
                    <span className="h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-black tracking-wider text-[#d4af37]">
              Contact
            </h3>

            <ul className="space-y-4 text-white/50">
              <li>123 Luxury Avenue, Suite 400</li>
              <li>Gold District, NY 10001</li>

              <li className="pt-2">
                <a
                  href="tel:+94770000000"
                  className="transition hover:text-[#f5d676]"
                >
                  +94 77 000 0000
                </a>
              </li>

              <li>
                <a
                  href="mailto:inquiries@itcgoldhouse.com"
                  className="transition hover:text-[#f5d676]"
                >
                  inquiries@itcgoldhouse.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-white/40 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} ITC Gold House. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-[#f5d676]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-[#f5d676]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}