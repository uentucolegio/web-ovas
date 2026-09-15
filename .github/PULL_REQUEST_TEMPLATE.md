<!--
  Gracias por aportar un OVA. Antes de crear el Pull Request, revisa esta lista.
  Un validador automático comprobará estas reglas: si algo falla, el PR no se
  podrá fusionar hasta corregirlo. Detalle completo en CONTRIBUTING.md.
-->

## ¿Qué agrega este Pull Request?

<!-- Describe brevemente el/los OVA(s) que agregas o modificas. -->

- Programa / semestre / materia / unidad:
- OVA(s):

## Lista de verificación (obligatoria)

- [ ] El OVA está en la ruta correcta: `programa/semestre-N/materia/unidad-N/ova/` (slugs en minúsculas-con-guiones).
- [ ] La carpeta del OVA tiene `index.html`, su propio `tailwind.css` horneado e `img/logo.webp`.
- [ ] Usa **Tailwind local** (`<link rel="stylesheet" href="tailwind.css">`) y **NO** el CDN `cdn.tailwindcss.com`.
- [ ] Incluye las **7 secciones**: Introducción, Objetivos, Contenido, Actividades, Evaluación, Recursos, Bibliografía.
- [ ] Mantiene el **footer de créditos de CINTIA** y el **plugin de accesibilidad** (`elens.js`).
- [ ] Los QR de recursos son **imágenes locales** en `img/` (no QR dinámicos por URL).
- [ ] Ejecuté `node scripts/validar-ova.mjs` en local y pasó sin errores.

## Confirmo

- [ ] Leí y cumplí las reglas de `CONTRIBUTING.md` y `context.md`.
