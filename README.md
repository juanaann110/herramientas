# Electronicaparatodos (herramientas)

Mini app estática (HTML/CSS/JS puro) con dos utilidades:
- Calculadora de bandas de resistencias.
- Calculadora de resistencia para LEDs.

## Archivos clave
- `index.html`: estructura y navegación entre tarjetas.
- `style.css`: tema oscuro con variables CSS y estilos de las dos herramientas.
- `main.js`: lógica de navegación, decodificador de resistencias y calculadora de LED.
- `logo.png`: logo que se muestra en el menú inicial.
- Accesibilidad: tarjetas navegables con teclado (Enter/Espacio), `aria-live` en resultados y estilo `:focus-visible`; se respetan usuarios con `prefers-reduced-motion`.

## Cómo probar
- Abre `index.html` en el navegador, o sirve la carpeta con cualquier server estático, por ejemplo:
  ```bash
  cd ept
  npx serve .
  # o
  python3 -m http.server 8000
  ```

No requiere dependencias ni build; se puede desplegar como sitio estático en Vercel/Netlify apuntando el root a `ept/` y sirviendo `index.html`.
