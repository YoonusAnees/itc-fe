"use client";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37] font-bold">
          Get in Touch
        </p>
        <h1 className="mt-3 text-5xl font-black">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Have a question about a piece or want to discuss a custom design? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="luxury-card rounded-[30px] p-10">
          <h2 className="text-2xl font-bold mb-8">Our Information</h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <strong className="block text-gray-900 mb-2 uppercase text-xs tracking-widest text-[#d4af37]">Address</strong>
              <p>123 Luxury Avenue, Suite 400<br/>Gold District, NY 10001</p>
            </div>
            <div>
              <strong className="block text-gray-900 mb-2 uppercase text-xs tracking-widest text-[#d4af37]">Phone / WhatsApp</strong>
              <p>+94 77 000 0000</p>
            </div>
            <div>
              <strong className="block text-gray-900 mb-2 uppercase text-xs tracking-widest text-[#d4af37]">Email</strong>
              <p>inquiries@itcgoldhouse.com</p>
            </div>
            <div>
              <strong className="block text-gray-900 mb-2 uppercase text-xs tracking-widest text-[#d4af37]">Business Hours</strong>
              <p>Monday - Friday: 10:00 AM - 7:00 PM<br/>Saturday: 11:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <form 
          className="luxury-card rounded-[30px] p-10 space-y-6"
          onSubmit={e => {
            e.preventDefault();
            alert('Your message has been sent successfully. We will get back to you soon!');
          }}
        >
          <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input required type="text" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input required type="email" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
            <textarea required rows="4" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors"></textarea>
          </div>
          <button type="submit" className="w-full rounded-xl bg-[#d4af37] px-6 py-4 font-bold text-black transition hover:opacity-90">
            Submit Inquiry
          </button>
        </form>
      </div>
    </main>
  );
}
