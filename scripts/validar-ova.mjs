#!/usr/bin/env node
/**
 * Validador de OVAs del repositorio institucional.
 *
 * Recorre el repo, encuentra cada OVA (carpeta con index.html) y verifica que
 * cumpla TODAS las reglas obligatorias. Si algún OVA falla, termina con código
 * de salida 1 (así GitHub Actions marca el Pull Request como fallido y no se
 * puede fusionar hasta corregirlo).
 *
 * Uso local:   node scripts/validar-ova.mjs
 * En CI:       lo ejecuta .github/workflows/validar.yml en cada Pull Request.
 *
 * No usa dependencias externas (solo módulos nativos de Node).
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();

// --- Configuración de reglas ---------------------------------------------
const PROGRAMAS = ['tecnico', 'tecnologo']; // carpetas de programa permitidas
const SECCIONES = ['introduccion', 'objetivos', 'contenido', 'actividades', 'evaluacion', 'recursos', 'bibliografia'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;   // minúsculas, números y guiones
const IGNORAR = new Set(['_template', 'node_modules', 'scripts', '.git', '.github']);

// --- Utilidades -----------------------------------------------------------
const errores = [];
const err = (ova, msg) => errores.push(`  ❌ ${ova}\n     → ${msg}`);

/** Devuelve las carpetas que son un OVA (contienen index.html), ignorando plantillas y config. */
function encontrarOvas(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || IGNORAR.has(name)) continue;
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (existsSync(join(full, 'index.html'))) acc.push(full);
    else encontrarOvas(full, acc);
  }
  return acc;
}

// --- Validación -----------------------------------------------------------
const ovas = encontrarOvas(ROOT);

if (ovas.length === 0) {
  console.log('ℹ️  No se encontraron OVAs para validar.');
  process.exit(0);
}

for (const dir of ovas) {
  const rel = relative(ROOT, dir).split(sep).join('/');
  const partes = rel.split('/');

  // 1) Jerarquía obligatoria: programa/semestre-N/materia/unidad-N/ova
  if (partes.length !== 5) {
    err(rel, `Ruta inválida. Un OVA va en programa/semestre-N/materia/unidad-N/ova/ (5 niveles); este tiene ${partes.length}.`);
  } else {
    const [prog, sem, mat, uni, ova] = partes;
    if (!PROGRAMAS.includes(prog)) err(rel, `Programa "${prog}" no permitido. Usa uno de: ${PROGRAMAS.join(', ')}.`);
    if (!/^semestre-\d+$/.test(sem)) err(rel, `"${sem}" no cumple el patrón "semestre-N" (ej: semestre-1).`);
    if (!SLUG.test(mat)) err(rel, `La materia "${mat}" debe ser un slug en minúsculas-con-guiones.`);
    if (!/^unidad-\d+$/.test(uni)) err(rel, `"${uni}" no cumple el patrón "unidad-N" (ej: unidad-1).`);
    if (!SLUG.test(ova)) err(rel, `La carpeta del OVA "${ova}" debe ser un slug en minúsculas-con-guiones.`);
  }

  const html = readFileSync(join(dir, 'index.html'), 'utf8');

  // 2) Tailwind local (nunca CDN)
  if (html.includes('cdn.tailwindcss.com'))
    err(rel, 'Usa el CDN de Tailwind (cdn.tailwindcss.com), que ya no funciona. Debe usar tailwind.css local.');
  if (!/<link[^>]+href=["']tailwind\.css["']/i.test(html))
    err(rel, 'Falta el enlace al CSS local: <link rel="stylesheet" href="tailwind.css">.');
  if (!existsSync(join(dir, 'tailwind.css')))
    err(rel, 'Falta el archivo tailwind.css horneado en la carpeta del OVA. Genera con: npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify');

  // 3) Logo
  if (!existsSync(join(dir, 'img', 'logo.webp')))
    err(rel, 'Falta img/logo.webp.');

  // 4) Plugin de accesibilidad obligatorio
  if (!html.includes('elens.ecodestudio.dev/elens.js'))
    err(rel, 'Falta el plugin de accesibilidad: <script src="https://elens.ecodestudio.dev/elens.js"></script>.');

  // 5) Créditos CINTIA / Universidad de Córdoba en el footer
  if (!/CINTIA/i.test(html) || !/Universidad de C[óo]rdoba/i.test(html))
    err(rel, 'Falta el footer de créditos de CINTIA / Universidad de Córdoba.');

  // 6) Las 7 secciones estándar
  for (const s of SECCIONES) {
    if (!new RegExp(`id=["']${s}["']`).test(html)) err(rel, `Falta la sección obligatoria "${s}".`);
  }

  // 7) QR locales, nunca dinámicos
  if (html.includes('api.qrserver.com'))
    err(rel, 'Usa QR dinámico (api.qrserver.com). Los QR deben ser imágenes locales dentro de img/.');
}

// --- Resultado ------------------------------------------------------------
if (errores.length) {
  console.error(`\n🚫 Validación FALLIDA — ${errores.length} problema(s) en ${ovas.length} OVA(s) revisado(s):\n`);
  console.error(errores.join('\n\n'));
  console.error('\n📖 Revisa las reglas en CONTRIBUTING.md. Corrige estos puntos para poder fusionar el Pull Request.\n');
  process.exit(1);
}

console.log(`✅ Validación OK — ${ovas.length} OVA(s) cumplen todas las reglas.`);
process.exit(0);
