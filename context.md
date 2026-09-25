# Contexto del Proyecto: CINTIA Web OVAs

## Descripción general

**CINTIA Web OVAs** es un repositorio de materiales educativos interactivos en formato web para estudiantes de una institución técnica. Cada OVA es una página HTML autocontenida que aborda un tema específico (puede ser de cualquier área: programación, matemáticas, ciencias, humanidades, etc.) combinando conceptos clave, elementos visuales interactivos y actividades prácticas, organizados por semestre y unidad temática.

## Audiencia objetivo

Los OVAs están diseñados para **jóvenes de último año de bachillerato**. Por esto:

- Se debe usar un **lenguaje cercano, motivador y emocional**, evitando tecnicismos innecesarios sin importar el área temática.
- Es obligatorio usar **emojis** de forma estratégica para captar la atención y hacer la lectura más dinámica y entretenida.
- El tono debe sentirse como un amigo que explica, no como un libro de texto.
- El vocabulario y los ejemplos deben ser **contextualizados a situaciones cotidianas** que el estudiante pueda reconocer fácilmente, independientemente de la materia.

## Filosofía de diseño del contenido

Los OVAs son **guías prácticas**, NO libros de teoría. Esto significa:

- Usar la **menor cantidad de texto posible**, sin importar la materia.
- El texto extenso solo está justificado cuando se trata de la **definición o fundamentación de un concepto**.
- Priorizar siempre: ejemplos visuales, elementos interactivos, actividades con clicks, tablas, comparaciones rápidas y simulaciones.
- El estudiante debe **hacer** más de lo que lee: responder, arrastrar, seleccionar, ejecutar, calcular, explorar.
- **Más clicks, menos lectura**: cada sección debe invitar al usuario a interactuar antes de explicar.

## Relación con la guía de aprendizaje del curso (mapeo de secciones — regla obligatoria)

El OVA se construye a partir de la guía de aprendizaje del curso. Cada sección del OVA tiene una relación **definida y fija** con la guía. Respetar este mapeo es obligatorio:

- **Introducción, Objetivos, Actividades, Recursos y Bibliografía → SE MANTIENEN.** Estas cinco secciones reflejan el contenido de la guía de aprendizaje: los mismos objetivos, las mismas actividades, los mismos recursos/anexos y la misma bibliografía. Se adaptan al formato web interactivo (emojis, estilo visual, gamificación en las actividades), pero su **sustancia es la misma que la de la guía**. No se inventan objetivos, actividades ni recursos distintos a los de la guía.
- **Contenido → ES EL ÚNICO APARTADO QUE PUEDE (Y DEBE) CONTENER INFORMACIÓN DIFERENTE Y COMPLEMENTARIA** a la guía. Aquí es donde el OVA aporta valor adicional: ángulos, ejemplos, datos, contexto histórico, cifras, casos o profundizaciones que amplían el tema **sin repetir literalmente el "Desarrollo del contenido" de la guía**. Es la sección interactiva central del OVA.
- **Evaluación → ES COMPLETAMENTE NUEVA.** La guía de aprendizaje no incluye evaluación (quiz). La IA la construye desde cero, con mínimo 5 preguntas de selección múltiple de dificultad progresiva, cubriendo tanto los conceptos del tema como el contenido complementario del OVA.

**Regla de tono (obligatoria):** el OVA **nunca debe hacer referencia a la guía de aprendizaje ni comentar la relación entre ambos recursos.** Están prohibidas frases como "lo que tu guía no te contó", "a diferencia de la guía", "esto complementa tu guía", "estas actividades son distintas a las de tu guía", etc. El estudiante no necesita saber cómo se construyó el material: vive el OVA como un recurso completo y natural por sí mismo.

## Estructura de cada OVA

Cada OVA sigue una estructura consistente:

