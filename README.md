# Muebles VIVAU

Vivau es una vitrina digital de muebles artesanales para el hogar y espacios de trabajo en Chile. Presenta piezas elaboradas con maderas nobles y hierro, permite explorar sus características y facilita la atención personalizada para cotizar productos y coordinar su entrega.

El flujo comercial actual consiste en **explorar el catálogo, agregar productos al carrito y enviar una solicitud de cotización por correo**. El retiro, despacho y pago se coordinan con el negocio. También existe un acceso de contacto por WhatsApp.

## Contenido

- [Qué ofrece Vivau](#qué-ofrece-vivau)
- [Estado actual](#estado-actual)
- [Tecnologías](#tecnologías)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Comandos disponibles](#comandos-disponibles)
- [Rutas](#rutas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Catálogo e imágenes](#catálogo-e-imágenes)
- [Estado y persistencia](#estado-y-persistencia)
- [Contacto y cotizaciones](#contacto-y-cotizaciones)
- [Compilación y despliegue](#compilación-y-despliegue)
- [Verificación manual](#verificación-manual)
- [Limitaciones y próximos pasos](#limitaciones-y-próximos-pasos)
- [Colaboración](#colaboración)
- [Contacto del negocio](#contacto-del-negocio)

## Qué ofrece Vivau

### Experiencia de catálogo

- Página de inicio con presentación de la marca, categorías, productos destacados y beneficios.
- Organización por espacios: **Sala, Comedor, Recámara, Oficina y Exterior**.
- Catálogo con búsqueda, filtros por categoría, precio y ofertas, y paginación.
- Fichas de producto con imágenes, galería, ampliación, descripción, precio, disponibilidad y características técnicas.
- Precios expresados en pesos chilenos (**CLP**), con formato `es-CL`.
- Diseño adaptable a celulares, tablets y computadores.

### Cotización y atención

- Carrito con selección de cantidades, eliminación de productos y cálculo de totales.
- Control de cantidades según el stock local del producto.
- Solicitud de cotización con nombres de productos, SKU, cantidades y subtotales.
- Formulario de contacto conectado a un endpoint de servidor que utiliza Resend.
- Widget de WhatsApp con preguntas frecuentes y enlaces de conversación.
- Retiro o envío a coordinar con el comprador.

## Estado actual

El repositorio contiene una tienda orientada a cotizaciones, junto con componentes de una futura experiencia de compra y administración.

| Área | Estado en el código |
| --- | --- |
| Inicio, catálogo y fichas | Implementados |
| Carrito y solicitud de cotización | Implementados; el envío de correo depende de la configuración de Resend |
| Contacto por WhatsApp | Implementado mediante enlaces externos |
| Persistencia | Local en el navegador mediante Zustand y `localStorage` |
| Checkout | Deshabilitado mediante redirección a `/` |
| Confirmación | Pantalla existente, sin integración real de pedidos |
| Administración | Componentes de dashboard, productos e inventario existentes, pero sin acceso operativo habilitado |
| Base de datos, autenticación y pagos en línea | Sin implementación en el repositorio |

Las pantallas de checkout y confirmación no representan un sistema de cobros, registro de pedidos ni envío automático de confirmaciones.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| React 19 y TypeScript | Interfaz y modelos de datos |
| TanStack Start | Aplicación con renderizado de servidor y handlers HTTP |
| TanStack Router | Navegación y rutas basadas en archivos |
| Vite 8 | Desarrollo y compilación |
| Tailwind CSS 4 | Estilos y diseño adaptable |
| Componentes estilo shadcn/ui y Radix UI | Elementos reutilizables de interfaz |
| Zustand | Estado del carrito y los productos con persistencia local |
| Resend | Envío de mensajes desde el servidor |
| Lucide React y React Icons | Iconografía |
| Sonner | Notificaciones |
| Nitro y configuración de Lovable | Integración de compilación y servidor |
| ESLint y Prettier | Revisión y formato del código |

Las dependencias y los scripts exactos están definidos en [package.json](./package.json).

## Instalación y ejecución

### Requisitos

- Node.js compatible con Vite 8; como referencia de entorno, utilizar Node.js 22.12 o posterior de la rama 22.
- npm, incluido con Node.js.
- Una clave de Resend para utilizar el envío de correo.

El repositorio incluye `package-lock.json` y `bun.lock`. Las instrucciones siguientes utilizan npm de forma consistente.

### Preparar el proyecto

Desde la carpeta del repositorio:

```bash
npm ci
```

Crear un archivo `.env` en la raíz y configurar las variables indicadas en la siguiente sección. Si ya existe, conservar sus valores y completar solamente lo necesario.

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir la dirección que muestre Vite en la terminal. El host y puerto pueden variar según el entorno y la configuración de Lovable.

## Variables de entorno

```dotenv
RESEND_API_KEY=reemplazar_por_tu_clave_de_resend
```

| Variable | Uso | Dónde se lee |
| --- | --- | --- |
| `RESEND_API_KEY` | Autenticación para enviar correos de contacto | `src/routes/api.contact.ts`, mediante `process.env` |

La clave debe estar disponible en el entorno del servidor que ejecuta `/api/contact`. Mantenerla fuera del código y de las variables con prefijo `VITE_`, que están destinadas al cliente. Los archivos `.env` están excluidos por `.gitignore`.

El destinatario y el remitente del correo están escritos directamente en `src/routes/api.contact.ts`; actualmente no cuentan con variables de entorno propias.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Genera la compilación de producción |
| `npm run build:dev` | Compila utilizando el modo `development` |
| `npm run preview` | Inicia la vista previa mediante Vite |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |
| `npm run format` | Aplica Prettier; modifica los archivos correspondientes |

`npm test` ejecuta las pruebas de variantes, carrito, stock y migración de datos persistidos.

## Rutas

| URL | Propósito |
| --- | --- |
| `/` | Inicio y presentación de la marca |
| `/catalogo` | Catálogo y filtros |
| `/producto/$slug` | Ficha de producto; `$slug` se reemplaza por su identificador legible |
| `/carrito` | Productos seleccionados y resumen para cotizar |
| `/contactoemail` | Formulario de contacto y envío de cotización |
| `/api/contact` | Endpoint `POST` para enviar el mensaje por correo |
| `/checkout` | Ruta existente que redirige al inicio |
| `/confirmacion` | Pantalla de confirmación del flujo de compra de demostración |
| `/admin` | Ruta administrativa deshabilitada; contiene una referencia pendiente a `redirect` |
| `/admin/productos` | Ruta de gestión de productos deshabilitada; contiene una referencia pendiente a `redirect` |
| `/admin/inventario` | Código de inventario bajo el layout administrativo deshabilitado |

Las rutas públicas comparten el layout `_site`. Este nombre es organizativo y no aparece en la URL. Consultar [las convenciones de rutas](./src/routes/README.md) antes de agregar páginas. `src/routeTree.gen.ts` se genera automáticamente y no debe editarse a mano.

## Estructura del proyecto

```text
Vivau/
├── public/                  # Archivos públicos
├── src/
│   ├── assets/              # Fotografías de muebles, categorías y portada
│   ├── components/
│   │   ├── site/            # Header, Footer, layout y tarjetas de producto
│   │   └── ui/              # Componentes reutilizables de interfaz
│   ├── extras/              # Widget de WhatsApp y popup
│   ├── hooks/               # Hooks compartidos
│   ├── lib/
│   │   ├── images.ts        # Registro de portadas y galerías
│   │   ├── mock-data.ts     # Tipos, categorías, productos y precios
│   │   ├── store.ts         # Stores persistidos de carrito y productos
│   │   └── utils.ts         # Utilidades compartidas
│   ├── routes/              # Páginas, layouts y endpoint de contacto
│   ├── router.tsx           # Configuración del router
│   ├── routeTree.gen.ts     # Árbol de rutas generado
│   ├── server.ts            # Entrada de servidor y manejo de errores SSR
│   ├── start.ts             # Middleware de servidor
│   └── styles.css           # Estilos globales y tema
├── AGENTS.md                # Instrucciones de colaboración y Lovable
├── package.json             # Dependencias y comandos
└── vite.config.ts           # Configuración integrada de Vite/TanStack/Lovable
```

## Catálogo e imágenes

### Datos de los productos

[src/lib/mock-data.ts](./src/lib/mock-data.ts) define los tipos `Category` y `Product`, las categorías y el catálogo inicial. Aunque el archivo conserva el nombre `mock-data`, estos datos alimentan la vitrina actual.

Cada producto incluye:

- Identidad: `id`, `name`, `slug`, `sku` y `brand`.
- Clasificación: `categorySlugs` y `tags`.
- Contenido: `description`, `shortDescription`, `image` y `gallery`.
- Precio y disponibilidad: `price`, `salePrice` opcional y `stock`.
- Características: `material`, `dimensions` y `weight`.
- Publicación: `featured`, `active`, `createdAt` y `updatedAt`.

`effectivePrice` utiliza `salePrice` cuando está definido; de lo contrario, utiliza `price`. `formatCL` da formato a los importes en CLP y `discountPct` calcula el porcentaje de descuento.

### Variantes de un producto

Un producto puede incluir un arreglo `variants` en `src/lib/mock-data.ts`. Cada variante requiere `name`, `sku` único y `price`, y puede definir `stock`, `salePrice`, `description`, `shortDescription`, `material`, `dimensions`, `weight`, `image` y `gallery`.

La ficha muestra un selector que actualiza los detalles según la opción elegida. Los campos no definidos heredan los datos generales del producto, salvo `salePrice`, que es específico de cada variante. El carrito y la cotización distinguen las variantes por su SKU. El catálogo muestra el precio menor con el prefijo «Desde».

Por ejemplo, la Silla de Raulí incluye «Sin tapiz» ($59.990) y «Tapizada» ($69.990). Ambas mantienen stock cero hasta configurar su disponibilidad real. Las fotografías específicas se pueden registrar en `images.ts` y asignar a cada variante; mientras no se definan, se utilizan las imágenes generales.

Los stores incluyen una migración de los datos anteriores para incorporar las variantes sin borrar el carrito ni las ediciones locales del catálogo.

### Agregar o actualizar un mueble

1. Guardar sus fotografías en una carpeta descriptiva dentro de `src/assets/`.
2. Importarlas en [src/lib/images.ts](./src/lib/images.ts).
3. Registrar una entrada con `cover` y `gallery` en el objeto `images`.
4. Agregar o actualizar el producto en `src/lib/mock-data.ts`, usando la portada y galería registradas.
5. Asignar un `id`, `slug` y `sku` únicos, categorías válidas, precio, stock y características.
6. Comprobar la ficha, el catálogo y el carrito.

Ejemplo de registro de imágenes:

```ts
import portada from "../assets/nuevo-mueble/1.jpg";
import detalle from "../assets/nuevo-mueble/2.jpg";

// Entrada dentro del objeto exportado `images`:
// nuevoMueble: {
//   cover: portada,
//   gallery: [portada, detalle],
// },
```

Si el navegador ya tiene productos persistidos, una modificación al catálogo inicial puede no aparecer automáticamente. Consultar la siguiente sección.

## Estado y persistencia

[src/lib/store.ts](./src/lib/store.ts) contiene dos stores de Zustand con el middleware `persist`:

| Clave de `localStorage` | Contenido |
| --- | --- |
| `vivau-cart` | Identificadores y cantidades del carrito |
| `vivau-products` | Catálogo de productos del navegador |

Los datos son propios de cada navegador y origen. No se sincronizan entre dispositivos ni constituyen inventario compartido. Agregar un producto al carrito no reserva ni descuenta stock en un servidor.

Para volver al catálogo inicial durante el desarrollo, eliminar únicamente `vivau-products` desde las herramientas del navegador y recargar. Esto descarta las modificaciones locales de productos. Para reiniciar también el carrito, eliminar `vivau-cart`.

## Contacto y cotizaciones

### Flujo actual

1. El visitante agrega muebles al carrito.
2. Al pulsar **Solicitar cotización**, el sitio genera un mensaje con productos, SKU, cantidades, subtotales y total estimado.
3. El navegador abre `/contactoemail` con el mensaje en el parámetro `message`.
4. El visitante completa el formulario y envía nombre, correo y mensaje a `/api/contact`.
5. El servidor utiliza Resend para remitir el contenido al negocio.

El total mostrado es una estimación. El código conserva una regla de envío de $899 para subtotales positivos de hasta $15.000 y cero por encima de ese monto; la interfaz plantea coordinar el despacho. Esta regla debe revisarse para que represente las condiciones comerciales definitivas.

### Endpoint de contacto

```http
POST /api/contact
Content-Type: application/json
```

```json
{
  "name": "Nombre del cliente",
  "email": "cliente@example.com",
  "message": "Hola, quisiera cotizar una mesa de centro."
}
```

Actualmente se utiliza el remitente `Contacto <onboarding@resend.dev>` y el destinatario `contactovivau@gmail.com`. Para operar con un remitente propio, configurar el dominio y remitente correspondientes en Resend y actualizar el handler.

El handler devuelve HTTP 200 con `{ "ok": true, "data": ... }` cuando termina la llamada al SDK, y HTTP 500 si se lanza una excepción. Todavía debe comprobar explícitamente los errores que Resend devuelve en su resultado; una respuesta 200 del endpoint no garantiza por sí sola la entrega del correo.

### WhatsApp

El número y las preguntas frecuentes se configuran en [src/extras/WhatsAppWidget.tsx](./src/extras/WhatsAppWidget.tsx). El widget genera enlaces `wa.me` con mensajes preparados; no utiliza una API de mensajería ni envía mensajes automáticamente.

## Compilación y despliegue

```bash
npm run build
npm run preview
```

La configuración utiliza `@lovable.dev/vite-tanstack-config`, que integra los plugins de TanStack Start, React, Tailwind, alias y Nitro. Según los comentarios de `vite.config.ts`, el destino predeterminado de Nitro es Cloudflare. Revisar el destino efectivo y los artefactos generados al preparar el entorno de publicación.

El despliegue debe ejecutar las funciones de servidor de TanStack Start y exponer `RESEND_API_KEY` al proceso correspondiente. Publicar únicamente archivos estáticos no habilita `/api/contact`.

El proyecto está conectado a **Lovable**. Los commits enviados a la rama conectada se sincronizan con su editor. Mantener la rama en un estado funcional y respetar las instrucciones de [AGENTS.md](./AGENTS.md).

## Verificación manual

Para revisar cambios funcionales:

1. Abrir el inicio y navegar por las categorías en escritorio y celular.
2. Buscar productos y combinar filtros de categoría, precio y ofertas.
3. Abrir una ficha y comprobar fotos, ampliación, descripción y precio.
4. Agregar productos al carrito, cambiar cantidades y comprobar los límites de stock.
5. Recargar y verificar que el carrito se conserve.
6. Solicitar una cotización y revisar el contenido precargado del formulario.
7. Con Resend configurado, enviar un mensaje de prueba y comprobar la recepción real.
8. Abrir el contacto de WhatsApp y verificar el número y mensaje.

Usar `npm run lint` para revisar código. La compilación y el lint deben validarse antes de publicar; la existencia de estos comandos no implica que el estado actual los supere.

## Limitaciones y próximos pasos

- **Persistencia compartida:** incorporar una base de datos y operaciones de servidor para productos, inventario y cotizaciones.
- **Administración:** corregir las referencias a `redirect` sin importar en `admin.tsx` y `admin.productos.tsx`, restaurar los componentes de ruta cuando corresponda e incorporar autenticación y autorización antes de habilitar la gestión.
- **Modelo de categorías:** unificar referencias antiguas a `categorySlug` con el campo actual `categorySlugs`, presentes en código administrativo y productos relacionados.
- **Correo:** validar los datos en servidor, escapar el contenido insertado en HTML, controlar abuso y tratar los errores devueltos por Resend.
- **Checkout:** integrar creación y persistencia de pedidos, pagos, inventario y notificaciones antes de habilitarlo. El código de demostración genera un identificador aleatorio y vacía el carrito, sin procesar pagos; también conserva textos y valores por defecto que deben adaptarse a Chile.
- **Despacho:** sustituir la estimación fija por condiciones comerciales acordadas con el negocio.
- **Contenido:** completar los enlaces de redes sociales que actualmente apuntan a `#`.
- **Calidad:** incorporar pruebas de los flujos principales y revisar accesibilidad, rendimiento y metadatos antes de ampliar la operación.

## Colaboración

- Seguir las instrucciones de `AGENTS.md`.
- Mantener las convenciones de rutas de TanStack Start y reutilizar los componentes existentes.
- No duplicar los plugins que ya incluye la configuración de Lovable.
- No subir claves de API ni archivos de entorno.
- Revisar los cambios antes de aplicar formato a todo el repositorio.
- **No reescribir historial Git publicado:** evitar force push, rebase, amend o squash de commits ya enviados, para conservar el historial sincronizado con Lovable.

## Contacto del negocio

Datos publicados actualmente en el sitio:

- **Marca:** Muebles VIVAU.
- **Zona:** San Fernando, Pelequén y San Vicente, Chile.
- **Teléfono / WhatsApp:** +56 9 8711 1409.
- **Correo:** contactovivau@gmail.com.

El repositorio no incluye un archivo de licencia de software. La información comercial y los recursos de marca corresponden al proyecto Vivau.
