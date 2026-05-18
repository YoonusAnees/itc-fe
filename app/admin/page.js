"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuthStore } from "../lib/authStore";
import { Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const token = useAuthStore((state) => state.token);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (e) {
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Manage Products</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-bold text-gray-600">Image</th>
              <th className="p-4 font-bold text-gray-600">Name</th>
              <th className="p-4 font-bold text-gray-600">Purity</th>
              <th className="p-4 font-bold text-gray-600">Weight</th>
              <th className="p-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <img 
                      src={p.images?.[0] || "https://images.unsplash.com/photo-1617038220319-276d3cfab638"} 
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg" 
                    />
                  </td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-gray-500">{p.purity}</td>
                  <td className="p-4 text-gray-500">{p.weight}g</td>
                  <td className="p-4">
                    <button 
                      onClick={() => deleteProduct(p._id)} 
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