- **Sidebar de navegación** (desktop) con logo circular (150×150px con borde verde) y enlaces por sección.
- **Menú desplegable** (mobile) con logo reducido.
- **Secciones estándar**: Introducción, Objetivos, Contenido, Actividades, Evaluación, Recursos, Bibliografía.
- **Elementos interactivos** según la materia: consolas de código, simuladores, cuestionarios, arrastrar y soltar, calculadoras, etc.
- **Acordeones** para organizar el contenido y evitar muros de texto.
- **Actividades prácticas** que requieren interacción del usuario en cada sección.

## Tecnologías usadas

- **HTML + TailwindCSS** para layout y estilos. **⚠️ Tailwind se usa HORNEADO LOCALMENTE, NO desde CDN** (ver "Tailwind local (obligatorio)"). Cada OVA lleva su propio `tailwind.css` en su carpeta.
- **JavaScript vanilla** para interactividad (simuladores, acordeones, navegación, cuestionarios, etc.).
- **Google Fonts (Poppins)** para tipografía.
- Imágenes en formato `.webp`.

## Tailwind local (obligatorio)

El CDN de Tailwind (`cdn.tailwindcss.com`) **quedó descontinuado y ya no funciona**: cualquier OVA que dependa de él pierde todo su diseño. Por eso **cada OVA debe ser autónomo** y llevar su propio Tailwind horneado localmente.

Reglas:

- **NUNCA** usar `<script src="https://cdn.tailwindcss.com"></script>` (ni ningún CDN de Tailwind).
- En el `<head>`, Tailwind se enlaza como archivo local: `<link rel="stylesheet" href="tailwind.css">`.
- Ese `tailwind.css` se genera con la CLI oficial de Tailwind, escaneando **solo la carpeta del propio OVA** (así cada OVA es independiente de la estructura del repo). Comando estándar, ejecutado **dentro de la carpeta del OVA**:

  ```bash
  npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify
  ```

- **Cada vez que se crea un OVA o se le agregan/quitan clases**, hay que volver a correr ese comando en su carpeta para regenerar `tailwind.css` (contiene solo las clases que ese OVA usa, incluidas las generadas desde el JavaScript).
- El `<style>` propio del OVA y el resto del `<head>` (fuentes, plugin de accesibilidad) se mantienen igual.

## Reglas para interactividad (OVAs de programación)

Cuando el OVA incluye playgrounds de código JavaScript/React:

1. **NO usar JSX directamente** en playgrounds, ya que causa errores de sintaxis.
2. Simular conceptos de React con **JavaScript puro válido**.
3. Mostrar JSX como **strings con template literals**.
4. Garantizar que el código **se ejecute sin errores** cuando el estudiante presione "Ejecutar".

Para otras materias, los elementos interactivos deben igualmente funcionar sin errores y dar retroalimentación inmediata al estudiante.

## Estructura del repositorio (jerarquía obligatoria)

Cada OVA vive en una ruta de **exactamente 5 niveles**: `programa/semestre/materia/unidad/ova/`.

```
<repo>/
├── tecnico/                                  # programa: tecnico | tecnologo
│   └── semestre-3/                           # semestre-N
│       └── servicios-computacion-nube/       # materia (slug minúsculas-con-guiones)
│           └── unidad-1/                      # unidad-N
│               └── que-es-la-nube/            # un OVA (slug)
│                   ├── index.html
│                   ├── tailwind.css           # Tailwind horneado local
│                   └── img/                   # logo.webp + qr-*.png
├── tecnologo/
├── _template/                                # plantilla oficial
├── context.md · CONTRIBUTING.md · README.md
├── scripts/validar-ova.mjs                   # validador de reglas
└── .github/                                  # validación automática en cada PR
```

Reglas de nombres: `programa` ∈ {`tecnico`, `tecnologo`}; `semestre-N` y `unidad-N` con número; `materia` y `ova` en slug minúsculas-con-guiones. El validador (`scripts/validar-ova.mjs`) rechaza cualquier OVA que no respete esta jerarquía.

## Las reglas se validan automáticamente

Este repositorio es institucional y **las reglas son obligatorias**. Al abrir un Pull Request, GitHub Actions ejecuta `scripts/validar-ova.mjs` sobre cada OVA; si algo no cumple, el PR **no se puede fusionar**. Antes de subir, valida en local con `node scripts/validar-ova.mjs`. Las reglas completas para colaboradores están en `CONTRIBUTING.md`.

