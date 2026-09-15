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
 * Cada problema trae DOS partes pensadas para personal no técnico:
 *   - "Problema"      → qué está mal, en lenguaje claro.
 *   - "Cómo corregir" → la acción concreta para arreglarlo.
 * Además, al final se imprime un bloque "PARA CORREGIR CON UN AGENTE DE IA":
 * un texto por OVA, listo para copiar y pegar en un agente para que lo arregle.
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
const HORNEAR = 'npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify';

// --- Utilidades -----------------------------------------------------------
// Cada problema es un objeto: { ova, nivel, que, arreglo }.
//   que     = qué está mal (lenguaje claro, para personal no técnico)
//   arreglo = cómo corregirlo (acción concreta / instrucción para el agente)
const problemas = [];
const err  = (ova, que, arreglo) => problemas.push({ ova, nivel: 'error', que, arreglo });
const warn = (ova, que, arreglo) => problemas.push({ ova, nivel: 'aviso', que, arreglo });

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
    err(rel,
      `La carpeta del OVA está en el nivel equivocado: tiene ${partes.length} niveles de carpetas y deben ser exactamente 5.`,
      'Mueve la carpeta del OVA a la ruta programa/semestre-N/materia/unidad-N/ova/. Ejemplo: tecnico/semestre-1/matematicas/unidad-1/ecuaciones/.');
  } else {
    const [prog, sem, mat, uni, ova] = partes;
    if (!PROGRAMAS.includes(prog))
      err(rel, `El programa "${prog}" no es válido.`,
        `Renombra la primera carpeta a "tecnico" o a "tecnologo" (los únicos permitidos).`);
    if (!/^semestre-\d+$/.test(sem))
      err(rel, `La carpeta de semestre "${sem}" no tiene el formato correcto.`,
        'Renómbrala como "semestre-N" (ej: semestre-1, semestre-2).');
    if (!SLUG.test(mat))
      err(rel, `El nombre de la materia "${mat}" tiene mayúsculas, espacios, tildes u otros caracteres no permitidos.`,
        'Renómbrala en minúsculas y con guiones, sin tildes ni espacios (ej: servicios-computacion-nube).');
    if (!/^unidad-\d+$/.test(uni))
      err(rel, `La carpeta de unidad "${uni}" no tiene el formato correcto.`,
        'Renómbrala como "unidad-N" (ej: unidad-1, unidad-2).');
    if (!SLUG.test(ova))
      err(rel, `El nombre de la carpeta del OVA "${ova}" tiene mayúsculas, espacios, tildes u otros caracteres no permitidos.`,
        'Renómbrala en minúsculas y con guiones, sin tildes ni espacios (ej: que-es-la-nube).');
  }

  const html = readFileSync(join(dir, 'index.html'), 'utf8');

  // 2) Tailwind local (nunca CDN)
  if (html.includes('cdn.tailwindcss.com'))
    err(rel,
      'El OVA carga los estilos Tailwind desde internet (cdn.tailwindcss.com). Ese servicio dejó de funcionar y por eso el OVA se ve "roto" (sin diseño).',
      `En el <head> del index.html, borra la línea <script src="https://cdn.tailwindcss.com"></script> y pon en su lugar <link rel="stylesheet" href="tailwind.css">. Luego, parado en la carpeta del OVA, ejecuta: ${HORNEAR}`);
  if (!/<link[^>]+href=["']tailwind\.css["']/i.test(html))
    err(rel,
      'Falta el enlace al estilo local del OVA (tailwind.css). Sin esto el OVA se ve sin diseño.',
      'Agrega dentro del <head> del index.html esta línea: <link rel="stylesheet" href="tailwind.css">.');
  if (!existsSync(join(dir, 'tailwind.css')))
    err(rel,
      'Falta el archivo tailwind.css dentro de la carpeta del OVA (es el que le da el diseño).',
      `Parado en la carpeta del OVA, ejecuta este comando para generarlo: ${HORNEAR}`);

  // 3) Logo
  if (!existsSync(join(dir, 'img', 'logo.webp')))
    err(rel,
      'Falta el logo institucional del OVA.',
      'Copia el archivo del logo a img/logo.webp dentro de la carpeta del OVA. Puedes tomarlo de _template/img/logo.webp.');

  // 4) Plugin de accesibilidad obligatorio
  if (!html.includes('elens.ecodestudio.dev/elens.js'))
    err(rel,
      'Falta el plugin de accesibilidad (lectura por voz, contraste, tamaño de letra…), que es obligatorio.',
      'Agrega justo antes de </body> esta línea: <script src="https://elens.ecodestudio.dev/elens.js"></script>.');

  // 5) Créditos CINTIA / Universidad de Córdoba en el footer
  if (!/CINTIA/i.test(html) || !/Universidad de C[óo]rdoba/i.test(html))
    err(rel,
      'Falta el pie de página (footer) con los créditos de CINTIA y la Universidad de Córdoba.',
      'Copia el bloque <footer> de créditos desde _template/index.html (debe mencionar "CINTIA" y "Universidad de Córdoba") y pégalo al final del contenido, antes de cerrar la página.');

  // 6) Las 7 secciones estándar
  for (const s of SECCIONES) {
    if (!new RegExp(`id=["']${s}["']`).test(html))
      err(rel,
        `Falta la sección obligatoria "${s}". Un OVA debe tener las 7 secciones estándar.`,
        `Agrega un bloque <section id="${s}"> … </section> con su contenido. Las 7 secciones son: ${SECCIONES.join(', ')}.`);
  }

  // 7) QR locales, nunca dinámicos
  if (html.includes('api.qrserver.com'))
    err(rel,
      'Los códigos QR se generan desde internet (api.qrserver.com). Eso no está permitido: deben ser imágenes guardadas en el OVA.',
      'Reemplaza cada QR por una imagen local guardada en la carpeta img/ (ej: <img src="img/qr-1.png">). Genera esos PNG con la librería de Python "qrcode".');

  // === REGLAS DE ESTILO (Nivel A, deterministas) ==========================
  // Son ADVERTENCIAS: informan buenas prácticas de coherencia visual y
  // didáctica sin bloquear el PR. Se pueden promover a error en el futuro.

  // Trabajamos sobre el HTML sin comentarios para no dar falsos positivos.
  const htmlSinComentarios = html.replace(/<!--[\s\S]*?-->/g, '');

  // E1) Tipografía institucional: Poppins.
  if (!/Poppins/i.test(html))
    warn(rel,
      'No se usa la tipografía institucional Poppins. Los OVAs deben verse consistentes entre sí.',
      "Carga la fuente Poppins (Google Fonts) y aplícala al <body> con font-family: 'Poppins', sans-serif.");

  // E2) Título del documento con el prefijo "OVA:".
  const tituloMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titulo = tituloMatch ? tituloMatch[1].trim() : '';
  if (!/^\s*OVA\s*:/i.test(titulo))
    warn(rel,
      `El título de la página no empieza con "OVA:". Actual: ${titulo ? `"${titulo}"` : '(vacío)'}.`,
      'Cambia el <title> para que empiece con "OVA: " seguido del tema. Ejemplo: <title>OVA: ¿Qué es la nube?</title>.');

  // E3) Paleta de marca (verde / slate). Buscamos que use al menos clases verdes.
  if (!/\b(?:text|bg|border|from|to|via)-green-\d{2,3}\b/.test(htmlSinComentarios))
    warn(rel,
      'No se detecta la paleta de color institucional (verde / gris slate).',
      'Usa clases de color de la marca, como text-green-800, bg-green-700 o border-slate-200, para respetar la identidad visual.');

  // E4) Gamificación en Contenido y Actividades (obligatoria por CONTRIBUTING).
  const GAMIFICACION = /(gamificaci[oó]n|misi[oó]n|misiones|insignia|medalla|logro|puntos?|nivel(?:es)?|progreso|desaf[ií]o|reto|racha|recompensa|\bXP\b|ranking|tablero)/i;
  if (!GAMIFICACION.test(htmlSinComentarios))
    warn(rel,
      'No se detectan elementos de gamificación (puntos, misiones, insignias, barra de progreso…), que deben estar en Contenido y Actividades.',
      'Agrega gamificación en las secciones Contenido y Actividades: por ejemplo puntos, misiones, insignias o una barra de progreso.');

  // E5) Controles de voz propios: elens.js ya aporta accesibilidad/voz.
  if (/speechSynthesis|SpeechSynthesisUtterance/.test(htmlSinComentarios))
    warn(rel,
      'El OVA trae su propia lectura por voz (speechSynthesis), que se duplica con el plugin de accesibilidad elens.js.',
      'Quita los botones/controles de voz propios: la lectura por voz ya la aporta el plugin elens.js.');

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
      warn(rel,
        `La autoevaluación tiene solo ${preguntas} pregunta(s). Se recomiendan al menos 5.`,
        'Amplía el arreglo quizData del index.html hasta tener 5 o más preguntas.');
  } else {
    warn(rel,
      'No se encontró la autoevaluación (el arreglo "quizData") en la sección de evaluación.',
      'Implementa el cuestionario con un arreglo quizData de al menos 5 preguntas. Puedes guiarte por el _template.');
  }
}

