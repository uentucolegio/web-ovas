# 📐 Reglas para agregar OVAs

Este repositorio institucional aloja los **Objetos Virtuales de Aprendizaje (OVAs)** de los programas de formación. Para mantener la calidad y la coherencia, **todo aporte pasa por un Pull Request (PR)** y debe cumplir estas reglas.

> ⚠️ **Las reglas se validan automáticamente.** Cuando abres un PR, un validador ([`scripts/validar-ova.mjs`](scripts/validar-ova.mjs)) revisa cada OVA. Si algo no cumple, **el PR no se puede fusionar** hasta corregirlo. Además, un responsable debe aprobar el PR. No hay forma de saltarse esto.

---

## 1. Estructura de carpetas (obligatoria)

Cada OVA vive en una ruta con **exactamente estos 5 niveles**:

```
<programa>/<semestre>/<materia>/<unidad>/<ova>/
```

- `<programa>`: `tecnico` o `tecnologo`.
- `<semestre>`: `semestre-1`, `semestre-2`, … (la palabra `semestre`, un guion y el número).
- `<materia>`: slug en **minúsculas-con-guiones** (ej: `servicios-computacion-nube`).
- `<unidad>`: `unidad-1`, `unidad-2`, …
- `<ova>`: slug en **minúsculas-con-guiones** (ej: `que-es-la-nube`).

Ejemplo real:

```
tecnico/
└── semestre-3/
    └── servicios-computacion-nube/
        └── unidad-1/
            ├── que-es-la-nube/
            │   ├── index.html
            │   ├── tailwind.css        ← Tailwind horneado (ver regla 3)
            │   └── img/
            │       ├── logo.webp
            │       └── qr-*.png        ← QR de los recursos
            └── tipos-de-nube/
```

---

## 2. Contenido del OVA

Cada `index.html` debe tener las **7 secciones estándar** (con estos `id`): `introduccion`, `objetivos`, `contenido`, `actividades`, `evaluacion`, `recursos`, `bibliografia`.

- **No modificar** el layout base (barra lateral, header móvil, footer de créditos).
- **Footer de créditos de CINTIA / Universidad de Córdoba**: obligatorio, no se elimina.
- **Plugin de accesibilidad** al final del `<body>` (no se omite ni se mueve):
  `<script src="https://elens.ecodestudio.dev/elens.js"></script>`
- **Gamificación** obligatoria en **Contenido** y **Actividades** (puntos, misiones, insignias, progreso), siempre contenida dentro de su sección (sin barras flotantes ni `position: fixed`).
- Reglas de relación con la guía de aprendizaje y de recursos externos: ver [`context.md`](context.md).

---

## 3. Tailwind LOCAL, nunca CDN

El CDN de Tailwind (`cdn.tailwindcss.com`) quedó descontinuado y rompe los OVAs. Por eso **cada OVA lleva su propio Tailwind horneado**:

- En el `<head>`: `<link rel="stylesheet" href="tailwind.css">` — **prohibido** `<script src="https://cdn.tailwindcss.com">`.
- Genera el `tailwind.css` **dentro de la carpeta del OVA** con:

  ```bash
  npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify
  ```

- Vuelve a ejecutar ese comando cada vez que agregues o quites clases.

---

## 4. Imágenes y QR

- El logo va en `img/logo.webp`.
- Los QR de la sección **Recursos** deben ser **imágenes locales** (`img/qr-*.png`). **Prohibido** usar QR dinámicos por URL (ej: `api.qrserver.com`).
- Toda imagen/figura lleva su fuente cuando aplique.

---

## 5. Cómo agregar un OVA (paso a paso)

1. Copia la plantilla oficial [`_template/`](_template/) y ponla en la ruta correcta (regla 1).
2. Escribe el contenido del OVA en su `index.html` (regla 2).
3. Agrega el `logo.webp` y los QR de recursos en `img/` (regla 4).
4. **Hornea** el `tailwind.css` del OVA (regla 3).
5. **Valida en tu computador** antes de subir:
   ```bash
   node scripts/validar-ova.mjs
   ```
   Debe decir `✅ Validación OK`. Si marca errores, corrígelos.

   > 🤖 **¿No eres técnico? Deja que un agente de IA lo arregle.** Cuando el validador
   > encuentra problemas, al final imprime un bloque **"PARA CORREGIR CON UN AGENTE DE IA"**
   > con un texto por cada OVA. **Copia el bloque de tu OVA y pégalo en tu agente de IA**: él
   > hará los cambios. Luego vuelve a correr `node scripts/validar-ova.mjs` para confirmar.
6. Crea una **rama**, haz commit y abre un **Pull Request** a `main`. Completa la lista de verificación del PR.
7. El validador automático corre solo. Cuando pase y un responsable apruebe, se fusiona.

---

## 6. Requisitos

- **Node.js** instalado (para hornear el Tailwind y correr el validador).
- Cada colaborador usa **su propia cuenta de GitHub** (no se comparten contraseñas).

---

## Resumen de lo que el validador comprueba

El validador reporta en **dos niveles**:

- ❌ **Errores** → reglas obligatorias. Si alguna falla, **el PR no se puede fusionar**.
- ⚠️ **Advertencias** → buenas prácticas de estilo (coherencia visual y didáctica). **No bloquean**, pero conviene revisarlas.

### ❌ Errores (bloquean el PR)

| Regla | Debe cumplirse |
|---|---|
| Ruta | `programa/semestre-N/materia/unidad-N/ova/` con slugs válidos |
| Archivos | `index.html`, `tailwind.css`, `img/logo.webp` |
| Tailwind | `<link href="tailwind.css">` y **sin** `cdn.tailwindcss.com` |
| Secciones | las 7 secciones estándar |
| Créditos | footer de CINTIA / Universidad de Córdoba |
| Accesibilidad | plugin `elens.js` presente |
| QR | locales en `img/`, sin `api.qrserver.com` |

### ⚠️ Advertencias de estilo (no bloquean)

| Regla | Se recomienda |
|---|---|
| Tipografía | usar la fuente institucional **Poppins** |
| Título | que el `<title>` empiece con `OVA: …` |
| Paleta | usar la identidad visual (verde `green-*` / `slate-*`) |
| Gamificación | incluir puntos, misiones, insignias o progreso (Contenido y Actividades) |
| Voz | no duplicar lectura por voz propia (`speechSynthesis`): ya la aporta `elens.js` |
| Evaluación | cuestionario `quizData` con **≥ 5 preguntas** |