## OVA de referencia visual

La carpeta **`_template/`** es el estándar de referencia para estilos, estructura y comportamiento. Cualquier inconsistencia visual o de layout debe corregirse tomando la plantilla como modelo, independientemente de la materia.

## Reglas para crear nuevos OVAs

Al crear un nuevo OVA se deben seguir estas reglas **sin excepción**:

### Lo que NO se puede modificar

- **Estructura base**: el layout (sidebar + contenido principal + mobile header) no se toca.
- **Estilos y diseño**: los colores, tipografía (Poppins), espaciados, clases de TailwindCSS estructurales y el esquema visual general deben mantenerse idénticos.
- **Logo**: el logo circular (150×150px, borde verde `border-2 border-green-500`) en el sidebar desktop no se modifica en posición, tamaño ni estilo.
- **Iconos y elementos estructurales**: los iconos de navegación del menú lateral y mobile no se cambian.
- **Secciones estándar**: las secciones (Introducción, Objetivos, Contenido, Actividades, Evaluación, Recursos, Bibliografía) deben estar presentes siempre.
- **Créditos a CINTIA**: son **obligatorios** en cada OVA generado y no se deben eliminar ni modificar.

### Sección de Recursos (estructura intocable)

La sección de **Recursos** tiene una estructura fija que **no se puede modificar**. Solo se reemplazan los datos (nombre, descripción, enlace, imagen del QR) de cada ítem. La estructura HTML de cada recurso es siempre:

```html
<li class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500 flex flex-col sm:flex-row sm:items-center justify-between">
    <div>
        <h3 class="font-bold text-green-700">[Nombre del recurso]</h3>
        <p class="text-slate-600 mb-2">[Descripción breve]</p>
        <a href="[URL]" target="_blank" class="underline text-slate-700 hover:text-green-700">Ir al recurso</a>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
        <div class="bg-green-50 border border-green-300 rounded flex items-center justify-center" style="width:2cm;height:2cm;">
            <img src="img/[nombre-qr].png" alt="QR [Nombre del recurso]" class="max-w-full max-h-full object-contain" loading="lazy">
        </div>
    </div>
</li>
```

Cada recurso debe tener: **nombre**, **descripción**, **enlace** e **imagen QR** en `img/`. No se cambian clases, estilos ni la disposición del layout.

### Lo que SÍ se puede (y debe) personalizar

- **Sección de Contenido**: libre para adaptarse al tema, usando elementos interactivos, simuladores, tablas, acordeones, etc.
- **Sección de Actividades**: libre para diseñar las actividades prácticas propias de la materia.

### Gamificación (obligatoria en Contenido y Actividades)

Las secciones de **Contenido** y **Actividades** deben aplicar estrategias de gamificación para mantener la motivación y el engagement del estudiante. Esto es **obligatorio**, no opcional. Estrategias a usar:

- **Sistema de puntos o estrellas**: el estudiante acumula puntos al responder correctamente o completar tareas. Mostrar el puntaje en pantalla en tiempo real.
- **Retroalimentación inmediata con refuerzo positivo**: mensajes de celebración ("¡Excelente! 🎉", "¡Lo lograste! ⭐") o de aliento cuando falla ("¡Casi! Inténtalo de nuevo 💪").
- **Niveles o progreso visible**: indicador de progreso (barra, porcentaje, etapas) que muestre al estudiante cuánto ha avanzado.
- **Retos y mini-misiones**: enmarcar las actividades como misiones o retos ("Misión 1: Descifra el concepto", "Reto final: Demuestra lo que sabes").
- **Revelación progresiva**: el contenido se desbloquea conforme el estudiante completa pasos anteriores, generando curiosidad.
- **Temporizador opcional**: para actividades de evaluación o retos, agregar un contador de tiempo para aumentar la adrenalina.
- **Tabla de logros o insignias**: al completar secciones, mostrar una insignia o mensaje de logro desbloqueado.

