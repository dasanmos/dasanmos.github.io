# Sitio personal · DASANMOS

Sitio estático (HTML + CSS + JS, sin dependencias) para publicar en GitHub Pages.

## Estructura

```
dasanmos.github.io/
├── index.html
├── css/styles.css
├── js/main.js
├── images/favicon.svg, santi.jpg
└── README.md
```

## Publicar en 5 pasos

1. En GitHub crea un repositorio público llamado exactamente `dasanmos.github.io`.
2. Sube todo el contenido de esta carpeta a la rama `main`.
3. Ve a Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)`.
4. Espera 1 o 2 minutos.
5. Abre https://dasanmos.github.io

## Editar contenido

- Textos y proyectos: `index.html`.
- Colores: variables al inicio de `css/styles.css` (`--green`, `--gold`, `--navy`).
- Imágenes del carrusel: hoy son degradados; para usar fotos, agrega archivos en `images/` y ponlos como `background-image` en `.s1` … `.s4`.
