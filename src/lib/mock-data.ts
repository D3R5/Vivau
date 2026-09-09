import { images } from "./images";

export type Category = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  brand: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
  material: string;
  dimensions: string;
  weight: string;
  featured: boolean;
  active: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export const categories: Category[] = [
  {
    slug: "sala",
    name: "Sala",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    description: "Sofás, mesas de centro y muebles para tu sala de estar.",
  },
  {
    slug: "comedor",
    name: "Comedor",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80",
    description: "Mesas y sillas artesanales para reuniones inolvidables.",
  },
  {
    slug: "recamara",
    name: "Recámara",
    image:
      "https://images.unsplash.com/photo-1616627052149-22c4f8a6316e?auto=format&fit=crop&w=1200&q=80",
    description: "Camas, burós y armarios con acabados en madera natural.",
  },
  {
    slug: "oficina",
    name: "Oficina",
    image:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1200&q=80",
    description: "Escritorios y libreros para tu espacio de trabajo.",
  },
  {
    slug: "exterior",
    name: "Exterior",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Muebles resistentes para jardín, patio y terraza.",
  },
];

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "p-001",
    name: "Mesa de Centro",
    slug: "mesa-centro",
    categorySlug: "sala",
    brand: "Artesanal",
    description:
      "Dale un toque de estilo y funcionalidad a tu sala con esta mesa de centro, diseñada para convertirse en el punto focal de tu espacio. Su diseño versátil se adapta a distintos estilos de decoración, mientras que su amplia superficie es perfecta para colocar libros, revistas, bebidas, controles remotos o elementos decorativos. Fabricada con materiales de calidad, ofrece estabilidad, resistencia y una apariencia elegante que complementa cualquier ambiente del hogar. Ideal para crear un espacio acogedor y práctico en tu living.",
    shortDescription:
      "Mesa de centro moderna y funcional, ideal para complementar tu sala de estar con estilo, ofreciendo una superficie práctica para decorar o apoyar objetos de uso diario.",
    image: images.mesaCentro.cover,
    gallery: images.mesaCentro.gallery,
    price: 87990,
    stock: 1,
    sku: "MC-001",
    material: "Hierro, Madera Raulí",
    dimensions: "110 × 58 × 43 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["mesa", "rauli", "sala"],
    createdAt: "2025-03-02",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-002",
    name: "Rack para TV",
    slug: "rack-tv",
    categorySlug: "sala",
    brand: "Artesanal",
    description:
      "Organiza y realza tu sala de estar con este rack para televisor, diseñado para combinar estilo, funcionalidad y practicidad. Cuenta con un diseño versátil que se adapta a diferentes estilos de decoración, ofreciendo espacio para televisores, consolas, decodificadores, parlantes y objetos decorativos. Su estructura resistente brinda estabilidad y durabilidad, mientras que sus compartimentos ayudan a mantener cables y accesorios ordenados. La opción ideal para crear un ambiente moderno, organizado y acogedor en tu hogar.",
    shortDescription:
      "Rack para televisor con diseño moderno y funcional, ideal para organizar tu espacio de entretenimiento y mantener equipos, accesorios y decoración siempre al alcance.",
    image: images.rackTv.cover,
    gallery: images.rackTv.gallery,
    price: 219990,
    stock: 1,
    sku: "RT-001",
    material: "Patas de Hierro, Cajonera en Madera de Álamo, Cubierta de Madera de Raulí",
    dimensions: "170 × 65 × 38 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["rack", "tv", "sala", "alamo", "rauli", "hierro"],
    createdAt: "2025-03-02",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-003",
    name: "Perchero de Hierro",
    slug: "perchero-hierro",
    categorySlug: "sala",
    brand: "Artesanos",
    description:
      "Mantén tus prendas y accesorios siempre organizados con este perchero de hierro, diseñado para ofrecer resistencia, estabilidad y un estilo contemporáneo. Su estructura metálica proporciona gran durabilidad para el uso diario, mientras que su diseño versátil se adapta fácilmente a recibidores, dormitorios, salas de estar, oficinas o locales comerciales. Perfecto para colgar chaquetas, abrigos, bolsos, sombreros y otros accesorios, optimizando el espacio y aportando un toque moderno a cualquier ambiente.",
    shortDescription:
      "Perchero de hierro con diseño moderno y resistente, ideal para organizar chaquetas, abrigos, bolsos y accesorios en cualquier espacio del hogar u oficina.",
    image: images.percheroHierro.cover,
    gallery: images.percheroHierro.gallery,
    price: 19990,
    // salePrice: 36900,
    stock: 1,
    sku: "PH-001",
    material: "Hierro",
    dimensions: "50 × 25 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["comedor", "parota", "rústico"],
    createdAt: "2025-01-20",
    updatedAt: "2025-05-11",
  },
  {
    id: "p-004",
    name: "Arrimo Diseño 1",
    slug: "arrimo-diseño-1",
    categorySlug: "comedor",
    brand: "VIVAU Artesanos",
    description:
      "Arrimo de diseño elegante con estructura de hierro resistente y cubierta de raulí, que combina solidez y calidez natural para complementar distintos espacios.",
    shortDescription: "Arrimo de hierro con cubierta de raulí, resistente y elegante.",
    image: images.arrimo1.cover,
    gallery: images.arrimo1.gallery,
    price: 85000,
    stock: 1,
    sku: "AR-001",
    material: "Hierro, Madera Raulí",
    dimensions: "110 × 30 × 85 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["arrimo", "hierro", "rauli"],
    createdAt: "2025-02-01",
    updatedAt: "2025-05-11",
  },
  {
    id: "p-005",
    name: "Arrimo Diseño 2",
    slug: "arrimo-diseño-2",
    categorySlug: "comedor",
    brand: "VIVAU Artesanos",
    description:
      "Arrimo de diseño elegante con estructura de hierro resistente y cubierta de raulí, que combina solidez y calidez natural para complementar distintos espacios.",
    shortDescription: "Arrimo de hierro con cubierta de raulí, resistente y elegante.",
    image: images.arrimo2.cover,
    gallery: images.arrimo2.gallery,
    price: 90000,
    stock: 1,
    sku: "AR-002",
    material: "Hierro, Madera Raulí",
    dimensions: "110 × 30 × 85 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["arrimo", "hierro", "rauli"],
    createdAt: "2025-02-01",
    updatedAt: "2025-05-11",
  },
  {
    id: "p-006",
    name: "Arrimo Diseño 3",
    slug: "arrimo-diseño-3",
    categorySlug: "comedor",
    brand: "VIVAU Artesanos",
    description:
      "Arrimo de diseño elegante con estructura de hierro resistente y cubierta de raulí, que combina solidez y calidez natural para complementar distintos espacios.",
    shortDescription: "Arrimo de hierro con cubierta de raulí, resistente y elegante.",
    image: images.arrimo3.cover,
    gallery: images.arrimo3.gallery,
    price: 100000,
    stock: 1,
    sku: "AR-001",
    material: "Hierro, Madera Raulí",
    dimensions: "110 × 30 × 85 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["arrimo", "hierro", "rauli"],
    createdAt: "2025-02-01",
    updatedAt: "2025-05-11",
  },
  {
    id: "p-007",
    name: "Banca Diseño 1",
    slug: "banca-diseño-1",
    categorySlug: "oficina",
    brand: "VIVAU Artesanos",
    description:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera. Su diseño combina la robustez del hierro con la calidez de la madera, ofreciendo comodidad y estilo. Perfecta para recibir a tus visitantes o para crear un rincón acogedor en tu oficina, esta banca es una pieza funcional y decorativa que se adapta a distintos ambientes.",
    shortDescription:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera.",
    image: images.banca1.cover,
    gallery: images.banca1.gallery,
    price: 135000,
    stock: 1,
    sku: "BD-001",
    material: "Hierro. Madera de Pino",
    dimensions: "145 × 75 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["banca", "oficina", "hierro", "pino"],
    createdAt: "2025-04-15",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-008",
    name: "Banca Diseño 2",
    slug: "banca-diseño-2",
    categorySlug: "oficina",
    brand: "VIVAU Artesanos",
    description:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera. Su diseño combina la robustez del hierro con la calidez de la madera, ofreciendo comodidad y estilo. Perfecta para recibir a tus visitantes o para crear un rincón acogedor en tu oficina, esta banca es una pieza funcional y decorativa que se adapta a distintos ambientes.",
    shortDescription:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera.",
    image: images.banca2.cover,
    gallery: images.banca2.gallery,
    price: 150000,
    stock: 1,
    sku: "BD-002",
    material: "Hierro. Madera de Pino",
    dimensions: "145 × 75 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["banca", "oficina", "hierro", "pino"],
    createdAt: "2025-04-15",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-010",
    name: "Mesita Esquinera",
    slug: "mesita-esquinera",
    categorySlug: "sala",
    brand: "VIVAU Artesanos",
    description:
      "Mesita esquinera de hierro y madera de raulí, ideal para complementar tu sala o dormitorio con estilo y funcionalidad. Su diseño compacto permite ubicarla en esquinas, optimizando el espacio disponible. La combinación de hierro y madera aporta un toque moderno y cálido a cualquier ambiente, mientras que su superficie es perfecta para colocar lámparas, libros o elementos decorativos. Una pieza versátil que combina estética y practicidad en tu hogar.",
    shortDescription:
      "Mesita esquinera de hierro y madera de raulí, ideal para complementar tu sala o dormitorio con estilo y funcionalidad.",
    image: images.mesitaEsquinera.cover,
    gallery: images.mesitaEsquinera.gallery,
    price: 60000,
    // salePrice: 27900,
    stock: 2,
    sku: "SJ-009",
    material: "Estructura de hierro y cubiertas en rauli",
    dimensions: "80 × 60 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["mesita", "esquinera", "hierro", "rauli"],
    createdAt: "2025-05-01",
    updatedAt: "2025-06-15",
  },
];

export const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

export const discountPct = (p: Product) =>
  p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
