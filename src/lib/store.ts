import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts, type Product } from "./mock-data";
import { resolveProduct } from "./product-variants";

// ---------- Cart ----------
export type CartItem = { productId: string; variantSku?: string; quantity: number };

type CartState = {
  items: CartItem[];
  add: (id: string, qty?: number, variantSku?: string) => boolean;
  remove: (id: string, variantSku?: string) => void;
  setQty: (id: string, qty: number, variantSku?: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (id, qty = 1, variantSku) => {
        const base = useProducts.getState().products.find((p) => p.id === id);
        if (!base?.active || !Number.isInteger(qty) || qty <= 0) return false;
        if (base.variants?.length && !variantSku) return false;
        const product = resolveProduct(base, variantSku);
        if (!product || product.stock <= 0) return false;
        const existing = get().items.find((i) => i.productId === id && i.variantSku === variantSku);
        const nextQty = Math.min((existing?.quantity ?? 0) + qty, product.stock);
        if (nextQty <= (existing?.quantity ?? 0)) return false;
        set((s) => ({
          items: existing
            ? s.items.map((i) => (i === existing ? { ...i, quantity: nextQty } : i))
            : [...s.items, { productId: id, variantSku, quantity: nextQty }],
        }));
        return true;
      },
      remove: (id, variantSku) =>
        set((s) => ({
          items: s.items.filter((i) => !(i.productId === id && i.variantSku === variantSku)),
        })),
      setQty: (id, qty, variantSku) =>
        set((s) => {
          const base = useProducts.getState().products.find((p) => p.id === id);
          const product = base && resolveProduct(base, variantSku);
          if (!product || !Number.isFinite(qty)) return s;

          const safeQty = Math.max(0, Math.min(Math.floor(qty), product.stock));

          return {
            items: s.items
              .map((i) =>
                i.productId === id && i.variantSku === variantSku ? { ...i, quantity: safeQty } : i,
              )
              .filter((i) => i.quantity > 0),
          };
        }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "vivau-cart",
      version: 1,
      migrate: (persisted) => {
        const state = persisted as { items?: CartItem[] };
        return {
          items: (state.items ?? []).map((item) => ({
            ...item,
            variantSku:
              item.variantSku ??
              seedProducts.find((product) => product.id === item.productId)?.variants?.[0]?.sku,
          })),
        };
      },
    },
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
      remove: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      updateStock: (id, stock) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, stock, updatedAt: new Date().toISOString().slice(0, 10) } : p,
          ),
        })),
    }),
    {
      name: "vivau-products",
      version: 2,
      migrate: (persisted) => {
        const state = persisted as Partial<ProductsState>;
        return {
          ...state,
          products: (state.products ?? seedProducts).map((product) => {
            const seed = seedProducts.find((p) => p.id === product.id);
            const variants = product.variants ?? seed?.variants;
            return {
              ...product,
              variants: variants?.map((variant) => ({
                ...seed?.variants?.find((option) => option.sku === variant.sku),
                ...variant,
                stock: variant.stock ?? product.stock,
              })),
            };
          }),
        };
      },
    },
  ),
);
