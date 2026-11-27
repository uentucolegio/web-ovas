# 🧪 Piloto: OVAs en formato de diapositivas animadas

Esta carpeta guarda **prototipos** de un formato nuevo para los OVAs: diapositivas
con animaciones e interacciones (estilo Genially) en lugar de una página web con scroll.

- **Queda fuera de las validaciones.** `scripts/validar-ova.mjs` ignora la carpeta
  `piloto/`, y `scripts/generar-enlaces.mjs` solo publica en el listado lo que está en
  `tecnico/` y `tecnologo/`.
- **No reemplaza al OVA original**, que sigue en su ruta de siempre.

## Pilotos

| Piloto | Familia | OVA original |
|---|---|---|
| [`bucles-iterativos/`](bucles-iterativos/) | 💻 Laboratorio de código | `tecnico/semestre-1/fundamentos-de-programacion/unidad-2/bucles-iterativos` |
| [`estructura-app-nube/`](estructura-app-nube/) | 🛡️ Sala de máquinas | `tecnico/semestre-3/servicios-computacion-nube/unidad-1/estructura-de-una-app-en-la-nube` |

## Tecnología del piloto

| Para | Librería | Licencia |
|---|---|---|
| Diapositivas | [Reveal.js](https://revealjs.com) 5.1.0 | MIT |
| Animaciones | [GSAP](https://gsap.com) 3.12.5 | Gratuita (licencia estándar de GSAP) |
| Escena 3D | [Three.js](https://threejs.org) r160 | MIT |
| Figuras isométricas | [Anatomy](https://github.com/wheresryan22/anatomy) (skill de Claude Code) | MIT |

### La figura isométrica de Sala de máquinas

`estructura-app-nube/figura/rack.html` es una página autónoma (no usa CDN) que el
piloto carga en un `<iframe>` y maneja con `postMessage`. Tiene tres modos (`?modo=`):

- `viaje`: una petición recorre router, balanceador, servidor y base de datos (entera o paso a paso).
- `taller`: el rack se desarma por conjuntos (cada uno con su resorte) y cada pieza se
  inspecciona; los servidores y el balanceador salen como cajones, se les desliza la tapa y
  se ven su CPU, RAM, discos, ventiladores, fuente y tarjeta de red.
- `escalado`: los servidores entran o salen del rack según la carga.

Se genera con el kit de Anatomy:

```
node piloto/estructura-app-nube/figura/build.mjs
```

El script busca el kit en `~/.claude/skills/anatomy` (o en la ruta de la variable
`ANATOMY_KIT`). El HTML generado queda en el repositorio, así que solo hace falta
regenerarlo si cambia la figura.

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
