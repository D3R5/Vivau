const { test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const ts = require("typescript");

// Compile the actual domain/store modules without loading Vite's image imports.
function loadSource(file, dependencies = {}, expose = "") {
  const filename = resolve(__dirname, "..", file);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const module = { exports: {} };
  const localRequire = (id) => (id in dependencies ? dependencies[id] : require(id));
  new Function("require", "module", "exports", outputText + expose)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}

const variants = loadSource("src/lib/product-variants.ts");
const chair = {
  id: "chair",
  name: "Silla de Raulí",
  active: true,
  price: 59990,
  salePrice: 49990,
  stock: 7,
  sku: "SIL",
  material: "Raulí",
  dimensions: "90 × 40 cm",
  image: "base.jpg",
  gallery: ["base.jpg"],
  variants: [
    { name: "Sin tapiz", sku: "SIL-ST", price: 59990, stock: 2 },
    {
      name: "Tapizada",
      sku: "SIL-T",
      price: 69990,
      stock: 3,
      material: "Raulí y tapiz",
      dimensions: "92 × 42 cm",
      image: "tapizada.jpg",
    },
    { name: "Agotada", sku: "SIL-0", price: 79990, stock: 0 },
  ],
};
const plain = { ...chair, id: "table", variants: undefined };
const memory = new Map();
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: {
    getItem: (key) => memory.get(key) ?? null,
    setItem: (key, value) => memory.set(key, value),
    removeItem: (key) => memory.delete(key),
  },
});
global.window = { localStorage: globalThis.localStorage };
const { useCart, useProducts } = loadSource("src/lib/store.ts", {
  "./mock-data": { products: [chair, plain] },
  "./product-variants": variants,
});

beforeEach(() => {
  memory.clear();
  useProducts.setState({ products: [chair, plain] });
  useCart.getState().clear();
});

test("selected option supplies price, SKU, stock, characteristics and images", () => {
  const selected = variants.resolveProduct(chair, "SIL-T");
  assert.equal(selected.name, "Silla de Raulí — Tapizada");
  assert.equal(selected.price, 69990);
  assert.equal(selected.salePrice, undefined);
  assert.equal(selected.sku, "SIL-T");
  assert.equal(selected.stock, 3);
  assert.equal(selected.material, "Raulí y tapiz");
  assert.equal(selected.dimensions, "92 × 42 cm");
  assert.equal(selected.image, "tapizada.jpg");
  assert.deepEqual(selected.gallery, ["tapizada.jpg"]);
  assert.equal(variants.resolveProduct(chair, "unknown"), undefined);
  assert.equal(variants.resolveProduct(plain), plain);
});

test("variants keep independent quantities, stock limits and removal", () => {
  const cart = useCart.getState();
  assert.equal(cart.add("chair", 1, "SIL-ST"), true);
  assert.equal(cart.add("chair", 2, "SIL-T"), true);
  cart.add("chair", 10, "SIL-ST");
  assert.deepEqual(
    useCart.getState().items.map((i) => i.quantity),
    [2, 2],
  );
  cart.setQty("chair", 10, "SIL-T");
  assert.deepEqual(
    useCart.getState().items.map((i) => i.quantity),
    [2, 3],
  );
  assert.equal(cart.add("chair", 1, "SIL-T"), false);
  cart.remove("chair", "SIL-ST");
  assert.equal(useCart.getState().items.length, 1);
  assert.equal(useCart.getState().items[0].variantSku, "SIL-T");
  const persisted = JSON.parse(memory.get("vivau-cart"));
  assert.equal(persisted.state.items[0].variantSku, "SIL-T");
});

test("missing, unknown, sold-out and invalid selections cannot enter the cart", () => {
  const cart = useCart.getState();
  assert.equal(cart.add("chair"), false);
  assert.equal(cart.add("chair", 1, "unknown"), false);
  assert.equal(cart.add("chair", 1, "SIL-0"), false);
  assert.equal(cart.add("chair", -1, "SIL-T"), false);
  assert.equal(cart.add("chair", NaN, "SIL-T"), false);
  assert.equal(cart.add("chair", 1.5, "SIL-T"), false);
  assert.equal(useCart.getState().items.length, 0);
});

test("ordinary products still add, update and remove normally", () => {
  const cart = useCart.getState();
  assert.equal(cart.add("table", 2), true);
  cart.setQty("table", 3);
  assert.equal(useCart.getState().items[0].quantity, 3);
  cart.setQty("table", 0);
  assert.equal(useCart.getState().items.length, 0);
});

test("legacy persisted products gain variants without losing local fields", () => {
  const legacy = { ...chair, material: "Material local", stock: 4, variants: undefined };
  const migrated = useProducts.persist.getOptions().migrate({ products: [legacy] }, 0);
  assert.equal(migrated.products[0].material, "Material local");
  assert.equal(migrated.products[0].variants[1].sku, "SIL-T");
  const oldCart = useCart.persist
    .getOptions()
    .migrate({ items: [{ productId: "chair", quantity: 1 }] }, 0);
  assert.equal(oldCart.items[0].variantSku, "SIL-ST");
});

test("product detail button adds the selected variant and reports success only when accepted", () => {
  const React = require("react");
  const { renderToString } = require("react-dom/server");
  const messages = [];
  let addButton;
  const passThrough = ({ children }) => React.createElement("div", null, children);
  const { ProductDetail } = loadSource(
    "src/routes/_site.producto.$slug.tsx",
    {
      "@tanstack/react-router": {
        createFileRoute: () => (options) => options,
        Link: passThrough,
      },
      "@/lib/mock-data": {
        categories: [],
        effectivePrice: (product) => product.salePrice ?? product.price,
        discountPct: () => 0,
        formatCL: (price) => String(price),
      },
      "@/lib/store": { useCart, useProducts },
      "@/lib/product-variants": variants,
      "@/components/ui/button": {
        Button: (props) => {
          if (React.Children.toArray(props.children).includes("Añadir al carrito")) {
            addButton = props.onClick;
          }
          return React.createElement("button", null, props.children);
        },
      },
      "@/components/ui/badge": { Badge: passThrough },
      "@/components/site/ProductGallery": { ProductGallery: () => null },
      "@/components/site/ProductCard": { ProductCard: () => null },
      sonner: {
        toast: {
          success: (message) => messages.push({ kind: "success", message }),
          error: (message) => messages.push({ kind: "error", message }),
        },
      },
    },
    "\nexports.ProductDetail = ProductDetail;",
  );
  const selectedChair = {
    ...chair,
    categorySlugs: [],
    variants: [chair.variants[1], chair.variants[0]],
  };
  renderToString(
    React.createElement(ProductDetail, {
      baseProduct: selectedChair,
      products: [],
    }),
  );
  assert.equal(typeof addButton, "function");
  addButton();
  assert.equal(useCart.getState().items.length, 1);
  const item = useCart.getState().items[0];
  assert.equal(item.variantSku, "SIL-T");
  const line = variants.resolveProduct(chair, item.variantSku);
  assert.equal(line.sku, "SIL-T");
  assert.equal(line.price * item.quantity, 69990);
  assert.equal(messages[0].kind, "success");
  assert.match(messages[0].message, /Tapizada/);
  useCart.getState().setQty("chair", 3, "SIL-T");
  addButton();
  assert.equal(messages[1].kind, "error");
  assert.equal(useCart.getState().items[0].quantity, 3);
});
