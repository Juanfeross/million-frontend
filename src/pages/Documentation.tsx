import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Code,
  Zap,
  Palette,
  Layers,
  Settings,
  FileText,
  Package,
  Component,
  Database,
  Rocket,
  CheckCircle2,
  Info,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "architecture", label: "Arquitectura", icon: Layers },
    { id: "components", label: "Componentes", icon: Component },
    { id: "hooks", label: "Hooks", icon: Code },
    { id: "services", label: "Servicios", icon: Database },
    { id: "performance", label: "Performance", icon: Zap },
    { id: "accessibility", label: "Accesibilidad", icon: Settings },
    { id: "deployment", label: "Despliegue", icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">📚 Documentación Frontend</h1>
          <p className="text-muted-foreground text-lg">
            Guía completa de la aplicación MillionFront
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                Navegación
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-6 md:p-8">
              {activeSection === "overview" && <OverviewSection />}
              {activeSection === "architecture" && <ArchitectureSection />}
              {activeSection === "components" && <ComponentsSection />}
              {activeSection === "hooks" && <HooksSection />}
              {activeSection === "services" && <ServicesSection />}
              {activeSection === "performance" && <PerformanceSection />}
              {activeSection === "accessibility" && <AccessibilitySection />}
              {activeSection === "deployment" && <DeploymentSection />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="h-8 w-8" />
        Overview
      </h2>
      <p className="text-muted-foreground text-lg mb-6">
        MillionFront es una aplicación web moderna desarrollada en React +
        TypeScript + Vite para la visualización y búsqueda de propiedades
        inmobiliarias.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Arquitectura Limpia</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Código organizado y escalable siguiendo principios SOLID
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Búsqueda Avanzada</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Filtros por nombre, dirección y rango de precios
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Optimización de Imágenes</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Lazy loading, preload de LCP, y manejo de errores
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Accesibilidad</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Cumple con estándares WCAG con soporte para lectores de pantalla
        </p>
      </Card>
    </div>

    <Separator />

    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Package className="h-6 w-6" />
        Tecnologías Principales
      </h3>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">React 18.3.1</Badge>
        <Badge variant="secondary">TypeScript 5.8.3</Badge>
        <Badge variant="secondary">Vite 7.2.2</Badge>
        <Badge variant="secondary">Tailwind CSS 3.4.17</Badge>
        <Badge variant="secondary">shadcn/ui</Badge>
        <Badge variant="secondary">React Query 5.83.0</Badge>
        <Badge variant="secondary">React Router 6.30.1</Badge>
      </div>
    </div>
  </div>
);

const ArchitectureSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Layers className="h-8 w-8" />
        Arquitectura
      </h2>
      <p className="text-muted-foreground mb-6">
        El proyecto sigue los principios de Clean Architecture y
        Component-Driven Development.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-4">Estructura del Proyecto</h3>
      <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <pre>{`millionfront/
├── src/
│   ├── components/          # Componentes React
│   │   ├── common/          # Componentes reutilizables
│   │   ├── layout/          # Layout (Header, Footer)
│   │   ├── pagination/      # Sistema de paginación
│   │   ├── properties/      # Componentes de propiedades
│   │   └── ui/              # Componentes UI (shadcn)
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Páginas principales
│   ├── services/            # Servicios de API
│   ├── types/               # Tipos TypeScript
│   ├── utils/               # Funciones utilitarias
│   └── constants/           # Constantes
├── public/                  # Archivos estáticos
└── dist/                    # Build de producción`}</pre>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-4">Principios de Diseño</h3>
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <strong>Separación de Responsabilidades:</strong> Cada componente
            tiene una responsabilidad única
          </div>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <strong>Composición sobre Herencia:</strong> Componentes pequeños y
            composables
          </div>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <strong>Reutilización:</strong> Componentes comunes en{" "}
            <code className="bg-muted px-1 rounded">common/</code> y{" "}
            <code className="bg-muted px-1 rounded">ui/</code>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <strong>Tipado Fuerte:</strong> TypeScript en todo el código
          </div>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <strong>Performance First:</strong> Lazy loading, code splitting,
            optimizaciones de imágenes
          </div>
        </li>
      </ul>
    </div>
  </div>
);

const ComponentsSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Component className="h-8 w-8" />
        Componentes
      </h2>
      <p className="text-muted-foreground mb-6">
        Componentes principales de la aplicación organizados por categoría.
      </p>
    </div>

    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">PropertyCard</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Tarjeta individual de propiedad en el grid.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono">
          <div>Props: property, onClick, disabled?, isLCP?</div>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          <li>• Lazy loading de imágenes</li>
          <li>• Placeholder cuando no hay imagen</li>
          <li>• Optimización LCP para primera imagen</li>
          <li>• Accesibilidad completa (ARIA, teclado)</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">PropertyDetail</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Modal de detalles completos de una propiedad.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono">
          <div>Props: property, open, isLoading, onOpenChange</div>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          <li>• Lazy loading del componente</li>
          <li>• Carrusel de imágenes con thumbnails</li>
          <li>• Vista previa fullscreen</li>
          <li>
            • Información completa: ubicación, propietario, detalles, historial
          </li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">PropertyFilters</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Formulario de filtros de búsqueda.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono">
          <div>Props: value, onFilter, onReset, disabled?</div>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          <li>• Filtro por nombre de propiedad</li>
          <li>• Filtro por dirección</li>
          <li>• Filtro por precio mínimo/máximo</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">Pagination</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Sistema completo de paginación.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono">
          <div>
            Props: currentPage, totalPages, pageSize, onPageChange,
            onPageSizeChange
          </div>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          <li>• Navegación anterior/siguiente</li>
          <li>• Salto a página específica</li>
          <li>• Selector de tamaño de página</li>
          <li>• Indicadores de página actual</li>
        </ul>
      </Card>
    </div>
  </div>
);

const HooksSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Code className="h-8 w-8" />
        Hooks Personalizados
      </h2>
      <p className="text-muted-foreground mb-6">
        Hooks personalizados para lógica reutilizable.
      </p>
    </div>

    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">usePagination</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Gestiona el estado de paginación.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`const {
  page,
  pageSize,
  handlePageChange,
  handlePageSizeChange,
} = usePagination({
  initialPage: 1,
  initialPageSize: 12,
  totalPages: 10,
});`}</pre>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">usePropertyFilters</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Gestiona los filtros de búsqueda.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`const {
  filters,
  updateFilters,
  resetFilters,
} = usePropertyFilters({
  name: "",
  address: "",
  minPrice: undefined,
  maxPrice: undefined,
});`}</pre>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">usePropertyImages</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Gestiona el estado del carrusel de imágenes.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`const {
  validImages,
  activeImage,
  goToPrevImage,
  goToNextImage,
} = usePropertyImages({
  images: property?.images,
  singleImage: property?.image,
});`}</pre>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">useLCPImagePreload</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Precarga la imagen LCP para mejorar el rendimiento.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`useLCPImagePreload(imageUrl);`}</pre>
        </div>
      </Card>
    </div>
  </div>
);

const ServicesSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Database className="h-8 w-8" />
        Servicios y API
      </h2>
      <p className="text-muted-foreground mb-6">
        Servicios para comunicación con el backend.
      </p>
    </div>

    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">apiClient</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Cliente HTTP genérico con manejo de errores centralizado.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`const data = await apiClient.get<PropertyListData>(
  "/api/properties",
  { page: 1, pageSize: 20 }
);`}</pre>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          <li>• Construcción automática de URLs</li>
          <li>• Manejo de parámetros de query</li>
          <li>• Parsing de respuestas de API</li>
          <li>• Manejo centralizado de errores</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">propertiesService</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Servicio específico para propiedades.
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Obtener lista
const data = await propertiesService.getProperties(
  filters, page, pageSize
);

// Obtener detalle
const detail = await propertiesService.getPropertyById(id);`}</pre>
        </div>
        <div className="mt-3">
          <p className="text-sm font-semibold mb-2">Endpoints:</p>
          <ul className="space-y-1 text-sm">
            <li>
              •{" "}
              <code className="bg-muted px-1 rounded">GET /api/properties</code>{" "}
              - Lista paginada
            </li>
            <li>
              •{" "}
              <code className="bg-muted px-1 rounded">
                GET /api/properties/search
              </code>{" "}
              - Búsqueda con filtros
            </li>
            <li>
              •{" "}
              <code className="bg-muted px-1 rounded">
                GET /api/properties/{`{id}`}
              </code>{" "}
              - Detalle de propiedad
            </li>
          </ul>
        </div>
      </Card>
    </div>
  </div>
);

const PerformanceSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Zap className="h-8 w-8" />
        Optimizaciones de Rendimiento
      </h2>
      <p className="text-muted-foreground mb-6">
        Optimizaciones implementadas para mejorar el rendimiento.
      </p>
    </div>

    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Package className="h-5 w-5" />
          Code Splitting
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Chunks separados para mejor caching:
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge>react-core</Badge>
          <Badge>react-router</Badge>
          <Badge>query-vendor</Badge>
          <Badge>ui-vendor</Badge>
          <Badge>icons-vendor</Badge>
          <Badge>vendor</Badge>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Minificación
        </h3>
        <ul className="space-y-1 text-sm">
          <li>• esbuild para minificación ultra rápida</li>
          <li>• Eliminación de console y debugger en producción</li>
          <li>• Minificación de CSS</li>
          <li>• Tree-shaking agresivo</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Optimización de Imágenes
        </h3>
        <ul className="space-y-1 text-sm">
          <li>• LCP Preload: Primera imagen precargada</li>
          <li>• Lazy Loading: Resto de imágenes con loading="lazy"</li>
          <li>• Decoding: async para lazy, sync para LCP</li>
          <li>• Fetch Priority: high para LCP, low para otras</li>
          <li>• Sizes Attribute: Optimización responsiva</li>
          <li>• Error Handling: Placeholder cuando falla</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          Métricas de Performance
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <p className="text-xs text-muted-foreground">FCP</p>
            <p className="text-lg font-semibold">&lt; 1.8s</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">LCP</p>
            <p className="text-lg font-semibold">&lt; 2.5s</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">TTI</p>
            <p className="text-lg font-semibold">&lt; 3.8s</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">CLS</p>
            <p className="text-lg font-semibold">&lt; 0.1</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const AccessibilitySection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Settings className="h-8 w-8" />
        Accesibilidad (A11y)
      </h2>
      <p className="text-muted-foreground mb-6">
        Implementaciones de accesibilidad siguiendo estándares WCAG.
      </p>
    </div>

    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Info className="h-5 w-5" />
          ARIA Labels
        </h3>
        <ul className="space-y-1 text-sm">
          <li>• Todos los botones tienen aria-label descriptivos</li>
          <li>• Iconos decorativos con aria-hidden="true"</li>
          <li>• Diálogos con DialogTitle y DialogDescription</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          Navegación por Teclado
        </h3>
        <ul className="space-y-1 text-sm">
          <li>• Soporte completo de Tab, Enter, Space</li>
          <li>• Focus visible en todos los elementos interactivos</li>
          <li>• Navegación lógica del DOM</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Lectores de Pantalla
        </h3>
        <ul className="space-y-1 text-sm">
          <li>• Textos alternativos en todas las imágenes</li>
          <li>• Títulos y descripciones en diálogos</li>
          <li>• Estados de carga anunciados</li>
          <li>• Mensajes de error accesibles</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Contraste
        </h3>
        <ul className="space-y-1 text-sm">
          <li>• Colores con contraste WCAG AA mínimo</li>
          <li>• Variables CSS ajustadas para accesibilidad</li>
        </ul>
      </Card>
    </div>
  </div>
);

const DeploymentSection = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Rocket className="h-8 w-8" />
        Despliegue
      </h2>
      <p className="text-muted-foreground mb-6">
        Guía para desplegar la aplicación en producción.
      </p>
    </div>

    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">Build de Producción</h3>
        <div className="bg-muted p-3 rounded text-sm font-mono mb-3">
          <pre>npm run build</pre>
        </div>
        <p className="text-sm text-muted-foreground">
          Genera la carpeta <code className="bg-muted px-1 rounded">dist/</code>{" "}
          con archivos optimizados.
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          Plataformas de Despliegue
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <strong>Vercel:</strong> Despliegue automático desde Git
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <strong>Netlify:</strong> Drag & drop de la carpeta dist/
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <strong>GitHub Pages:</strong> Subir dist/ a la rama gh-pages
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <strong>AWS S3 + CloudFront:</strong> Subir dist/ a S3
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          Variables de Entorno
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Asegúrate de configurar{" "}
          <code className="bg-muted px-1 rounded">VITE_API_BASE_URL</code> en tu
          plataforma:
        </p>
        <div className="bg-muted p-3 rounded text-sm font-mono">
          <pre>{`VITE_API_BASE_URL=https://api.example.com`}</pre>
        </div>
      </Card>
    </div>
  </div>
);

export default Documentation;
