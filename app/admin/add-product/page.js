"use client";

import { useState } from "react";
import api from "../../lib/api";
import { useAuthStore } from "../../lib/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddProduct() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    purity: "22K",
    weight: "",
    availability: "Available",
    featured: true,
    mainImage: null,
    otherImages: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || []);
      } catch (e) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("purity", form.purity);
      formData.append("weight", Number(form.weight));
      formData.append("availability", form.availability);
      formData.append("featured", form.featured);
      
      if (form.mainImage) {
        formData.append("images", form.mainImage);
      }
      
      if (form.otherImages && form.otherImages.length > 0) {
        for (let i = 0; i < form.otherImages.length; i++) {
          formData.append("images", form.otherImages[i]);
        }
      }
      
      await api.post("/products", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          // Axios automatically sets Content-Type to multipart/form-data when passing FormData
        }
      });
      
      alert("Product added successfully");
      router.push("/admin");
    } catch (e) {
      alert(e.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-black mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
          <input 
            required 
            type="text" 
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
          <select 
            required 
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
            value={form.category} 
            onChange={e => setForm({...form, category: e.target.value})}
          >
            <option value="" disabled>Select a category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            required 
            rows="4" 
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Purity</label>
            <select 
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
              value={form.purity} 
              onChange={e => setForm({...form, purity: e.target.value})}
            >
              <option value="18K">18K</option>
              <option value="22K">22K</option>
              <option value="24K">24K</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Weight (g)</label>
            <input 
              required 
              type="number" 
              step="0.01" 
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
              value={form.weight} 
              onChange={e => setForm({...form, weight: e.target.value})} 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Availability</label>
          <select 
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
            value={form.availability} 
            onChange={e => setForm({...form, availability: e.target.value})}
          >
            <option value="Available">Available</option>
            <option value="Made To Order">Made To Order</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Main Cover Image *</label>
            <input 
              required 
              type="file" 
              accept="image/*"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
              onChange={e => setForm({...form, mainImage: e.target.files[0]})} 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Other Images (Max 4)</label>
            <input 
              type="file" 
              multiple
              accept="image/*"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#d4af37] focus:bg-white transition-colors" 
              onChange={e => {
                const files = Array.from(e.target.files);
                if (files.length > 4) {
                  alert("You can only upload up to 4 additional images.");
                  e.target.value = null; // reset
                  return;
                }
                setForm({...form, otherImages: files});
              }} 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="featured"
            className="w-5 h-5 accent-[#d4af37]"
            checked={form.featured}
            onChange={e => setForm({...form, featured: e.target.checked})}
          />
          <label htmlFor="featured" className="font-bold text-gray-700 cursor-pointer">
            Mark as New Arrival (Featured)
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 rounded-full bg-[#d4af37] px-6 py-4 font-bold text-black transition hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
