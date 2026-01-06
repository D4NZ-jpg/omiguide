# Guía de Contribución

Esta guía explica cómo escribir posts para el proyecto.

## Escribir Nuevos Posts

### Ubicación

Los posts van en `content/guide/`. La estructura de carpetas determina las secciones en el sidebar:

- `content/guide/blog/` → sección "blog"
- `content/guide/secciones/` → sección "secciones"
- etc.

### Formato

Cada post es un archivo `.mdx` con frontmatter y contenido:

```mdx
---
title: "Algoritmos de Búsqueda Binaria"
description: "Guía completa sobre búsqueda binaria"
id: "busqueda-binaria"
author: "Juan Pérez"
---

## Introducción

Tu contenido aquí...
```

### Frontmatter

Campos disponibles:

- **`title`** (opcional): Título del post. Si se omite, se genera desde el nombre del archivo.
- **`description`** (opcional): Descripción breve.
- **`draft`** (opcional): Si es `true`, el post no se muestra públicamente.
- **`id`** (opcional): Identificador único. Si no se especifica, se usa el slug.
- **`prerequisites`** (opcional): Array de IDs de posts que deben leerse antes.
- **`author`** (opcional): Autor o autores (string o array).
- **`contributors`** (opcional): Array de contribuidores.
- **`frequency`** (opcional): Número del 1 al 5 (qué tan común es el tema en competencias).

### Nombrado de Archivos

- Usa minúsculas con guiones: `busqueda-binaria.mdx`, `programacion-dinamica.mdx`
- El nombre determina la URL: `blog/busqueda-binaria.mdx` → `/guide/blog/busqueda-binaria`
- Para crear una página índice, usa `index.mdx`

### Ordenamiento

El orden se controla en `src/lib/ordering.ts`. Para agregar un post:

1. Crea el archivo `.mdx` en la ubicación deseada
2. Agrega el slug completo (ej: `"blog/mi-nuevo-post"`) o el ID del frontmatter (ej: `"mi-nuevo-post"`) al array `items` correspondiente en `ordering.ts`

Ejemplo:

```typescript
// src/lib/ordering.ts
const ORDERING: Record<SectionID, SectionConfig> = {
    blog: {
        label: "Blog",
        items: [
            "blog-index",
            "blog/primer-post",
            "blog/mi-nuevo-post", // Agregar aquí
        ],
    },
};
```

Si no agregas el post a `ordering.ts`, aparecerá al final de la sección ordenado alfabéticamente.

### Contenido

Puedes usar Markdown estándar y componentes MDX:

**Markdown:**

- Encabezados, listas, código inline con backticks
- Bloques de código con syntax highlighting (especifica el lenguaje: ` ```cpp `, ` ```python `, etc.)
- Enlaces, negrita, cursiva

**Componentes MDX disponibles:**

- `<Info>`: Información importante o tips
- `<Warning>`: Advertencias o precauciones
- `<Spoiler>`: Contenido colapsable (soluciones, código)
- `<Optional>`: Contenido opcional
- `<Problem>`: Problemas de práctica con metadata

Ejemplos:

```mdx
<Info title="Tip">Este es un consejo útil.</Info>

<Warning>Ten cuidado con este caso especial.</Warning>

<Spoiler title="Solución">La solución es usar DP...</Spoiler>

<Problem
    name="Livestock Lineup"
    url="http://www.usaco.org/index.php?page=viewproblem2&cpid=965"
    source="USACO Bronze"
    difficulty="Medio"
    tags={["Grafos", "Permutaciones"]}
>
    Descripción del problema...
</Problem>
```

## Crear Componentes MDX

Los componentes disponibles en MDX se definen en `src/components/mdx/mdx-components.tsx`.

Para agregar un nuevo componente:

1. Crea el componente en `src/components/mdx/` o `src/components/ui/`
2. Importa y regístralo en `mdx-components.tsx`:

```tsx
import { MiComponente } from "@/components/mdx/mi-componente";

export const mdxComponents = {
    // ... componentes existentes
    MiComponente,
};
```

## Desarrollo Local

### Scripts

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Build para producción
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código
- `npm run check`: Ejecuta formato, lint y typecheck

### Verificar Cambios

Antes de hacer commit, ejecuta `npm run check`.

## Conventional Commits

Los commits deben seguir el formato [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[ámbito opcional]: <descripción>
```

Tipos comunes:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `refactor`: Refactorización
- `chore`: Cambios en herramientas o configuración

Ejemplos:

```
docs(blog): agregar post sobre búsqueda binaria
docs(blog): corregir errores tipográficos en post de grafos
feat(mdx): agregar componente Problem para problemas de práctica
fix: corregir ordenamiento en sidebar
```

Los commits se validan automáticamente antes de ser aceptados.
