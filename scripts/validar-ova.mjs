#!/usr/bin/env node
/**
 * Validador de OVAs del repositorio institucional.
 *
 * Recorre el repo, encuentra cada OVA (carpeta con index.html) y verifica que
 * cumpla las reglas. Hay dos niveles de severidad:
 *
 *   ❌ ERRORES      → reglas obligatorias (estructura, Tailwind local, secciones,
 *                     footer, accesibilidad…). Si alguno falla, el script termina
 *                     con código 1 y GitHub Actions bloquea el Pull Request.
 *   ⚠️  ADVERTENCIAS → reglas de estilo/buenas prácticas (Nivel A, deterministas).
 *                     Se informan pero NO bloquean: el código de salida sigue
 *                     siendo 0. Sirven para orientar sin rechazar variaciones
 *                     legítimas del contenido de cada docente.
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
const advertencias = [];
const err = (ova, msg) => errores.push(`  ❌ ${ova}\n     → ${msg}`);
const warn = (ova, msg) => advertencias.push(`  ⚠️  ${ova}\n     → ${msg}`);

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

  // === REGLAS DE ESTILO (Nivel A, deterministas) ==========================
  // Son ADVERTENCIAS: informan buenas prácticas de coherencia visual y
  // didáctica sin bloquear el PR. Se pueden promover a error en el futuro.

  // Trabajamos sobre el HTML sin comentarios para no dar falsos positivos.
  const htmlSinComentarios = html.replace(/<!--[\s\S]*?-->/g, '');

  // E1) Tipografía institucional: Poppins.
  if (!/Poppins/i.test(html))
    warn(rel, 'No se detecta la fuente institucional Poppins. Todos los OVAs usan Poppins para mantener coherencia visual.');

  // E2) Título del documento con el prefijo "OVA:".
  const tituloMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titulo = tituloMatch ? tituloMatch[1].trim() : '';
  if (!/^\s*OVA\s*:/i.test(titulo))
    warn(rel, `El <title> debería empezar con "OVA: …" (actual: ${titulo ? `"${titulo}"` : 'vacío'}).`);

  // E3) Paleta de marca (verde / slate). Buscamos que use al menos clases verdes.
  if (!/\b(?:text|bg|border|from|to|via)-green-\d{2,3}\b/.test(htmlSinComentarios))
    warn(rel, 'No se detectan clases de color verde (paleta institucional Tailwind: green-* / slate-*). Revisa que respete la identidad visual.');

  // E4) Gamificación en Contenido y Actividades (obligatoria por CONTRIBUTING).
  const GAMIFICACION = /(gamificaci[oó]n|misi[oó]n|misiones|insignia|medalla|logro|puntos?|nivel(?:es)?|progreso|desaf[ií]o|reto|racha|recompensa|\bXP\b|ranking|tablero)/i;
  if (!GAMIFICACION.test(htmlSinComentarios))
    warn(rel, 'No se detectan elementos de gamificación (puntos, misiones, insignias, progreso…). Son obligatorios en Contenido y Actividades.');

  // E5) Controles de voz propios: elens.js ya aporta accesibilidad/voz.
  if (/speechSynthesis|SpeechSynthesisUtterance/.test(htmlSinComentarios))
    warn(rel, 'Usa controles de voz propios (Web Speech / speechSynthesis). La accesibilidad y lectura por voz las provee el plugin elens.js; evita duplicarlas.');

  // (Nota) No validamos "position: fixed" de forma determinista: el layout base
  // estándar (barra lateral + header móvil) lo usa legítimamente. Distinguir una
  // barra flotante de gamificación de la navegación base requiere análisis visual
  // (Nivel B), no de texto. Queda fuera del Nivel A para no dar falsos positivos.

  // E6) Cuestionario de evaluación con al menos 5 preguntas (parse de quizData).
  const quizMatch = html.match(/(?:const|let|var)\s+quizData\s*=\s*(\[[\s\S]*?\])\s*;/);
  if (quizMatch) {
    // Contamos objetos de primer nivel de forma tolerante (cuenta de "pregunta"/"question").
    const preguntas = (quizMatch[1].match(/\b(?:pregunta|question)\s*:/gi) || []).length;
    if (preguntas > 0 && preguntas < 5)
      warn(rel, `La evaluación tiene ${preguntas} pregunta(s); se recomiendan al menos 5 para una autoevaluación significativa.`);
  } else {
    warn(rel, 'No se encontró un arreglo "quizData" en la evaluación. Verifica que el cuestionario esté implementado (se recomiendan ≥5 preguntas).');
  }
}

// --- Resultado ------------------------------------------------------------
// Advertencias: se informan siempre, pero NO cambian el código de salida.
if (advertencias.length) {
  console.warn(`\n⚠️  ${advertencias.length} advertencia(s) de estilo (no bloquean el PR):\n`);
  console.warn(advertencias.join('\n\n'));
  console.warn('\n💡 Son buenas prácticas de coherencia visual y didáctica. Revísalas cuando puedas.\n');
}

if (errores.length) {
  console.error(`\n🚫 Validación FALLIDA — ${errores.length} problema(s) en ${ovas.length} OVA(s) revisado(s):\n`);
  console.error(errores.join('\n\n'));
  console.error('\n📖 Revisa las reglas en CONTRIBUTING.md. Corrige estos puntos para poder fusionar el Pull Request.\n');
  process.exit(1);
}

const resumen = advertencias.length
  ? `✅ Validación OK — ${ovas.length} OVA(s) cumplen las reglas obligatorias (con ${advertencias.length} advertencia(s) de estilo).`
  : `✅ Validación OK — ${ovas.length} OVA(s) cumplen todas las reglas.`;
console.log(resumen);
process.exit(0);
