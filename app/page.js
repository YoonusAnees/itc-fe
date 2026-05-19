import api from "./lib/api";
import HomeClient from "./components/HomeClient";

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
  return <HomeClient products={products} />;
}