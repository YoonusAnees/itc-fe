import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./api"; // To call logout endpoint

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: (user) => set({ user }),

      logout: async () => {
        try {
          // Attempt to call backend to clear cookies if needed
          await api.post("/auth/logout");
        } catch (error) {
          console.error("Logout failed on backend", error);
        } finally {
          set({ user: null });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
