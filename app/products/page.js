import ProductCard from "../components/ProductCard";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const isFeatured = params?.featured === 'true';
  const searchQuery = params?.search || '';
  
  let products = [];
  try {
    let queryArgs = [];
    if (isFeatured) queryArgs.push("featured=true");
    if (searchQuery) queryArgs.push(`search=${encodeURIComponent(searchQuery)}`);
    
    const queryString = queryArgs.length > 0 ? `?${queryArgs.join('&')}` : "";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products${queryString}`, {
      cache: "no-store"
    });
    if (res.ok) {
      const data = await res.json();
      products = data.data || [];
    }
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  let pageTitle = "All Products";
  let pageSubtitle = "Our Collection";

  if (searchQuery) {
    pageTitle = `Results for "${searchQuery}"`;
    pageSubtitle = "Search";
  } else if (isFeatured) {
    pageTitle = "Latest Premium Jewelry";
    pageSubtitle = "New Arrivals";
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37] font-bold">
        {pageSubtitle}
      </p>

      <h1 className="mt-3 text-5xl font-black">
        {pageTitle}
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
