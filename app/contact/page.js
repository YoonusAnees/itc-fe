"use client";
import contact from "../../public/contact.jpg";

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-[#070604] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[-140px] h-[420px] w-[420px] rounded-full bg-[#d4af37]/18 blur-[130px]" />

        <div className="absolute right-[-180px] top-[260px] h-[520px] w-[520px] rounded-full bg-[#8a6b18]/18 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105"
          style={{
            backgroundImage:
                          `url(${contact.src})`,
            
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#070604]/70 to-[#070604]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_38%)]" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="mx-auto mb-7 flex w-fit items-center gap-3 rounded-full border border-[#d4af37]/25 bg-black/35 px-5 py-3 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.9)]" />

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5d676]">
              Get In Touch
            </span>
          </div>

          <h1 className="font-serif text-6xl font-black leading-[0.95] md:text-8xl">
            Contact
            <span className="block bg-gradient-to-r from-[#d4af37] via-[#fff1a8] to-[#b8860b] bg-clip-text text-transparent">
              ITC Gold House
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Have a question about a jewelry piece or want to discuss a custom
            design? Our luxury jewelry specialists are ready to assist you.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/15 bg-white/[0.04] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-12">
            <div className="absolute right-[-70px] top-[-70px] h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#d4af37]">
                Our Information
              </p>

              <h2 className="mt-4 font-serif text-4xl font-black leading-tight">
                Luxury Service,
                <span className="block text-[#d4af37]">
                  Personalized Support
                </span>
              </h2>

              <div className="mt-10 space-y-8 text-white/60">
                <div>
                  <strong className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-[#f5d676]">
                    Address
                  </strong>

                  <p className="leading-8">
                    123 Luxury Avenue, Suite 400
                    <br />
                    Gold District, NY 10001
                  </p>
                </div>

                <div>
                  <strong className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-[#f5d676]">
                    Phone / WhatsApp
                  </strong>

                  <a
                    href="tel:+94770000000"
                    className="transition hover:text-[#f5d676]"
                  >
                    +94 77 000 0000
                  </a>
                </div>

                <div>
                  <strong className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-[#f5d676]">
                    Email
                  </strong>

                  <a
                    href="mailto:inquiries@itcgoldhouse.com"
                    className="transition hover:text-[#f5d676]"
                  >
                    inquiries@itcgoldhouse.com
                  </a>
                </div>

                <div>
                  <strong className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-[#f5d676]">
                    Business Hours
                  </strong>

                  <p className="leading-8">
                    Monday - Friday: 10:00 AM - 7:00 PM
                    <br />
                    Saturday: 11:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              {/* TAGS */}
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-[#f5d676]">
                  916 Gold
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-widest text-white/60">
                  Luxury Jewelry
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-widest text-white/60">
                  Premium Support
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/15 bg-white/[0.04] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-12"
            onSubmit={(e) => {
              e.preventDefault();

              alert(
                "Your message has been sent successfully. We will get back to you soon!"
              );
            }}
          >
            <div className="absolute left-[-70px] bottom-[-70px] h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#d4af37]">
                Send Message
              </p>

              <h2 className="mt-4 font-serif text-4xl font-black leading-tight">
                Let’s Discuss
                <span className="block text-[#d4af37]">
                  Your Jewelry Needs
                </span>
              </h2>

              <div className="mt-10 space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-bold text-white/70">
                    Full Name
                  </label>

                  <input
                    required
                    type="text"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-white/70">
                    Email Address
                  </label>

                  <input
                    required
                    type="email"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-white/70">
                    Message
                  </label>

                  <textarea
                    required
                    rows="5"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#d4af37] px-6 py-5 font-black text-black shadow-[0_12px_35px_rgba(212,175,55,0.3)] transition hover:-translate-y-1 hover:bg-[#f5d676]"
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}