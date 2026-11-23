# 🧪 Piloto: OVAs en formato de diapositivas animadas

Esta carpeta guarda **prototipos** de un formato nuevo para los OVAs: diapositivas
con animaciones e interacciones (estilo Genially) en lugar de una página web con scroll.

- **Queda fuera de las validaciones.** `scripts/validar-ova.mjs` ignora la carpeta
  `piloto/`, y `scripts/generar-enlaces.mjs` solo publica en el listado lo que está en
  `tecnico/` y `tecnologo/`.
- **No reemplaza al OVA original**, que sigue en su ruta de siempre.

## Pilotos

| Piloto | OVA original |
|---|---|
| [`bucles-iterativos/`](bucles-iterativos/) | `tecnico/semestre-1/fundamentos-de-programacion/unidad-2/bucles-iterativos` |

## Tecnología del piloto

| Para | Librería | Licencia |
|---|---|---|
| Diapositivas | [Reveal.js](https://revealjs.com) 5.1.0 | MIT |
| Animaciones | [GSAP](https://gsap.com) 3.12.5 | Gratuita (licencia estándar de GSAP) |
| Escena 3D | [Three.js](https://threejs.org) r160 | MIT |

Por ser un prototipo, las librerías se cargan desde un CDN (jsDelivr) con la versión
fija. Si el formato se adopta, conviene **guardarlas dentro del repositorio** para no
depender de un servicio externo (es la misma lección del CDN de Tailwind).

## Qué conserva de las reglas actuales

- Las 7 secciones con sus `id` y en orden (`introduccion` → `bibliografia`), ahora
  como grupos de diapositivas.
- Plugin de accesibilidad `elens.js`, tipografía Poppins, paleta verde/slate, logo y
  pie de créditos de CINTIA (una sola vez, en la última diapositiva).
- Gamificación dentro de las secciones Contenido y Actividades.
- Respeta `prefers-reduced-motion`: sin transiciones ni animaciones para quien las
  tenga desactivadas en su sistema.
