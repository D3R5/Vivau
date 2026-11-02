import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { products as seedProducts, type Product } from "./mock-data";
import { cartItemKey, resolveProduct } from "./product-variants";
import { createBrowserStorage } from "./browser-storage";

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
      storage: createJSONStorage(() => createBrowserStorage()),
      version: 2,
      migrate: (persisted) => {
        const state = persisted as { items?: CartItem[] };
        const migrated = (state.items ?? []).map((item) => {
          if (item.productId === "p-026") {
            return { ...item, productId: "p-025", variantSku: "BC-026-K" };
          }
          return {
            ...item,
            variantSku:
              item.variantSku ??
              seedProducts.find((product) => product.id === item.productId)?.variants?.[0]?.sku,
          };
        });
        const items: CartItem[] = [];
        for (const item of migrated) {
          const existing = items.find((line) => cartItemKey(line) === cartItemKey(item));
          if (existing) existing.quantity += item.quantity;
          else items.push(item);
        }
        return { items };
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
      storage: createJSONStorage(() => createBrowserStorage()),
      version: 3,
      migrate: (persisted) => {
        const state = persisted as Partial<ProductsState>;
        const previous = state.products ?? seedProducts;
        const bed = seedProducts.find((product) => product.id === "p-025");
        const oldBase = previous.find((product) => product.id === "p-025");
        const oldKing = previous.find((product) => product.id === "p-026");
        // Consolidate the two former listings, retaining local stock and photos per size.
        const products =
          bed && (oldBase || oldKing)
            ? [
                ...previous.filter((product) => product.id !== "p-025" && product.id !== "p-026"),
                {
                  ...oldBase,
                  ...bed,
                  active: oldBase?.active ?? bed.active,
                  image: oldBase?.image ?? bed.image,
                  gallery: oldBase?.gallery ?? bed.gallery,
                  variants: bed.variants?.map((variant) => {
                    const savedVariant = oldBase?.variants?.find(
                      (option) => option.sku === variant.sku,
                    );
                    const oldProduct = variant.sku === "BC-026-K" ? oldKing : oldBase;
                    return {
                      ...variant,
                      stock: savedVariant?.stock ?? oldProduct?.stock ?? variant.stock,
                      image: savedVariant?.image ?? oldProduct?.image ?? variant.image,
                      gallery: savedVariant?.gallery ?? oldProduct?.gallery ?? variant.gallery,
                    };
                  }),
                },
              ]
            : previous;
        return {
          ...state,
          products: products.map((product) => {
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
