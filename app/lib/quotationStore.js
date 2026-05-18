import { create } from "zustand";

export const useQuotationStore = create((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const exists = state.items.find(
        (item) => item.productId === product._id
      );

      if (exists) return state;

      return {
        items: [
          ...state.items,
          {
            productId: product._id,
            productName: product.name,
            purity: product.purity,
            weight: product.weight,
            image: product.images?.[0] || "",
          },
        ],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.productId !== productId
      ),
    })),

  clearItems: () => set({ items: [] }),
}));