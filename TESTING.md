# 🧪 Guía de Testing - MillionFront

Esta guía explica cómo ejecutar y escribir tests unitarios para el frontend.

## 📦 Stack de Testing

- **Vitest**: Test runner rápido y compatible con Vite
- **React Testing Library**: Para testing de componentes React
- **@testing-library/jest-dom**: Matchers adicionales para DOM
- **@testing-library/user-event**: Para simular interacciones del usuario
- **jsdom**: Entorno DOM para tests
- **@vitest/coverage-v8**: Para reportes de cobertura

## 🚀 Scripts Disponibles

```bash
# Ejecutar tests en modo watch (desarrollo)
npm run test

# Ejecutar tests una vez
npm run test:run

# Ejecutar tests con UI interactiva
npm run test:ui

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

## 📁 Estructura de Tests

Los tests se organizan siguiendo la estructura del código fuente:

```
src/
├── utils/
│   ├── __tests__/
│   │   ├── formatters.test.ts
│   │   ├── imageUtils.test.ts
│   │   └── stringUtils.test.ts
├── hooks/
│   ├── __tests__/
│   │   ├── usePagination.test.ts
│   │   └── usePropertyFilters.test.ts
├── components/
│   ├── common/
│   │   └── __tests__/
│   │       └── ImagePlaceholder.test.tsx
├── services/
│   ├── __tests__/
│   │   ├── apiClient.test.ts
│   │   └── properties.test.ts
└── test/
    ├── setup.ts              # Configuración global
    └── utils/
        └── test-utils.tsx    # Helpers para testing
```

## ✍️ Escribir Tests

### Tests de Utilidades

```typescript
import { describe, it, expect } from "vitest";
import { formatNumber } from "../formatters";

describe("formatNumber", () => {
  it("should format number correctly", () => {
    expect(formatNumber(1000)).toBe("1.000");
  });
});
```

### Tests de Hooks

```typescript
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  it("should change page correctly", () => {
    const { result } = renderHook(() => usePagination());
    
    act(() => {
      result.current.handlePageChange(2);
    });
    
    expect(result.current.page).toBe(2);
  });
});
```

### Tests de Componentes

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import { ImagePlaceholder } from "../ImagePlaceholder";

describe("ImagePlaceholder", () => {
  it("should render correctly", () => {
    render(<ImagePlaceholder />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });
});
```

### Tests de Servicios

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "../apiClient";

describe("apiClient", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("should make GET request", async () => {
    const mockData = { id: 1 };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockData }),
    });

    const result = await apiClient.get("/api/test");
    expect(result).toEqual(mockData);
  });
});
```

## 🎯 Cobertura de Tests

Ejecutar con cobertura:

```bash
npm run test:coverage
```

Esto genera un reporte HTML en `coverage/` que muestra:
- Porcentaje de cobertura por archivo
- Líneas cubiertas/no cubiertas
- Funciones y branches cubiertos

## 📊 Estado Actual de Tests

### Tests Implementados

- ✅ **Utils**: formatters, imageUtils, stringUtils
- ✅ **Hooks**: usePagination, usePropertyFilters
- ✅ **Components**: ImagePlaceholder
- ✅ **Services**: apiClient, propertiesService

### Próximos Tests a Implementar

- [ ] Tests de componentes más complejos (PropertyCard, PropertyDetail)
- [ ] Tests de hooks adicionales (usePropertyImages, useLCPImagePreload)
- [ ] Tests de integración
- [ ] Tests E2E (opcional, con Playwright o Cypress)

## 🔧 Configuración

La configuración de Vitest está en `vite.config.ts`:

```typescript
test: {
  globals: true,
  environment: "jsdom",
  setupFiles: ["./src/test/setup.ts"],
  css: true,
  coverage: {
    provider: "v8",
    reporter: ["text", "json", "html"],
  },
}
```

## 💡 Mejores Prácticas

1. **Nombres descriptivos**: Usa nombres claros para tests y describe blocks
2. **AAA Pattern**: Arrange, Act, Assert
3. **Tests aislados**: Cada test debe ser independiente
4. **Mocking**: Mockea dependencias externas (APIs, módulos)
5. **Cobertura**: Apunta a >80% de cobertura en código crítico
6. **Tests rápidos**: Mantén los tests rápidos (<100ms por test)

## 🐛 Troubleshooting

### Tests no encuentran módulos

Verifica que `vite.config.ts` tenga el alias `@` configurado correctamente.

### Errores de tipos en tests

Asegúrate de que `tsconfig.json` incluya los tipos de Vitest:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

### Tests lentos

- Usa `vi.mock()` para mockear módulos pesados
- Evita tests que hagan llamadas reales a APIs
- Usa `vi.useFakeTimers()` para tests con timers

## 📚 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

