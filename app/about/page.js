export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37] text-center font-bold">
        Our Story
      </p>
      <h1 className="mt-3 text-5xl font-black text-center mb-10">
        About ITC Gold House
      </h1>
      
      <div className="luxury-card rounded-[40px] p-10 md:p-16">
        <div className="prose prose-lg mx-auto text-gray-600 space-y-6 text-center leading-relaxed">
          <p>
            Welcome to <strong className="text-black">ITC Gold House</strong>, where timeless elegance meets exceptional craftsmanship. For decades, we have been dedicated to providing our discerning clients with the finest gold jewelry, sourced and crafted with the utmost care and precision.
          </p>
          <p>
            Our collection spans everything from breathtaking bridal sets to delicate everyday pieces. Whether you are looking for 18K, 22K, or 24K gold, our extensive selection ensures that you will find the perfect piece to celebrate life's most precious moments.
          </p>
          <p>
            At ITC Gold House, we don't just sell jewelry; we help you create memories that will last for generations. Experience the luxury of premium gold, designed just for you.
          </p>
        </div>
      </div>
    </main>
  );
}
