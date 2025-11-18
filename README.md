# 🏠 MillionFront - Frontend de Gestión de Propiedades

> **Prueba Técnica** - Aplicación web moderna desarrollada en React + TypeScript + Vite para la visualización y búsqueda de propiedades inmobiliarias. Interfaz de usuario responsiva, optimizada para rendimiento y accesibilidad, con arquitectura limpia y escalable.
>
> **Desarrollado por:** Juan Fernando Álvarez Gallego

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes](#-componentes)
- [Hooks Personalizados](#-hooks-personalizados)
- [Servicios y API](#-servicios-y-api)
- [Optimizaciones de Rendimiento](#-optimizaciones-de-rendimiento)
- [Accesibilidad (A11y)](#-accesibilidad-a11y)
- [Scripts Disponibles](#-scripts-disponibles)
- [Build y Despliegue](#-build-y-despliegue)
- [Documentación Visual](#-documentación-visual)

## ✨ Características

- ✅ **Arquitectura Limpia**: Código organizado y escalable siguiendo principios SOLID
- ✅ **Búsqueda Avanzada**: Filtros por nombre, dirección y rango de precios
- ✅ **Paginación Completa**: Navegación fluida con control de tamaño de página
- ✅ **Vista de Detalles**: Modal con información completa de propiedades, propietarios e historial
- ✅ **Optimización de Imágenes**: Lazy loading, preload de LCP, y manejo de errores
- ✅ **Responsive Design**: Diseño adaptativo para móviles, tablets y desktop
- ✅ **Accesibilidad**: Cumple con estándares WCAG con soporte para lectores de pantalla
- ✅ **Performance**: Optimizaciones de Lighthouse (code splitting, minificación, tree-shaking)
- ✅ **TypeScript**: Tipado fuerte para mayor seguridad y mantenibilidad
- ✅ **React Query**: Gestión eficiente de estado del servidor y caché

## 🛠 Tecnologías

### Core
- **React 18.3.1**: Biblioteca de UI
- **TypeScript 5.8.3**: Tipado estático
- **Vite 7.2.2**: Build tool y dev server ultra rápido

### UI y Estilos
- **Tailwind CSS 3.4.17**: Framework de utilidades CSS
- **shadcn/ui**: Componentes UI accesibles basados en Radix UI
- **Radix UI**: Componentes primitivos accesibles
- **Lucide React**: Iconos modernos y ligeros

### Estado y Datos
- **@tanstack/react-query 5.83.0**: Gestión de estado del servidor
- **React Router 6.30.1**: Enrutamiento del lado del cliente

### Herramientas de Desarrollo
- **ESLint**: Linter para código JavaScript/TypeScript
- **TypeScript ESLint**: Reglas específicas de TypeScript
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Prefijos CSS automáticos

## 📦 Requisitos

- **Node.js 18+** y **npm** (o yarn/pnpm)
- **Backend API** ejecutándose (ver [README del backend](../millionback/README.md))

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd millionfront
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_BASE_URL=http://localhost:5158
   ```
   
   > **Nota**: Ajusta la URL según tu configuración del backend.

4. **Ejecutar la aplicación en desarrollo**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   Abrir el navegador en: `http://localhost:8080` (o el puerto configurado)

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo | Requerido |
|----------|-------------|---------|-----------|
| `VITE_API_BASE_URL` | URL base del backend API | `http://localhost:5158` | No (default: `http://localhost:5000`) |

### Puertos

Por defecto, la aplicación se ejecuta en:
- **Desarrollo**: `http://localhost:8080`
- **Preview**: `http://localhost:4173`

Para cambiar los puertos, editar `vite.config.ts`:
```typescript
server: {
  port: 8080, // Cambiar aquí
}
```

## 📖 Uso

### Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación se recargará automáticamente cuando cambies archivos.

### Compilar para Producción

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados.

### Vista Previa de Producción

```bash
npm run preview
```

Sirve la build de producción localmente para probar antes de desplegar.

### Linting

```bash
npm run lint
```

Verifica el código con ESLint.

## 🏗 Arquitectura

El proyecto sigue los principios de **Clean Architecture** y **Component-Driven Development**:

```
millionfront/
├── src/
│   ├── components/          # Componentes React
│   │   ├── common/          # Componentes reutilizables genéricos
│   │   ├── layout/          # Componentes de layout (Header, Footer)
│   │   ├── pagination/      # Componentes de paginación
│   │   ├── properties/      # Componentes específicos de propiedades
│   │   └── ui/              # Componentes UI de shadcn/ui
│   ├── constants/           # Constantes de la aplicación
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Páginas/views principales
│   ├── services/            # Servicios de API
│   ├── types/               # Definiciones de tipos TypeScript
│   ├── utils/               # Funciones utilitarias
│   ├── lib/                 # Librerías y configuraciones
│   └── integrations/       # Integraciones externas (Supabase, etc.)
├── public/                  # Archivos estáticos
├── dist/                    # Build de producción (generado)
├── index.html               # HTML principal
├── vite.config.ts           # Configuración de Vite
├── tailwind.config.ts       # Configuración de Tailwind
└── package.json             # Dependencias y scripts
```

### Principios de Diseño

1. **Separación de Responsabilidades**: Cada componente tiene una responsabilidad única
2. **Composición sobre Herencia**: Componentes pequeños y composables
3. **Reutilización**: Componentes comunes en `common/` y `ui/`
4. **Tipado Fuerte**: TypeScript en todo el código
5. **Performance First**: Lazy loading, code splitting, optimizaciones de imágenes

## 📁 Estructura del Proyecto

### `/src/components`

#### `common/`
Componentes reutilizables genéricos:
- `EmptyState.tsx`: Estado vacío cuando no hay resultados
- `ErrorState.tsx`: Manejo de errores visual
- `ImagePlaceholder.tsx`: Placeholder para imágenes faltantes
- `InfoCard.tsx`: Tarjeta de información con icono
- `InfoSection.tsx`: Sección de información con título

#### `layout/`
Componentes de estructura:
- `PageHeader.tsx`: Encabezado de página con título y descripción
- `PageFooter.tsx`: Pie de página

#### `pagination/`
Sistema de paginación:
- `Pagination.tsx`: Componente principal de paginación
- `PaginationControls.tsx`: Controles de navegación (anterior/siguiente)
- `PageJumpInput.tsx`: Input para saltar a una página específica
- `PageSizeSelector.tsx`: Selector de tamaño de página

#### `properties/`
Componentes específicos de propiedades:
- `PropertyCard.tsx`: Tarjeta de propiedad en el grid
- `PropertyDetail.tsx`: Modal de detalles de propiedad
- `PropertyFilters.tsx`: Formulario de filtros de búsqueda
- `PropertiesGrid.tsx`: Grid responsivo de propiedades
- `PropertiesHeader.tsx`: Encabezado con contador de resultados
- `PropertyImageCarousel.tsx`: Carrusel de imágenes
- `PropertyImagePreview.tsx`: Vista previa fullscreen de imágenes
- `PropertyInfoSection.tsx`: Sección de información de ubicación
- `PropertyOwnerSection.tsx`: Sección de información del propietario
- `PropertyDetailsSection.tsx`: Sección de detalles (código, año)
- `PropertyTracesSection.tsx`: Historial de transacciones

### `/src/hooks`

Hooks personalizados para lógica reutilizable:

- `usePagination.ts`: Gestión de estado de paginación
- `usePropertyFilters.ts`: Gestión de filtros de búsqueda
- `usePropertyImages.ts`: Gestión de carrusel de imágenes
- `useLCPImagePreload.ts`: Preload de imagen LCP para performance
- `use-mobile.tsx`: Detección de dispositivos móviles
- `use-toast.ts`: Sistema de notificaciones toast

### `/src/services`

Servicios de API:

- `apiClient.ts`: Cliente HTTP genérico con manejo de errores
- `properties.ts`: Servicio específico de propiedades

### `/src/utils`

Funciones utilitarias:

- `formatters.ts`: Formateo de números (moneda) y fechas
- `imageUtils.ts`: Utilidades para validación y manejo de imágenes
- `imageOptimization.ts`: Funciones de optimización de imágenes
- `stringUtils.ts`: Utilidades de strings (iniciales, etc.)

### `/src/types`

Definiciones de tipos TypeScript:

- `property.ts`: Tipos relacionados con propiedades
- `api.ts`: Tipos de respuestas de API

### `/src/constants`

Constantes de la aplicación:

- `properties.ts`: Constantes relacionadas con propiedades (tamaños de página, etc.)

## 🧩 Componentes

### PropertyCard

Tarjeta individual de propiedad en el grid.

**Props:**
```typescript
interface PropertyCardProps {
  property: PropertySummary;
  onClick: () => void;
  disabled?: boolean;
  isLCP?: boolean; // Para optimización de primera imagen
}
```

**Características:**
- Lazy loading de imágenes
- Placeholder cuando no hay imagen
- Optimización LCP para primera imagen
- Accesibilidad completa (ARIA, teclado)

### PropertyDetail

Modal de detalles completos de una propiedad.

**Props:**
```typescript
interface PropertyDetailProps {
  property: PropertyDetail | null;
  open: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
}
```

**Características:**
- Lazy loading del componente
- Carrusel de imágenes con thumbnails
- Vista previa fullscreen
- Información completa: ubicación, propietario, detalles, historial
- Manejo de scroll del body
- Soporte para back/forward cache

### PropertyFilters

Formulario de filtros de búsqueda.

**Props:**
```typescript
interface PropertyFiltersProps {
  value: PropertyFilters;
  onFilter: (filters: PropertyFilters) => void;
  onReset: () => void;
  disabled?: boolean;
}
```

**Filtros disponibles:**
- Nombre de propiedad
- Dirección
- Precio mínimo
- Precio máximo

### Pagination

Sistema completo de paginación.

**Props:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  disabled?: boolean;
}
```

**Características:**
- Navegación anterior/siguiente
- Salto a página específica
- Selector de tamaño de página
- Indicadores de página actual
- Accesibilidad completa

## 🎣 Hooks Personalizados

### usePagination

Gestiona el estado de paginación.

```typescript
const {
  page,
  pageSize,
  handlePageChange,
  handlePageSizeChange,
  setPage,
  setPageSize,
} = usePagination({
  initialPage: 1,
  initialPageSize: 12,
  totalPages: 10,
});
```

### usePropertyFilters

Gestiona los filtros de búsqueda.

```typescript
const {
  filters,
  updateFilters,
  resetFilters,
  setFilters,
} = usePropertyFilters({
  name: "",
  address: "",
  minPrice: undefined,
  maxPrice: undefined,
});
```

### usePropertyImages

Gestiona el estado del carrusel de imágenes.

```typescript
const {
  validImages,
  hasValidImage,
  activeImage,
  activeImageIndex,
  showPlaceholder,
  goToPrevImage,
  goToNextImage,
  goToImage,
  handleImageError,
} = usePropertyImages({
  images: property?.images,
  singleImage: property?.image,
});
```

### useLCPImagePreload

Precarga la imagen LCP (Largest Contentful Paint) para mejorar el rendimiento.

```typescript
useLCPImagePreload(imageUrl);
```

## 🔌 Servicios y API

### apiClient

Cliente HTTP genérico con manejo de errores centralizado.

```typescript
// GET request
const data = await apiClient.get<PropertyListData>("/api/properties", {
  page: 1,
  pageSize: 20,
});
```

**Características:**
- Construcción automática de URLs
- Manejo de parámetros de query
- Parsing de respuestas de API
- Manejo centralizado de errores

### propertiesService

Servicio específico para propiedades.

```typescript
// Obtener lista de propiedades
const data = await propertiesService.getProperties(filters, page, pageSize);

// Obtener detalle de propiedad
const detail = await propertiesService.getPropertyById(id);
```

**Endpoints utilizados:**
- `GET /api/properties`: Lista paginada
- `GET /api/properties/search`: Búsqueda con filtros
- `GET /api/properties/{id}`: Detalle de propiedad

## ⚡ Optimizaciones de Rendimiento

### Build Optimizations

#### Code Splitting
Chunks separados para mejor caching:
- `react-core`: React y React DOM
- `react-router`: React Router
- `query-vendor`: React Query
- `ui-vendor`: Radix UI components
- `icons-vendor`: Lucide React icons
- `vendor`: Otras dependencias

#### Minificación
- **esbuild**: Minificación ultra rápida
- Eliminación de `console` y `debugger` en producción
- Minificación de CSS
- Tree-shaking agresivo

#### Target Browsers
Soporte para navegadores modernos:
- ES2020+
- Edge 88+
- Firefox 78+
- Chrome 87+
- Safari 14+

### Runtime Optimizations

#### Lazy Loading
- `PropertyDetail` se carga solo cuando se necesita
- Imágenes con `loading="lazy"` (excepto LCP)

#### Image Optimization
- **LCP Preload**: Primera imagen precargada con `<link rel="preload">`
- **Lazy Loading**: Resto de imágenes con `loading="lazy"`
- **Decoding**: `async` para imágenes lazy, `sync` para LCP
- **Fetch Priority**: `high` para LCP, `low` para otras
- **Sizes Attribute**: Optimización responsiva
- **Error Handling**: Placeholder cuando falla la carga

#### React Query
- **Caché inteligente**: Datos cacheados automáticamente
- **Placeholder Data**: `keepPreviousData` para transiciones suaves
- **Refetching**: Solo cuando es necesario
- **Stale Time**: Configuración optimizada

#### Back/Forward Cache (bfcache)
- Manejo de eventos `pagehide` y `pageshow`
- Restauración correcta del estado del modal
- HMR deshabilitado en producción

### Métricas de Performance

| Métrica | Valor Objetivo | Estado |
|---------|---------------|--------|
| First Contentful Paint (FCP) | < 1.8s | ✅ Optimizado |
| Largest Contentful Paint (LCP) | < 2.5s | ✅ Optimizado |
| Time to Interactive (TTI) | < 3.8s | ✅ Optimizado |
| Cumulative Layout Shift (CLS) | < 0.1 | ✅ Optimizado |
| Total Blocking Time (TBT) | < 200ms | ✅ Optimizado |

## ♿ Accesibilidad (A11y)

### ARIA Labels
- Todos los botones tienen `aria-label` descriptivos
- Iconos decorativos con `aria-hidden="true"`
- Diálogos con `DialogTitle` y `DialogDescription`

### Navegación por Teclado
- Soporte completo de `Tab`, `Enter`, `Space`
- Focus visible en todos los elementos interactivos
- Navegación lógica del DOM

### Lectores de Pantalla
- Textos alternativos en todas las imágenes
- Títulos y descripciones en diálogos
- Estados de carga anunciados
- Mensajes de error accesibles

### Contraste
- Colores con contraste WCAG AA mínimo
- Variables CSS ajustadas para accesibilidad

### Ejemplos de Implementación

```typescript
// Botón accesible
<button
  aria-label="Ver detalles de propiedad"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Ver detalles
</button>

// Diálogo accesible
<Dialog>
  <DialogTitle className="sr-only">
    Detalles de {property.name}
  </DialogTitle>
  <DialogDescription className="sr-only">
    Información completa de la propiedad
  </DialogDescription>
  {/* Contenido */}
</Dialog>
```

## 🛠 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run build:dev` | Compila en modo desarrollo |
| `npm run preview` | Sirve la build de producción localmente |
| `npm run lint` | Ejecuta ESLint |
| `npm run build:analyze` | Build y preview para análisis |

## 📦 Build y Despliegue

### Build de Producción

```bash
npm run build
```

Esto genera:
- `dist/`: Carpeta con archivos optimizados
- Chunks separados para mejor caching
- Archivos minificados y optimizados
- Source maps solo en desarrollo

### Estructura del Build

```
dist/
├── assets/
│   ├── js/
│   │   ├── index-[hash].js          # Código principal
│   │   ├── PropertyDetail-[hash].js  # Chunk lazy-loaded
│   │   ├── react-core-[hash].js      # React
│   │   ├── react-router-[hash].js    # React Router
│   │   ├── query-vendor-[hash].js    # React Query
│   │   ├── ui-vendor-[hash].js       # Radix UI
│   │   ├── icons-vendor-[hash].js    # Lucide Icons
│   │   └── vendor-[hash].js          # Otras dependencias
│   └── css/
│       └── index-[hash].css         # Estilos
└── index.html                        # HTML principal
```

### Despliegue

La aplicación puede desplegarse en cualquier servidor estático:

- **Vercel**: Despliegue automático desde Git
- **Netlify**: Drag & drop de la carpeta `dist/`
- **GitHub Pages**: Subir `dist/` a la rama `gh-pages`
- **AWS S3 + CloudFront**: Subir `dist/` a S3
- **Nginx/Apache**: Servir `dist/` como archivos estáticos

### Variables de Entorno en Producción

Asegúrate de configurar `VITE_API_BASE_URL` en tu plataforma de despliegue:

**Vercel:**
```bash
vercel env add VITE_API_BASE_URL
```

**Netlify:**
```bash
netlify env:set VITE_API_BASE_URL https://api.example.com
```

## 📚 Documentación Visual

La aplicación incluye una **página de documentación visual** accesible desde:

**Ruta:** `/docs`

Esta página incluye:
- Documentación interactiva de todos los componentes
- Ejemplos de uso en vivo
- Guías de implementación
- Mejores prácticas
- Referencias de API

Para acceder, navega a: `http://localhost:8080/docs` (en desarrollo)

## 🎨 Estilos y Temas

### Tailwind CSS

El proyecto usa Tailwind CSS con configuración personalizada:

- **Colores**: Sistema de colores basado en HSL con variables CSS
- **Espaciado**: Escala consistente de espaciado
- **Tipografía**: Sistema de tipografía responsivo
- **Breakpoints**: Mobile-first con breakpoints estándar

### Componentes UI

Los componentes de `shadcn/ui` están completamente personalizados y siguen el sistema de diseño:

- **Card**: Tarjetas con sombras y bordes
- **Dialog**: Modales accesibles
- **Button**: Botones con variantes
- **Input**: Inputs con estados de focus
- **Select**: Selectores accesibles
- Y más...

## 🧪 Testing

### Testing Manual

La aplicación puede probarse manualmente:

1. **Funcionalidad básica**: Navegación, filtros, paginación
2. **Responsive**: Probar en diferentes tamaños de pantalla
3. **Accesibilidad**: Usar lectores de pantalla (NVDA, JAWS, VoiceOver)
4. **Performance**: Lighthouse en Chrome DevTools

### Lighthouse

Ejecutar Lighthouse para métricas de performance:

1. Abrir Chrome DevTools
2. Ir a la pestaña "Lighthouse"
3. Seleccionar categorías (Performance, Accessibility, etc.)
4. Ejecutar análisis

**Objetivos:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

## 🐛 Troubleshooting

### Problemas Comunes

#### La aplicación no se conecta al backend

**Solución:**
1. Verificar que el backend esté ejecutándose
2. Verificar `VITE_API_BASE_URL` en `.env`
3. Verificar CORS en el backend

#### Errores de build

**Solución:**
1. Limpiar `node_modules` y reinstalar: `rm -rf node_modules && npm install`
2. Limpiar caché de Vite: `rm -rf node_modules/.vite`
3. Verificar versiones de Node.js (18+)

#### Imágenes no cargan

**Solución:**
1. Verificar URLs de imágenes en la respuesta del API
2. Verificar CORS en el servidor de imágenes
3. Revisar consola del navegador para errores

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**Juan Fernando Álvarez Gallego**

Este proyecto fue desarrollado como parte de una prueba técnica, implementando una aplicación web moderna con arquitectura limpia, optimizaciones de rendimiento y accesibilidad completa.

## 📞 Contacto

- **Email:** alvarezjfernandog@gmail.com
- **Teléfono:** +57 302 285 60 79
- **GitHub:** [Juanfeross](https://github.com/Juanfeross)
- **LinkedIn:** [Juan Fernando Álvarez Gallego](https://www.linkedin.com/in/juan-fernando-%C3%A1lvarez-gallego-b97b31212/)

---

**Prueba Técnica** - Desarrollado por **Juan Fernando Álvarez Gallego**
**Tecnologías:** React, TypeScript, Vite, Tailwind CSS, React Query
