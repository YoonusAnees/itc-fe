"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuthStore } from "../../lib/authStore";
import { Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const token = useAuthStore((state) => state.token);
  const [categories, setCategories] = useState([]);
  
  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/categories", { name, slug }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName("");
      setSlug("");
      fetchCategories();
    } catch (e) {
      alert(e.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (e) {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
      {/* Add Category Form */}
      <div>
        <h2 className="text-2xl font-black mb-6">Add Category</h2>
        <form onSubmit={handleAddCategory} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
            <input 
              required 
              type="text" 
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
              value={name} 
              onChange={handleNameChange} 
              placeholder="e.g. Rings"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
            <input 
              required 
              type="text" 
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
              value={slug} 
              onChange={e => setSlug(e.target.value)} 
              placeholder="e.g. rings"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 rounded-xl bg-[#d4af37] px-6 py-4 font-bold text-black transition hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      {/* Category List */}
      <div>
        <h2 className="text-2xl font-black mb-6">Existing Categories</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-bold text-gray-600">Name</th>
                <th className="p-4 font-bold text-gray-600">Slug</th>
                <th className="p-4 font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-medium">{c.name}</td>
                    <td className="p-4 text-gray-500">{c.slug}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => deleteCategory(c._id)} 
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
    </div>
  );
}
