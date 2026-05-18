import ProductCard from "../components/ProductCard";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const isFeatured = params?.featured === 'true';
  
  let products = [];
  try {
    const query = isFeatured ? "?featured=true" : "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products${query}`, {
      cache: "no-store"
    });
    if (res.ok) {
      const data = await res.json();
      products = data.data || [];
    }
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">
        {isFeatured ? "New Arrivals" : "Our Collection"}
      </p>

      <h1 className="mt-3 text-5xl font-black">
        {isFeatured ? "Latest Premium Jewelry" : "All Products"}
      </h1>

      <div className="mt-14">
        {products.length === 0 ? (
          <div className="rounded-[30px] luxury-card p-10 text-center text-gray-600">
            No products found.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
