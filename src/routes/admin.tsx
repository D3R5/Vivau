import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Package, Boxes, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  loader: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/productos", label: "Productos", icon: Package },
  { to: "/admin/inventario", label: "Inventario", icon: Boxes },
];

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-secondary/20">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-primary text-primary-foreground font-display text-sm">
            MR
          </span>
          <div>
            <p className="font-display leading-tight">Muebles VIVAU</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-medium" }}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <Link to="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Volver a la tienda
          </Link>
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-6 md:hidden">
          <span className="font-display">Admin · Muebles VIVAU</span>
        </header>
        <nav className="flex gap-1 border-b border-border bg-background px-4 py-2 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact }}
              className="rounded px-3 py-1.5 text-xs"
              activeProps={{ className: "bg-secondary font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <main className="p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
