# EstateHub – Gestión de Propiedades

Aplicación web para explorar, filtrar y visualizar propiedades inmobiliarias de forma moderna y responsiva.

## Requisitos previos

- Node.js 18+ y npm

## Instalación y desarrollo

```bash
# Instalación de dependencias
npm install

# Entorno de desarrollo con Vite
npm run dev

# Compilación para producción
npm run build

# Vista previa de la build
npm run preview
```

## Tecnologías principales

- Vite + React + TypeScript
- Tailwind CSS y shadcn/ui
- React Router
- Supabase (integración preparada)

## Estructura destacada

- `src/pages`: vistas principales
- `src/components`: componentes reutilizables (incluye UI de shadcn)
- `src/data`: datos mock para pruebas
- `src/integrations/supabase`: cliente y tipos base
- `src/hooks`: hooks personalizados (toasts, detección móvil, etc.)

## Configuración adicional

- Variables de entorno: copiar `.env.example` a `.env` y ajustar valores
- Ajustar metadatos en `index.html` para la marca deseada

## Buenas prácticas

- Ejecutar `npm run build` antes de subir cambios para validar que todo compile
- Mantener la consistencia de estilos usando la configuración de Tailwind
- Usar los componentes de `src/components/ui` para patrones comunes (formularios, diálogos, tablas, etc.)

Con esto deberías tener todo lo necesario para continuar el desarrollo sin referencias externas.