Cada acordeón de contenido debe tener al menos **una mecánica de gamificación** integrada. Las actividades deben sentirse como **misiones**, no como tareas.

> ⚠️ **Límite obligatorio**: toda mecánica de gamificación debe estar **contenida dentro de la sección Contenido o Actividades**. Ninguna estrategia de gamificación puede modificar el layout global del OVA. Esto significa:
> - **NO** agregar barras de progreso globales fuera de una sección.
> - **NO** mostrar puntajes flotantes, overlays, ni elementos fijos (`position: fixed`) relacionados con gamificación.
> - **NO** modificar el sidebar, el header mobile ni el footer.
> - Los contadores de puntos, barras de progreso e insignias solo existen **dentro del bloque de contenido o actividad** donde aplican.

### Recursos externos multimedia (videos, simuladores, etc.)

Cuando el contenido de un acordeón se beneficiaría de un video, simulador u otro recurso externo, la IA **debe** insertar una card de recurso externo en ese lugar. **Nunca** incrustar un `<iframe>` de YouTube ni inventar URLs.

Reglas de implementación:

1. **Cada card tiene un `id` único** e incremental: `recurso-ext-1`, `recurso-ext-2`, etc. Si el OVA tiene varios recursos externos, cada uno lleva su propio id.
2. **El botón nace desactivado** (`href="#"`, con clases `opacity-50 cursor-not-allowed`) hasta que el docente lo active con la IA.
3. **La card muestra un mensaje ejemplo** para que el docente sepa qué decirle al agente de IA en el chat. El mensaje incluye el `id` del recurso para que el agente sepa exactamente qué actualizar. El docente no edita código.
4. **La card usa la paleta verde del OVA** (`bg-green-50`, `border-green-300`), no colores ajenos.
5. **La IA incluye en el comentario HTML** encima de cada card: el tema y los términos de búsqueda sugeridos.

El docente nunca toca el código. Su flujo es: buscar el recurso → leer el mensaje de la card → decirle al agente de IA en el chat: *"Encontré un recurso para el recurso-ext-1 del OVA. Actualízalo con esta URL: [URL] y ponle el título: [título]."* → el agente edita el archivo directamente.

Este flujo asume que el docente trabaja con un **editor con agente integrado** (como Windsurf, Cursor, GitHub Copilot, etc.). No requiere copiar ni pegar código HTML.

### Plugin de accesibilidad (obligatorio)

Todo OVA generado debe incluir el siguiente script **antes del cierre de `</body>`**:

```html
<script src="https://elens.ecodestudio.dev/elens.js"></script>
```

Este plugin no se debe omitir, modificar ni mover de posición.

> ⚠️ El plugin de accesibilidad ya incluye un componente de lectura en voz alta. Por esto, **NO se deben agregar controles de voz propios** (`speech-controls`, botones Leer/Pausar/Detener, ni el script de `SpeechSynthesis`) en los nuevos OVAs. La plantilla `_template/index.html` ya refleja esto.

### Proceso para crear un nuevo OVA

1. Tomar como base la carpeta **`_template/`** del repositorio (`_template/index.html`), que es la plantilla vacía oficial con toda la estructura base lista.
2. Copiar la carpeta `_template/` y ubicarla en la ruta jerárquica correcta con el nombre del OVA (ej: `tecnico/semestre-1/matematica-basica/unidad-2/trigonometria/`).
3. Reemplazar únicamente el contenido de las secciones **Contenido** y **Actividades**, siguiendo las reglas de gamificación obligatorias.
4. Verificar que el logo, créditos, navegación y estilos globales permanezcan intactos.
5. Ajustar los textos de navegación (nombres de secciones en el menú) solo si el tema lo requiere, sin alterar el estilo visual.
6. **Hornear el Tailwind local del OVA** (paso obligatorio, ver "Tailwind local"): dentro de la carpeta del OVA, ejecutar `npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify`. Esto genera el `tailwind.css` que da todo el diseño. Sin este paso, el OVA se ve sin estilos. Repetir el comando si luego se cambian clases.
