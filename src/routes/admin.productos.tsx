import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2, Search, X, Upload } from "lucide-react";
import { useProducts } from "@/lib/store";
import { type Product, categories, effectivePrice, formatMXN } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/productos")({
  loader: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

const emptyProduct = (): Product => ({
  id: `p-${Date.now()}`,
  name: "",
  slug: "",
  categorySlug: categories[0].slug,
  brand: "VIVAU Artesanos",
  description: "",
  shortDescription: "",
  image: "",
  gallery: [],
  price: 0,
  stock: 0,
  sku: "",
  material: "",
  dimensions: "",
  weight: "",
  featured: false,
  active: true,
  tags: [],
  createdAt: new Date().toISOString().slice(0, 10),
  updatedAt: new Date().toISOString().slice(0, 10),
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function AdminProducts() {
  const { products, upsert, remove } = useProducts();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase()),
      ),
    [products, query],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Productos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Administra tu catálogo, precios y disponibilidad.
          </p>
        </div>
        <Button onClick={() => setEditing(emptyProduct())} className="gap-2">
          <Plus className="h-4 w-4" /> Nuevo producto
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o SKU"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {categories.find((c) => c.slug === p.categorySlug)?.name}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{formatMXN(effectivePrice(p))}</span>
                    {p.salePrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatMXN(p.price)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      p.stock === 0
                        ? "text-destructive"
                        : p.stock <= 3
                          ? "text-accent"
                          : ""
                    }
                  >
                    {p.stock}
                  </span>
                </TableCell>
                <TableCell>
                  {p.active ? (
                    <Badge variant="secondary">Activo</Badge>
                  ) : (
                    <Badge variant="outline">Inactivo</Badge>
                  )}
                  {p.featured && (
                    <Badge className="ml-1 bg-accent text-accent-foreground">Destacado</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => setEditing({ ...p })}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center text-muted-foreground">
                  No hay productos que coincidan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Editor */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          {editing && (
            <ProductForm
              value={editing}
              onCancel={() => setEditing(null)}
              onSave={(p) => {
                if (!p.name || !p.price) {
                  toast.error("Nombre y precio son obligatorios");
                  return;
                }
                const finalProduct: Product = {
                  ...p,
                  slug: p.slug || slugify(p.name),
                  image: p.image || p.gallery[0] || "",
                  updatedAt: new Date().toISOString().slice(0, 10),
                };
                upsert(finalProduct);
                toast.success("Producto guardado");
                setEditing(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm delete */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar producto?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteId) {
                  remove(deleteId);
                  toast.success("Producto eliminado");
                }
                setDeleteId(null);
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({
  value,
  onSave,
  onCancel,
}: {
  value: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [p, setP] = useState<Product>(value);
  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((cur) => ({ ...cur, [k]: v }));

  const handleFile = (files: FileList | null, target: "image" | "gallery") => {
    if (!files || files.length === 0) return;
    const readers = Array.from(files).map(
      (f) =>
        new Promise<string>((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(f);
        }),
    );
    Promise.all(readers).then((urls) => {
      if (target === "image") set("image", urls[0]);
      else set("gallery", [...p.gallery, ...urls]);
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">
          {value.name ? "Editar producto" : "Nuevo producto"}
        </DialogTitle>
      </DialogHeader>

      <div className="grid gap-5 py-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Nombre *</Label>
            <Input className="mt-1.5" value={p.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <Label>SKU</Label>
            <Input className="mt-1.5" value={p.sku} onChange={(e) => set("sku", e.target.value)} />
          </div>
          <div>
            <Label>Slug (URL)</Label>
            <Input
              className="mt-1.5"
              value={p.slug}
              placeholder={slugify(p.name)}
              onChange={(e) => set("slug", e.target.value)}
            />
          </div>
          <div>
            <Label>Marca</Label>
            <Input className="mt-1.5" value={p.brand} onChange={(e) => set("brand", e.target.value)} />
          </div>
          <div>
            <Label>Categoría</Label>
            <Select value={p.categorySlug} onValueChange={(v) => set("categorySlug", v)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Etiquetas (separadas por coma)</Label>
            <Input
              className="mt-1.5"
              value={p.tags.join(", ")}
              onChange={(e) =>
                set(
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                )
              }
            />
          </div>
        </div>

        <div>
          <Label>Descripción corta</Label>
          <Input
            className="mt-1.5"
            value={p.shortDescription}
            onChange={(e) => set("shortDescription", e.target.value)}
          />
        </div>
        <div>
          <Label>Descripción</Label>
          <Textarea
            className="mt-1.5"
            rows={4}
            value={p.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label>Precio *</Label>
            <Input
              type="number"
              className="mt-1.5"
              value={p.price || ""}
              onChange={(e) => set("price", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Precio oferta</Label>
            <Input
              type="number"
              className="mt-1.5"
              value={p.salePrice ?? ""}
              onChange={(e) =>
                set("salePrice", e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
          <div>
            <Label>Stock</Label>
            <Input
              type="number"
              className="mt-1.5"
              value={p.stock}
              onChange={(e) => set("stock", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Material</Label>
            <Input className="mt-1.5" value={p.material} onChange={(e) => set("material", e.target.value)} />
          </div>
          <div>
            <Label>Dimensiones</Label>
            <Input
              className="mt-1.5"
              value={p.dimensions}
              onChange={(e) => set("dimensions", e.target.value)}
            />
          </div>
          <div>
            <Label>Peso</Label>
            <Input className="mt-1.5" value={p.weight} onChange={(e) => set("weight", e.target.value)} />
          </div>
        </div>

        <div>
          <Label>Imagen principal</Label>
          <div className="mt-1.5 flex items-center gap-4">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
              {p.image ? (
                <img src={p.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-xs text-muted-foreground">Sin imagen</div>
              )}
            </div>
            <div className="flex-1">
              <Input
                placeholder="URL de imagen"
                value={p.image.startsWith("data:") ? "" : p.image}
                onChange={(e) => set("image", e.target.value)}
              />
              <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
                <Upload className="h-3.5 w-3.5" /> Subir archivo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files, "image")}
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <Label>Galería</Label>
          <div className="mt-1.5 grid grid-cols-4 gap-2">
            {p.gallery.map((g, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md border border-border">
                <img src={g} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => set("gallery", p.gallery.filter((_, x) => x !== i))}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/90"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <label className="grid aspect-square cursor-pointer place-items-center rounded-md border-2 border-dashed border-border text-xs text-muted-foreground hover:bg-secondary">
              <Upload className="h-4 w-4" />
              <span>Añadir</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFile(e.target.files, "gallery")}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-3">
            <Switch checked={p.featured} onCheckedChange={(v) => set("featured", v)} />
            <span className="text-sm">Producto destacado</span>
          </label>
          <label className="flex items-center gap-3">
            <Switch checked={p.active} onCheckedChange={(v) => set("active", v)} />
            <span className="text-sm">Activo</span>
          </label>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={() => onSave(p)}>Guardar</Button>
      </DialogFooter>
    </>
  );
}
