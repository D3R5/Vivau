const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const ts = require("typescript");

function loadSource(file, dependencies = {}) {
  const { outputText } = ts.transpileModule(readFileSync(resolve(__dirname, "..", file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (id) => dependencies[id] ?? require(id),
    module,
    module.exports,
  );
  return module.exports;
}

const variants = loadSource("src/lib/product-variants.ts");
const { parseCatalogSearch, filterCatalog, paginateCatalog } = loadSource("src/lib/catalog.ts", {
  "./mock-data": { effectivePrice: (product) => product.salePrice ?? product.price },
  "./product-variants": variants,
});
const products = [
  {
    id: "bed",
    name: "Base de cama",
    categorySlugs: ["recamara"],
    active: true,
    price: 149990,
    variants: [
      { name: "2 plazas", sku: "2P", price: 149990 },
      { name: "King", sku: "K", price: 159990 },
    ],
  },
  {
    id: "chair",
    name: "Silla de Raulí",
    categorySlugs: ["comedor"],
    active: true,
    price: 59990,
    variants: [
      { name: "Sin tapiz", sku: "ST", price: 59990 },
      { name: "Tapizada", sku: "T", price: 69990, salePrice: 64990 },
    ],
  },
  {
    id: "table",
    name: "Mesa de centro",
    categorySlugs: ["sala"],
    active: true,
    price: 94990,
    salePrice: 54990,
  },
  {
    id: "hidden",
    name: "Mueble sin publicar",
    categorySlugs: ["sala"],
    active: false,
    price: 1000,
  },
];

test("price sorting includes discounts and variant prices without changing the source catalog", () => {
  assert.deepEqual(
    filterCatalog(products, { orden: "precio-asc" }).map((p) => p.id),
    ["table", "chair", "bed"],
  );
  assert.deepEqual(
    filterCatalog(products, { orden: "precio-desc" }).map((p) => p.id),
    ["bed", "chair", "table"],
  );
  assert.deepEqual(
    filterCatalog(products, {}).map((p) => p.id),
    ["bed", "chair", "table"],
  );
  assert.deepEqual(
    products.map((p) => p.id),
    ["bed", "chair", "table", "hidden"],
  );
});

test("category, search and budget combine, including searches without accents", () => {
  const filters = { categoria: "comedor", q: "  RAULI  ", precioMax: 60000 };
  assert.deepEqual(
    filterCatalog(products, filters).map((p) => p.id),
    ["chair"],
  );
  assert.equal(filterCatalog(products, { ...filters, categoria: "sala" }).length, 0);
  assert.equal(filterCatalog(products, { ...filters, precioMax: 50000 }).length, 0);
});

test("offer and budget must apply to the same variant", () => {
  assert.equal(
    filterCatalog(products, { categoria: "comedor", ofertas: true, precioMax: 60000 }).length,
    0,
  );
  assert.deepEqual(
    filterCatalog(products, { categoria: "comedor", ofertas: true, precioMax: 65000 }).map(
      (p) => p.id,
    ),
    ["chair"],
  );
  assert.deepEqual(
    filterCatalog(products, { ofertas: true }).map((p) => p.id),
    ["chair", "table"],
  );
});

test("URL search parameters restore applied filters and reject malformed values", () => {
  assert.deepEqual(
    parseCatalogSearch({
      categoria: "sala",
      ofertas: "true",
      q: "mesa",
      precioMax: "100000",
      orden: "precio-desc",
      page: "2",
    }),
    {
      categoria: "sala",
      ofertas: true,
      q: "mesa",
      precioMax: 100000,
      orden: "precio-desc",
      page: 2,
    },
  );
  const invalid = parseCatalogSearch({
    categoria: [],
    ofertas: "false",
    q: {},
    precioMax: "Infinity",
    orden: "unknown",
    page: -4,
  });
  assert.equal(invalid.precioMax, undefined);
  assert.equal(invalid.page, 1);
  assert.equal(invalid.orden, undefined);
  assert.equal(invalid.ofertas, undefined);
  assert.equal(parseCatalogSearch({ precioMax: "" }).precioMax, undefined);
  assert.equal(parseCatalogSearch({ precioMax: -1 }).precioMax, undefined);
  assert.equal(parseCatalogSearch({ precioMax: "0" }).precioMax, 0);
});

test("pagination follows global price order and recovers when filtering removes pages", () => {
  const many = Array.from({ length: 20 }, (_, index) => ({
    ...products[2],
    id: String(index),
    variants: undefined,
    salePrice: undefined,
    price: 20000 - index * 500,
  }));
  const sorted = filterCatalog(many, { orden: "precio-asc" });
  const first = paginateCatalog(sorted, 1);
  assert.equal(first.totalPages, 3);
  assert.deepEqual(
    first.items.map((p) => p.price),
    [10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500],
  );
  assert.equal(paginateCatalog(sorted.slice(0, 2), 3).currentPage, 1);
  assert.deepEqual(paginateCatalog([], 9), { currentPage: 1, totalPages: 1, items: [] });
});
