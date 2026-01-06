# Guide

Plataforma para compartir contenido sobre programación competitiva construida con Next.js y MDX. Permite compartir guías, tutoriales y problemas de práctica con contenido estructurado, componentes interactivos y navegación automática.

## Características

- Contenido en MDX con soporte para componentes React
- Navegación automática organizada por secciones y temas
- Sidebar dinámico generado desde la estructura de archivos
- Componentes MDX especializados: `Info`, `Warning`, `Spoiler`, `Optional`, `Problem`
- Syntax highlighting con temas dark/light usando `rehype-pretty-code`
- Componentes UI reutilizables basados en Radix UI
- Soporte para GitHub Flavored Markdown
- Enlaces automáticos a encabezados
- Sistema de ordenamiento explícito para controlar el orden del contenido

## Requisitos

- Node.js 18 o superior
- npm, yarn, pnpm o bun

## Instalación

```bash
npm install
```

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter
- `npm run lint:fix`: Corrige errores de linting automáticamente
- `npm run format`: Formatea el código con Prettier
- `npm run format:check`: Verifica el formato sin aplicar cambios
- `npm run typecheck`: Verifica tipos de TypeScript
- `npm run check`: Ejecuta formato, lint y typecheck

## Estructura del Proyecto

```
content/guide/          # Posts y contenido en MDX
  blog/                # Posts del blog
  secciones/           # Otras secciones temáticas
src/
  app/                 # Rutas de Next.js
  components/          # Componentes React
    guide/             # Componentes específicos de la plataforma
    mdx/               # Componentes disponibles en MDX
    ui/                # Componentes UI reutilizables
  lib/                 # Utilidades y lógica
    content.ts         # Manejo de contenido MDX
    mdx.tsx            # Configuración de MDX
```

## Contribuir

Para información detallada sobre cómo contribuir, incluyendo cómo escribir nuevos posts y crear componentes MDX, consulta [CONTRIBUTING.md](./CONTRIBUTING.md).

## Tecnologías

- [Next.js](https://nextjs.org) - Framework React
- [MDX](https://mdxjs.com) - Markdown con JSX
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - Renderizado de MDX
- [rehype-pretty-code](https://github.com/atomiks/rehype-pretty-code) - Syntax highlighting
- [Radix UI](https://www.radix-ui.com) - Componentes UI accesibles
- [Tailwind CSS](https://tailwindcss.com) - Estilos
- [TypeScript](https://www.typescriptlang.org) - Tipado estático
