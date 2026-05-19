import ProductCard from "../components/ProductCard";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const isFeatured = params?.featured === "true";
  const searchQuery = params?.search || "";

  let products = [];

  try {
    const queryArgs = [];

    if (isFeatured) queryArgs.push("featured=true");
    if (searchQuery) queryArgs.push(`search=${encodeURIComponent(searchQuery)}`);

    const queryString = queryArgs.length > 0 ? `?${queryArgs.join("&")}` : "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products${queryString}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data = await res.json();
      products = data.data || [];
    }
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  let pageTitle = "All Products";
  let pageSubtitle = "Our Collection";
  let pageText =
    "Explore timeless gold pieces crafted with elegance, purity, and premium detail.";

  if (searchQuery) {
    pageTitle = `Results for "${searchQuery}"`;
    pageSubtitle = "Search";
    pageText = "Discover matching jewelry pieces from our ITC Gold House collection.";
  } else if (isFeatured) {
    pageTitle = "Latest Premium Jewelry";
    pageSubtitle = "New Arrivals";
    pageText = "Handpicked premium arrivals designed for luxury, gifting, and everyday elegance.";
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070604] text-white">
      {/* DARK GOLD ART BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#d4af37]/20 blur-[120px]" />
        <div className="absolute right-[-160px] top-[180px] h-[480px] w-[480px] rounded-full bg-[#8a6b18]/25 blur-[130px]" />
        <div className="absolute bottom-[-220px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-[38px] border border-[#d4af37]/25 bg-white/[0.04] px-6 py-12 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-10 lg:px-14">
          <div className="absolute right-[-60px] top-[-70px] h-56 w-56 rounded-full border border-[#d4af37]/30" />
          <div className="absolute right-[70px] top-[55px] h-24 w-24 rounded-full border border-[#d4af37]/20" />
          <div className="absolute bottom-[-90px] left-[-70px] h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#d4af37]">
              {pageSubtitle}
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {pageTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
              {pageText}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-5 py-2 text-sm font-bold text-[#f5d676]">
                916 Gold
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white/75">
                Premium Craft
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white/75">
                ITC Gold House
              </span>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="mt-14">
          {products.length === 0 ? (
            <div className="relative overflow-hidden rounded-[34px] border border-[#d4af37]/20 bg-white/[0.04] p-12 text-center shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-3xl">
                ✦
              </div>

              <h2 className="text-2xl font-black text-white">
                No products found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-white/55">
                We couldn’t find matching jewelry right now. Try another search
                or explore our full collection.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group relative rounded-[30px] border border-[#d4af37]/15 bg-white/[0.035] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-2 hover:border-[#d4af37]/45 hover:bg-white/[0.07]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-[#d4af37]/18 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}