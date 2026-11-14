# Sitio personal · DASANMOS

Sitio estático (HTML + CSS + JS, sin dependencias) para GitHub Pages.

## Estructura

```
dasanmos.github.io/
├── index.html
├── recursos.html
├── proyectos/
│   ├── serena.html
│   ├── horario-inem.html
│   ├── sonocolemp.html
│   ├── banco-escolar.html
│   ├── bienestar-estudiantil.html
│   ├── preicfes-2026.html
│   └── citaciones-icfes.html
├── css/styles.css
├── js/
│   ├── main.js
│   ├── recursos.js
│   └── recursos-data.js
├── images/
│   ├── favicon.svg
│   └── santi.jpg
└── README.md
```

## Publicar

1. Sube **el contenido** de esta carpeta (no la carpeta contenedora) a la rama `main` de `dasanmos/dasanmos.github.io`.
2. Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)`.
3. Espera 1 o 2 minutos y abre https://dasanmos.github.io

## Activar el formulario de contacto (una sola vez)

El formulario envía el mensaje al correo con el servicio FormSubmit.

1. Abre el sitio publicado y envía un mensaje de prueba.
2. FormSubmit te manda un correo de **activación** a dasanmos@gmail.com. Revisa también Spam.
3. Pulsa el botón de confirmación del correo.
4. Desde ese momento, cada mensaje llega a tu correo.

WhatsApp: al enviar, se abre `wa.me/@david.mosqueram` con el texto listo. La persona debe pulsar enviar en WhatsApp. El mensaje también se copia al portapapeles por si WhatsApp no trae el texto.

## Agregar recursos de clase

Edita `js/recursos-data.js` y añade un bloque por recurso (hay un ejemplo dentro del archivo). Sube los PDF a una carpeta `recursos/` o usa enlaces completos.

## Cambiar contenido

- Textos, datos y enlaces: `index.html` y los archivos de `proyectos/`.
- Colores: variables al inicio de `css/styles.css` (`--green`, `--gold`, `--cream`, `--coral`, `--sky`, `--violet`).
- Foto: reemplaza `images/santi.jpg` por otra del mismo nombre.