// --- Presentación de resultados ------------------------------------------
const errores = problemas.filter(p => p.nivel === 'error');
const avisos  = problemas.filter(p => p.nivel === 'aviso');

/** Formatea un problema para consola: qué pasa y cómo se corrige. */
function bloqueConsola(p) {
  const icono = p.nivel === 'error' ? '❌' : '⚠️ ';
  return `  ${icono} ${p.ova}\n     Problema:      ${p.que}\n     Cómo corregir: ${p.arreglo}`;
}

/**
 * Construye un texto por OVA, listo para copiar y pegar en un agente de IA.
 * El objetivo: que personal NO técnico solo copie el bloque de su OVA y el
 * agente lo corrija solo.
 */
function promptParaAgentes(lista) {
  const porOva = new Map();
  for (const p of lista) {
    if (!porOva.has(p.ova)) porOva.set(p.ova, []);
    porOva.get(p.ova).push(p);
  }
  const bloques = [];
  for (const [ova, items] of porOva) {
    const puntos = items.map((p, i) => {
      const etq = p.nivel === 'error' ? '[CORREGIR OBLIGATORIO]' : '[Recomendado]';
      return `${i + 1}. ${etq} ${p.que}\n   Solución: ${p.arreglo}`;
    }).join('\n');
    bloques.push(
      `── OVA: ${ova} ──\n` +
      `Eres un asistente que edita un Objeto Virtual de Aprendizaje (OVA). Trabaja sobre el archivo "${ova}/index.html" y su carpeta. ` +
      `Corrige EXACTAMENTE los puntos de abajo, sin cambiar nada más y respetando las reglas de CONTRIBUTING.md del repositorio:\n` +
      puntos +
      `\nAl terminar, si cambiaste clases de estilo, vuelve a generar el archivo tailwind.css parado en la carpeta del OVA con:\n${HORNEAR}`
    );
  }
  return bloques.join('\n\n');
}

