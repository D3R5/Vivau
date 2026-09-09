import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts, type Product } from "./mock-data";

// ---------- Cart ----------
export type CartItem = { productId: string; quantity: number };

type CartState = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (id, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === id ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { productId: id, quantity: qty }] };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.productId === id ? { ...i, quantity: qty } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "vivau-cart" },
  ),
);

// ---------- Products (admin CRUD) ----------
type ProductsState = {
  products: Product[];
  upsert: (p: Product) => void;
  remove: (id: string) => void;
  updateStock: (id: string, stock: number) => void;
};

export const useProducts = create<ProductsState>()(
  persist(
    (set) => ({
      products: seedProducts,
      upsert: (p) =>
        set((s) => {
          const idx = s.products.findIndex((x) => x.id === p.id);
          if (idx === -1) return { products: [p, ...s.products] };
          const next = [...s.products];
          next[idx] = p;
          return { products: next };
        }),
      remove: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      updateStock: (id, stock) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, stock, updatedAt: new Date().toISOString().slice(0, 10) } : p,
          ),
        })),
    }),
    { name: "vivau-products" },
  ),
);
