import { images } from "./images";

export type Category = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

export type ProductVariant = {
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock?: number;
  description?: string;
  shortDescription?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  image?: string;
  gallery?: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categorySlugs: string[];
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
  variants?: ProductVariant[];
};

export const categories: Category[] = [
  {
    slug: "sala",
    name: "Sala",
    image: images.sala.cover,
    description: "Sofás, mesas de centro y muebles para tu sala de estar.",
  },
  {
    slug: "comedor",
    name: "Comedor",
    image: images.comedor.cover,
    description: "Mesas y sillas artesanales para reuniones inolvidables.",
  },
  {
    slug: "recamara",
    name: "Recámara",
    image: images.recamara.cover,
    description: "Camas, burós y armarios con acabados en madera natural.",
  },
  {
    slug: "oficina",
    name: "Oficina",
    image: images.oficina.cover,
    description: "Escritorios y libreros para tu espacio de trabajo.",
  },
  {
    slug: "exterior",
    name: "Exterior",
    image: images.exterior.cover,
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
    categorySlugs: ["sala"],
    brand: "Artesanal",
    description:
      "Dale un toque de estilo y funcionalidad a tu sala con esta mesa de centro, diseñada para convertirse en el punto focal de tu espacio. Su diseño versátil se adapta a distintos estilos de decoración, mientras que su amplia superficie es perfecta para colocar libros, revistas, bebidas, controles remotos o elementos decorativos. Fabricada con materiales de calidad, ofrece estabilidad, resistencia y una apariencia elegante que complementa cualquier ambiente del hogar. Ideal para crear un espacio acogedor y práctico en tu living.",
    shortDescription:
      "Mesa de centro moderna y funcional, ideal para complementar tu sala de estar con estilo, ofreciendo una superficie práctica para decorar o apoyar objetos de uso diario.",
    image: images.mesaCentro.cover,
    gallery: images.mesaCentro.gallery,
    price: 94990,
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
    name: "Rack para TV Diseño 1",
    slug: "rack-tv",
    categorySlugs: ["sala", "recamara"],
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
    name: "Rack para TV Diseño 2",
    slug: "rack-tv-2",
    categorySlugs: ["sala", "recamara"],
    brand: "Artesanal",
    description:
      "Organiza y realza tu sala de estar con este rack para televisor, diseñado para combinar estilo, funcionalidad y practicidad. Cuenta con un diseño versátil que se adapta a diferentes estilos de decoración, ofreciendo espacio para televisores, consolas, decodificadores, parlantes y objetos decorativos. Su estructura resistente brinda estabilidad y durabilidad, mientras que sus compartimentos ayudan a mantener cables y accesorios ordenados. La opción ideal para crear un ambiente moderno, organizado y acogedor en tu hogar.",
    shortDescription:
      "Rack para televisor con diseño moderno y funcional, ideal para organizar tu espacio de entretenimiento y mantener equipos, accesorios y decoración siempre al alcance.",
    image: images.rackTv2.cover,
    gallery: images.rackTv2.gallery,
    price: 109990,
    stock: 1,
    sku: "RT-002",
    material: "Patas de Hierro, Madera de Raulí",
    dimensions: "120 × 60 × 37 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["rack", "tv", "sala", "rauli", "hierro"],
    createdAt: "2025-03-02",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-004",
    name: "Perchero de Hierro",
    slug: "perchero-hierro",
    categorySlugs: ["sala", "recamara"],
    brand: "Artesanos",
    description:
      "Mantén tus prendas y accesorios siempre organizados con este perchero de hierro, diseñado para ofrecer resistencia, estabilidad y un estilo contemporáneo. Su estructura metálica proporciona gran durabilidad para el uso diario, mientras que su diseño versátil se adapta fácilmente a recibidores, dormitorios, salas de estar, oficinas o locales comerciales. Perfecto para colgar chaquetas, abrigos, bolsos, sombreros y otros accesorios, optimizando el espacio y aportando un toque moderno a cualquier ambiente.",
    shortDescription:
      "Perchero de hierro con diseño moderno y resistente, ideal para organizar chaquetas, abrigos, bolsos y accesorios en cualquier espacio del hogar u oficina.",
    image: images.percheroHierro.cover,
    gallery: images.percheroHierro.gallery,
    price: 22990,
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
    id: "p-005",
    name: "Arrimo Diseño 1",
    slug: "arrimo-diseño-1",
    categorySlugs: ["sala", "comedor"],
    brand: "VIVAU Artesanos",
    description:
      "Arrimo de diseño elegante con estructura de hierro resistente y cubierta de raulí, que combina solidez y calidez natural para complementar distintos espacios.",
    shortDescription: "Arrimo de hierro con cubierta de raulí, resistente y elegante.",
    image: images.arrimo1.cover,
    gallery: images.arrimo1.gallery,
    price: 94990,
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
    id: "p-006",
    name: "Arrimo Diseño 2",
    slug: "arrimo-diseño-2",
    categorySlugs: ["sala", "comedor"],
    brand: "VIVAU Artesanos",
    description:
      "Arrimo de diseño elegante con estructura de hierro resistente y cubierta de raulí, que combina solidez y calidez natural para complementar distintos espacios.",
    shortDescription: "Arrimo de hierro con cubierta de raulí, resistente y elegante.",
    image: images.arrimo2.cover,
    gallery: images.arrimo2.gallery,
    price: 114990,
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
    id: "p-007",
    name: "Arrimo Diseño 3",
    slug: "arrimo-diseño-3",
    categorySlugs: ["sala"],
    brand: "VIVAU Artesanos",
    description:
      "Arrimo de diseño elegante con estructura de hierro resistente y cubierta de raulí, que combina solidez y calidez natural para complementar distintos espacios.",
    shortDescription: "Arrimo de hierro con cubierta de raulí, resistente y elegante.",
    image: images.arrimo3.cover,
    gallery: images.arrimo3.gallery,
    price: 99990,
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
    id: "p-008",
    name: "Banca Diseño 1",
    slug: "banca-diseño-1",
    categorySlugs: ["exterior"],
    brand: "VIVAU Artesanos",
    description:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera. Su diseño combina la robustez del hierro con la calidez de la madera, ofreciendo comodidad y estilo. Perfecta para recibir a tus visitantes o para crear un rincón acogedor en tu oficina, esta banca es una pieza funcional y decorativa que se adapta a distintos ambientes.",
    shortDescription:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera.",
    image: images.banca1.cover,
    gallery: images.banca1.gallery,
    price: 139990,
    stock: 1,
    sku: "BD-001",
    material: "Hierro. Madera de Pino",
    dimensions: "150 × 75 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["banca", "oficina", "hierro", "pino"],
    createdAt: "2025-04-15",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-009",
    name: "Banca Diseño 2",
    slug: "banca-diseño-2",
    categorySlugs: ["exterior"],
    brand: "VIVAU Artesanos",
    description:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera. Su diseño combina la robustez del hierro con la calidez de la madera, ofreciendo comodidad y estilo. Perfecta para recibir a tus visitantes o para crear un rincón acogedor en tu oficina, esta banca es una pieza funcional y decorativa que se adapta a distintos ambientes.",
    shortDescription:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera.",
    image: images.banca2.cover,
    gallery: images.banca2.gallery,
    price: 154990,
    stock: 1,
    sku: "BD-002",
    material: "Hierro. Madera de Pino",
    dimensions: "150 × 75 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["banca", "oficina", "hierro", "pino"],
    createdAt: "2025-04-15",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-010",
    name: "Banca Diseño 3",
    slug: "banca-diseño-3",
    categorySlugs: ["exterior"],
    brand: "VIVAU Artesanos",
    description:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera. Su diseño combina la robustez del hierro con la calidez de la madera, ofreciendo comodidad y estilo. Perfecta para recibir a tus visitantes o para crear un rincón acogedor en tu oficina, esta banca es una pieza funcional y decorativa que se adapta a distintos ambientes.",
    shortDescription:
      "Banca de dos plazas en hierro y madera de pino, ideal para espacios de oficina o sala de espera.",
    image: images.banca3.cover,
    gallery: images.banca3.gallery,
    price: 114990,
    stock: 1,
    sku: "BD-003",
    material: "Hierro. Madera de Pino",
    dimensions: "120 × 75 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["banca", "oficina", "hierro", "pino"],
    createdAt: "2025-04-15",
    updatedAt: "2025-06-01",
  },
  {
    id: "p-011",
    name: "Mesita Esquinera",
    slug: "mesita-esquinera",
    categorySlugs: ["sala", "comedor"],
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
  {
    id: "p-012",
    name: "Espejo de Raulí Diseño 1",
    slug: "espejo-rauli-50x90",
    categorySlugs: ["sala", "comedor", "recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Espejo de muro fabricado en madera de raulí de alta calidad, diseñado para aportar elegancia y calidez a cualquier espacio. Su formato de 50 x 90 cm lo hace ideal para dormitorios, livings, pasillos o recibidores, ampliando visualmente los ambientes y mejorando la iluminación natural. El marco de raulí, con su veta natural y acabado fino, entrega un estilo moderno y atemporal que se adapta a distintos tipos de decoración. Una pieza funcional y decorativa que realza tu hogar con un toque artesanal.",
    shortDescription:
      "Espejo de muro en madera de raulí 50x90 cm, ideal para ampliar y decorar tus espacios con estilo.",
    image: images.espejo.cover,
    gallery: images.espejo.gallery,
    price: 52990,
    // salePrice: 47990,
    stock: 3,
    sku: "ER-011",
    material: "Marco de madera de raulí",
    dimensions: "50 × 90 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["espejo", "rauli", "decoracion", "muro"],
    createdAt: "2025-05-10",
    updatedAt: "2025-06-20",
  },
  {
    id: "p-013",
    name: "Espejo de Raulí Diseño 2",
    slug: "espejo-rauli-diseño-2",
    categorySlugs: ["sala", "comedor", "recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Espejo de muro fabricado en madera de raulí de alta calidad, diseñado para aportar elegancia y calidez a cualquier espacio. Su formato de 50 x 90 cm lo hace ideal para dormitorios, livings, pasillos o recibidores, ampliando visualmente los ambientes y mejorando la iluminación natural. El marco de raulí, con su veta natural y acabado fino, entrega un estilo moderno y atemporal que se adapta a distintos tipos de decoración. Una pieza funcional y decorativa que realza tu hogar con un toque artesanal.",
    shortDescription:
      "Espejo de muro en madera de raulí 50x90 cm, ideal para ampliar y decorar tus espacios con estilo.",
    image: images.espejo2.cover,
    gallery: images.espejo2.gallery,
    price: 62990,
    // salePrice: 47990,
    stock: 3,
    sku: "ER-012",
    material: "Marco de madera de raulí",
    dimensions: "55 × 110 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["espejo", "rauli", "decoracion", "muro"],
    createdAt: "2025-05-10",
    updatedAt: "2025-06-20",
  },
  {
    id: "p-014",
    name: "Estante",
    slug: "estante-rauli-diseno-1",
    categorySlugs: ["sala", "recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Estante de muro fabricado en madera de raulí y hierro de alta calidad, diseñado para aportar funcionalidad y estilo a cualquier espacio. Su estructura sólida y acabado fino resaltan la veta natural de la madera, entregando un aspecto cálido y elegante. Ideal para organizar libros, objetos decorativos, plantas o accesorios en livings, dormitorios, oficinas o recibidores. Su diseño minimalista y versátil se adapta a distintos estilos de decoración, convirtiéndolo en una pieza práctica y decorativa para tu hogar.",
    shortDescription:
      "Estante de muro en madera de raulí y hierro, ideal para organizar y decorar tus espacios con estilo.",
    image: images.estante1.cover,
    gallery: images.estante1.gallery,
    price: 69990,
    // salePrice: 44990,
    stock: 5,
    sku: "ES-013",
    material: "Madera de raulí",
    dimensions: "175 × 60 × 23 cm",
    weight: "--",
    featured: true,
    active: true,
    tags: ["estante", "rauli", "decoracion", "muro", "organizacion"],
    createdAt: "2025-05-10",
    updatedAt: "2025-06-20",
  },

  {
    id: "p-015",
    name: "Esquinero",
    slug: "esquinero-madera-hierro",
    categorySlugs: ["exterior", "sala"],
    brand: "VIVAU Artesanos",
    description:
      "Mueble esquinero fabricado en madera y hierro, diseñado para aprovechar los espacios con un estilo moderno y funcional. La combinación de materiales aporta carácter y resistencia, mientras que la madera destaca por su apariencia natural. Ideal para complementar terrazas, livings, rincones decorativos o espacios exteriores protegidos, aportando personalidad y practicidad al ambiente.",
    shortDescription:
      "Mueble esquinero de madera y hierro, ideal para aprovechar tus espacios con un diseño funcional y elegante.",
    image: images.esquinero.cover,
    gallery: images.esquinero.gallery,
    price: 49990,
    stock: 1,
    sku: "ESQ-015",
    material: "Madera y hierro",
    dimensions: "165 × 60 cm",
    weight: "--",
    featured: false,
    active: true,
    tags: ["esquinero", "madera", "hierro", "sala", "exterior"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-016",
    name: "Estante XL",
    slug: "estante-xl-madera-hierro",
    categorySlugs: ["sala", "recamara", "oficina"],
    brand: "VIVAU Artesanos",
    description:
      "Estante XL fabricado en madera y hierro, ideal para organizar y exhibir libros, plantas, adornos y objetos personales. Su formato de gran tamaño ofrece una amplia superficie de almacenamiento, mientras que la estructura metálica y los detalles en madera crean una combinación de estilo industrial y calidez natural. Perfecto para livings, dormitorios y oficinas que necesitan organización sin renunciar al diseño.",
    shortDescription:
      "Estante XL de madera y hierro, con gran capacidad para organizar y decorar tus espacios.",
    image: images.estanteXl.cover,
    gallery: images.estanteXl.gallery,
    price: 139990,
    stock: 1,
    sku: "EST-016",
    material: "Madera y hierro",
    dimensions: "180 × 120 × 24 cm",
    weight: "--",
    featured: false,
    active: true,
    tags: ["estante", "xl", "madera", "hierro", "organizacion", "decoracion"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-017",
    name: "Mueble para Sala",
    slug: "mueble-sala-madera-rauli-hierro",
    categorySlugs: ["sala", "recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Mueble para sala fabricado en madera de raulí y hierro, que combina funcionalidad, resistencia y un diseño contemporáneo. Su superficie permite organizar equipos, libros, adornos y otros objetos, convirtiéndolo en una pieza versátil para distintos ambientes del hogar. La veta natural del raulí aporta calidez y personalidad, mientras que la estructura de hierro complementa su estilo moderno.",
    shortDescription:
      "Mueble para sala de madera de raulí y hierro, ideal para organizar y complementar tus espacios.",
    image: images.muebleSala1.cover,
    gallery: images.muebleSala1.gallery,
    price: 99990,
    stock: 1,
    sku: "MS-017",
    material: "Madera de raulí y hierro",
    dimensions: "170 × 60 × 30 cm",
    weight: "--",
    featured: false,
    active: true,
    tags: ["mueble", "sala", "rauli", "hierro", "organizacion"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-018",
    name: "Escritorio",
    slug: "escritorio-madera-hierro",
    categorySlugs: ["oficina", "recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Escritorio diseñado para crear un espacio de trabajo cómodo y organizado en el hogar. Su superficie amplia permite disponer un computador, documentos y accesorios de uso diario, mientras que su diseño versátil se adapta a oficinas, dormitorios y zonas de estudio. Una pieza funcional que complementa distintos estilos de decoración y ayuda a mantener cada espacio ordenado.",
    shortDescription:
      "Escritorio de diseño funcional, ideal para trabajar, estudiar y organizar tus actividades diarias.",
    image: images.escritorio1.cover,
    gallery: images.escritorio1.gallery,
    price: 164990, // Confirmar precio
    stock: 1,
    sku: "ESC-018",
    material: "Por confirmar",
    dimensions: "150 × 77 × 58 cm",
    weight: "--",
    featured: false,
    active: false, // Activar cuando se confirme el precio
    tags: ["escritorio", "oficina", "estudio", "trabajo", "recamara"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-019",
    name: "Banca de Raulí",
    slug: "banca-madera-rauli",
    categorySlugs: ["exterior"],
    brand: "VIVAU Artesanos",
    description:
      "Banca de madera de raulí fabricada íntegramente con esta madera nativa, destacando sus tonalidades, vetas y belleza natural. Su diseño aporta calidez y elegancia a terrazas, patios, jardines y otros espacios exteriores. Una pieza de carácter natural, ideal para quienes buscan mobiliario de madera con presencia y personalidad. Para conservar su acabado, se recomienda protegerla de la exposición prolongada a la lluvia y la humedad.",
    shortDescription:
      "Banca de 100% madera de raulí, ideal para terrazas, patios y espacios exteriores protegidos.",
    image: images.banca4.cover,
    gallery: images.banca4.gallery,
    price: 239990,
    stock: 1,
    sku: "BAN-019",
    material: "100% madera de raulí",
    dimensions: "180 cm de largo",
    weight: "--",
    featured: false,
    active: true,
    tags: ["banca", "rauli", "madera", "exterior", "terraza", "jardin"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-020",
    name: "Tabla de Picar",
    slug: "tabla-picar-maderas-nativas",
    categorySlugs: ["comedor"],
    brand: "VIVAU Artesanos",
    description:
      "Tabla de picar elaborada con una combinación de maderas nativas, que destaca por sus tonalidades y vetas naturales. Su superficie es ideal para apoyar y preparar ingredientes en la cocina, además de aportar un toque cálido y artesanal al espacio. También puede utilizarse para presentar quesos, aperitivos y otros alimentos. Para prolongar su vida útil, se recomienda lavarla a mano y secarla inmediatamente después de su uso.",
    shortDescription:
      "Tabla de picar de maderas nativas, con un diseño artesanal que combina funcionalidad y belleza natural.",
    image: images.tablaPicar1.cover,
    gallery: images.tablaPicar1.gallery,
    price: 29990,
    stock: 1,
    sku: "TP-020",
    material: "Mix de maderas nativas",
    dimensions: "41 × 30 cm",
    weight: "--",
    featured: false,
    active: true,
    tags: ["tabla", "picar", "maderas", "nativas", "cocina", "artesanal"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-021",
    name: "Bandeja de Madera",
    slug: "bandeja-maderas-nativas",
    categorySlugs: ["comedor"],
    brand: "VIVAU Artesanos",
    description:
      "Bandeja de madera confeccionada con una combinación de maderas nativas, que aporta un acabado cálido y natural a la presentación de alimentos y objetos. Ideal para servir desayunos, bebidas, aperitivos o para organizar accesorios y elementos decorativos. Sus vetas y tonalidades convierten cada pieza en un complemento artesanal para la cocina, el comedor o el living.",
    shortDescription:
      "Bandeja de maderas nativas, ideal para servir, organizar y decorar con un estilo natural.",
    image: images.bandeja1.cover,
    gallery: images.bandeja1.gallery,
    price: 39990,
    stock: 1,
    sku: "BM-021",
    material: "Mix de maderas nativas",
    dimensions: "55 × 30 cm",
    weight: "--",
    featured: false,
    active: true,
    tags: ["bandeja", "madera", "maderas nativas", "comedor", "decoracion"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-022",
    name: "Banca de Fierro y Pino Oregón",
    slug: "banca-fierro-pino-oregon",
    categorySlugs: ["exterior"],
    brand: "VIVAU Artesanos",
    description:
      "Banca fabricada en fierro y madera de pino oregón, una combinación que aporta firmeza, calidez y un estilo versátil. Ideal para complementar terrazas, patios, jardines y otros espacios exteriores, ofreciendo un lugar cómodo para descansar o compartir. La mezcla de materiales permite integrarla en ambientes rústicos, industriales o contemporáneos. Se recomienda proteger la madera y las uniones metálicas según las condiciones de exposición.",
    shortDescription:
      "Banca de fierro y pino oregón, ideal para terrazas, patios y espacios exteriores.",
    image: images.banca5.cover,
    gallery: images.banca5.gallery,
    price: 179990,
    stock: 1,
    sku: "BAN-022",
    material: "Fierro y pino oregón",
    dimensions: "160 cm de largo",
    weight: "--",
    featured: false,
    active: true,
    tags: ["banca", "fierro", "pino oregon", "exterior", "terraza", "jardin"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-023",
    name: "Silla de Raulí",
    slug: "silla-rauli",
    categorySlugs: ["comedor"],
    brand: "VIVAU Artesanos",
    description:
      "Silla de madera de raulí diseñada para complementar comedores y otros espacios del hogar con un estilo cálido y natural. La veta característica de esta madera aporta personalidad, mientras que su diseño permite integrarla en ambientes clásicos, rústicos o contemporáneos. Disponible en versión sin tapiz y tapizada, para adaptarse a distintas preferencias y estilos de decoración.",
    shortDescription:
      "Silla de raulí disponible sin tapiz o tapizada, ideal para complementar tu comedor.",
    image: images.sillas.cover,
    gallery: images.sillas.gallery,
    price: 59990,
    stock: 1,
    sku: "SIL-023",
    material: "Madera de raulí",
    dimensions: "--",
    weight: "--",
    featured: false,
    active: true,
    variants: [
      {
        name: "Sin tapiz",
        price: 59990,
        sku: "SIL-023-ST",
        image: images.sillaSinTapiz.cover,
        gallery: images.sillaSinTapiz.gallery,
        stock: 1,
        material: "Madera de raulí, asiento sin tapiz",
        description:
          "Silla de madera de raulí sin tapiz. Su terminación en madera destaca la veta natural y aporta un estilo cálido al comedor.",
      },
      {
        name: "Tapizada",
        price: 69990,
        sku: "SIL-023-T",
        image: images.sillaTapizada.cover,
        gallery: images.sillaTapizada.gallery,
        stock: 1,
        material: "Madera de raulí con asiento tapizado",
        description:
          "Silla de madera de raulí con asiento tapizado, una alternativa para quienes prefieren una superficie acolchada en su comedor.",
      },
    ],
    tags: ["silla", "rauli", "comedor", "madera", "tapizada"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
  {
    id: "p-024",
    name: "Escultura Canina de Fierro",
    slug: "escultura-canina-fierro",
    categorySlugs: ["sala", "recamara", "oficina"],
    brand: "VIVAU Artesanos",
    description:
      "Escultura canina elaborada íntegramente en fierro, ideal para quienes buscan incorporar una pieza decorativa original y con carácter. Su diseño inspirado en la figura de un perro aporta personalidad a livings, dormitorios, oficinas, recibidores y espacios de exhibición. Una alternativa decorativa que combina el aspecto robusto del metal con una estética distintiva, perfecta para complementar diferentes estilos de interiorismo.",
    shortDescription:
      "Escultura canina 100% de fierro, una pieza decorativa original para tus espacios.",
    image: images.estante1.cover,
    gallery: images.estante1.gallery,
    price: 31990,
    stock: 0,
    sku: "EC-024",
    material: "100% fierro",
    dimensions: "--",
    weight: "--",
    featured: false,
    active: true,
    tags: ["escultura", "canina", "perro", "fierro", "decoracion", "arte"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },

  {
    id: "p-025",
    name: "Base de Cama 2 Plazas de Raulí y Álamo",
    slug: "base-cama-2-plazas-rauli-alamo",
    categorySlugs: ["recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Base de cama de dos plazas fabricada con una combinación de madera de raulí y álamo, diseñada para aportar soporte, resistencia y calidez al dormitorio. Su estructura de madera destaca por su acabado natural y su diseño versátil, ideal para complementar diferentes estilos de decoración. Una pieza funcional que combina la belleza de las maderas con la practicidad necesaria para el descanso diario. El producto corresponde únicamente a la base de cama; no incluye colchón ni otros accesorios.",
    shortDescription:
      "Base de cama de dos plazas fabricada en madera de raulí y álamo. Diseño resistente y natural. No incluye colchón.",
    image: images.estante1.cover,
    gallery: images.estante1.gallery,
    price: 149990,
    stock: 1,
    sku: "BC-025-2P",
    material: "Madera de raulí y álamo",
    dimensions: "2 plazas (medidas exactas por confirmar)",
    weight: "--",
    featured: false,
    active: true,
    tags: ["base de cama", "rauli", "alamo", "dormitorio", "dos plazas"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-20",
  },
  {
    id: "p-026",
    name: "Base de Cama King de Raulí y Álamo",
    slug: "base-cama-king-rauli-alamo",
    categorySlugs: ["recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Base de cama tamaño king fabricada con una combinación de madera de raulí y álamo, diseñada para ofrecer una estructura amplia y resistente que complementa el dormitorio con elegancia y calidez. Su acabado natural resalta la belleza de la madera, aportando un estilo acogedor y versátil que se adapta a distintos ambientes. Ideal para quienes buscan una base de cama de mayor tamaño, con un diseño funcional y materiales de origen natural. El producto corresponde únicamente a la base de cama; no incluye colchón ni otros accesorios.",
    shortDescription:
      "Base de cama king fabricada en madera de raulí y álamo. Amplia, resistente y de estilo natural. No incluye colchón.",
    image: images.estante1.cover,
    gallery: images.estante1.gallery,
    price: 159990,
    stock: 1,
    sku: "BC-026-K",
    material: "Madera de raulí y álamo",
    dimensions: "King (medidas exactas por confirmar)",
    weight: "--",
    featured: false,
    active: true,
    tags: ["base de cama", "rauli", "alamo", "dormitorio", "king"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-20",
  },
  {
    id: "p-027",
    name: "Velador de Raulí",
    slug: "velador-madera-rauli",
    categorySlugs: ["recamara"],
    brand: "VIVAU Artesanos",
    description:
      "Velador fabricado en madera de raulí, ideal para complementar el dormitorio con un mueble funcional y de apariencia natural. Su superficie permite mantener al alcance objetos de uso cotidiano, como una lámpara, libros o accesorios personales. La veta y las tonalidades características de la madera aportan calidez al ambiente, convirtiendo este velador en una pieza práctica y decorativa para acompañar la cama.",
    shortDescription:
      "Velador de madera de raulí, ideal para complementar tu dormitorio con calidez y funcionalidad.",
    image: images.estante1.cover,
    gallery: images.estante1.gallery,
    price: 144990,
    stock: 0,
    sku: "VEL-027",
    material: "Madera de raulí",
    dimensions: "70 x 44 x 40 cm",
    weight: "--",
    featured: false,
    active: true,
    tags: ["velador", "rauli", "madera", "dormitorio", "recamara", "mueble"],
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
  },
];

export const formatCL = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

export const discountPct = (p: Product) =>
  p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