// Advertencias: se informan siempre, pero NO cambian el código de salida.
if (avisos.length) {
  console.warn(`\n⚠️  ${avisos.length} advertencia(s) de estilo (no bloquean el PR):\n`);
  console.warn(avisos.map(bloqueConsola).join('\n\n'));
  console.warn('\n💡 Son buenas prácticas de coherencia visual y didáctica. Revísalas cuando puedas.');
}

if (errores.length) {
  console.error(`\n🚫 Validación FALLIDA — ${errores.length} error(es) que impiden fusionar el Pull Request:\n`);
  console.error(errores.map(bloqueConsola).join('\n\n'));
  console.error('\n📖 Reglas completas en CONTRIBUTING.md.');
}

// Bloque copiable para arreglar con un agente de IA (si hay algo que corregir).
if (problemas.length) {
  console.log('\n' + '═'.repeat(70));
  console.log('📋 PARA CORREGIR CON UN AGENTE DE IA');
  console.log('Copia el bloque del OVA que quieras arreglar y pégalo en tu agente de IA.');
  console.log('Él hará los cambios; luego vuelve a correr:  node scripts/validar-ova.mjs');
  console.log('═'.repeat(70) + '\n');
  console.log(promptParaAgentes(problemas));
  console.log('');
}

// --- Código de salida -----------------------------------------------------
if (errores.length) process.exit(1);

const resumen = avisos.length
  ? `✅ Validación OK — ${ovas.length} OVA(s) cumplen las reglas obligatorias (con ${avisos.length} advertencia(s) de estilo).`
  : `✅ Validación OK — ${ovas.length} OVA(s) cumplen todas las reglas.`;
console.log(resumen);
process.exit(0);
