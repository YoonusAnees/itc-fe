import api from "./lib/api";
import ProductCard from "./components/ProductCard";

async function getProducts() {
  try {
    const res = await api.get("/products");

    return res.data.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617038220319-276d3cfab638')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center px-6 py-20">
            <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#d4af37] font-bold">
              Luxury Jewelry Collection
            </p>

            <h1 className="text-6xl font-black leading-tight md:text-8xl text-white drop-shadow-xl">
              ITC Gold House
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-200 drop-shadow-md">
              Premium handcrafted gold jewelry with timeless elegance.
              Discover rings, necklaces, chains, bangles and bridal collections.
            </p>

            <a
              href="#collection"
              className="mt-8 inline-flex rounded-full bg-[#d4af37] px-10 py-5 font-bold text-black transition-transform hover:scale-105"
            >
              Explore Collection
            </a>
        </div>
      </section>

      <section
        id="collection"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">
          Featured Collection
        </p>

        <h2 className="mt-3 text-5xl font-black">
          Premium Gold Jewelry
        </h2>

        <div className="mt-14">
          {products.length === 0 ? (
            <div className="rounded-[30px] luxury-card p-10 text-center text-gray-600">
              No products found.
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}