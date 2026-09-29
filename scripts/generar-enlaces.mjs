#!/usr/bin/env node
/**
 * Genera ENLACES-OVAS.md: el enlace público de cada OVA, organizado por
 * programa, semestre, curso y unidad.
 *
 * Recorre el repo igual que el validador (una carpeta es un OVA si tiene
 * index.html) y toma el nombre de cada enlace del <title> del propio OVA.
 *
 * Uso local:   node scripts/generar-enlaces.mjs
 *              node scripts/generar-enlaces.mjs --check   → no escribe; sale
 *                                                           con código 1 si el
 *                                                           archivo está viejo
 * En CI:       lo ejecuta .github/workflows/enlaces.yml en cada push a main y
 *              commitea el resultado si cambió.
 *
 * La salida es determinista: sin fechas ni nada que varíe entre ejecuciones,
 * para que CI solo commitee cuando de verdad cambió algo.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const SALIDA = join(ROOT, 'ENLACES-OVAS.md');
const BASE = 'https://uentucolegio.github.io/web-ovas';

const PROGRAMAS = [['tecnico', 'Técnico'], ['tecnologo', 'Tecnólogo']];
const IGNORAR = new Set(['_template', 'node_modules', 'scripts', '.git', '.github']);

// --- Unidades que NO se publican en el listado ------------------------------
// Vacía: hoy se listan todos los OVAs del repo.
// Para ocultar una unidad, agrega su ruta con el formato
// 'programa/semestre-N/unidad-N' (ej: 'tecnico/semestre-3/unidad-3').
const EXCLUIR = new Set([]);

// --- Nombre visible de cada carpeta de materia ------------------------------
// Si una materia no está aquí, se muestra su slug con guiones cambiados por
// espacios. Agrega las materias nuevas para que salgan con su nombre real.
const NOMBRES = {
  'tecnico/semestre-1': {
    'ingles-i': 'Inglés Técnico I',
    'aprendizaje-autonomo': 'Aprendizaje autónomo',
    'fundamentos-de-programacion': 'Fundamentos de programación',
    'habilidades-comunicativas-1': 'Habilidades comunicativas I',
    'matematica-basica': 'Matemática Básica',
    'introduccion-programacion-web': 'Introducción a la programación web',
  },
  'tecnico/semestre-2': {
    'ingles-ii': 'Inglés Técnico II',
    'estadistica-y-probabilidad': 'Estadística y probabilidad',
    'habilidades-comunicativas-2': 'Habilidades comunicativas II',
    'backend': 'Programación Web I – Backend',
    'base-de-datos': 'Base de datos',
    'diseno-interfaces-usuario-frontend': 'Diseño de interfaces de usuario – Frontend',
  },
  'tecnico/semestre-3': {
    'servicios-computacion-nube': 'Servicios de computación en la nube',
    'proyecto-web': 'Proyecto Web',
    'innovacion-emprendimiento-digital': 'Innovación y emprendimiento digital',
    'seguridad-aplicaciones-web': 'Seguridad en Aplicaciones Web',
    'backend-2': 'Programación Web II – Backend',
  },
  'tecnologo/semestre-1': {
    'algebra-lineal': 'Álgebra Lineal',
    'aprendizaje-autonomo': 'Aprendizaje autónomo',
    'arquitectura-sistemas': 'Arquitectura de sistemas de información',
    'competencias-comunicativas': 'Competencias comunicativas',
    'fundamentos-matematicos': 'Fundamentos matemáticos',
    'introduccion-logica-programacion': 'Introducción a la lógica de programación',
  },
  'tecnologo/semestre-2': {
    'base-de-datos-1': 'Base de datos 1',
    'electiva-libre-1-shell': 'Electiva libre 1',
    'estadistica': 'Estadística',
    'ingles-i': 'Inglés 1',
    'programacion-orientada-a-objetos': 'Programación orientada a objetos',
    'requerimientos-sistemas-informacion': 'Requerimientos de sistemas de información',
  },
};

// --- Recorrido --------------------------------------------------------------

/** Carpetas que son un OVA (tienen index.html), igual que en el validador. */
function encontrarOvas(dir, acc = []) {
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith('.') || IGNORAR.has(name)) continue;
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (existsSync(join(full, 'index.html'))) acc.push(full);
    else encontrarOvas(full, acc);
  }
  return acc;
}

/** Título del OVA, sin el prefijo "OVA:" y con los espacios colapsados. */
function tituloDe(dir) {
  try {
    const html = readFileSync(join(dir, 'index.html'), 'utf8');
    const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
    if (!m) return '';
    return m[1].replace(/\s+/g, ' ').trim().replace(/^\s*OVA\s*[:\-–]\s*/i, '').trim();
  } catch {
    return '';
  }
}

// --- Orden dentro de cada unidad -------------------------------------------
// Alfabético no es el orden pedagógico: "Adverbs of Frequency" quedaba antes
// que "Daily Routine Vocabulary" aunque se vea después. scripts/orden-ovas.json
// fija el orden real de las unidades que lo necesitan.
const ORDEN = (() => {
  const f = join(ROOT, 'scripts', 'orden-ovas.json');
  if (!existsSync(f)) return {};
  try {
    // Se quita el BOM: si alguien edita el archivo en Windows con Bloc de notas,
    // queda guardado con BOM y JSON.parse lo rechaza. Sin esto, el orden volvería
    // al alfabético sin que nadie lo note.
    const d = JSON.parse(readFileSync(f, 'utf8').replace(/^﻿/, ''));
    delete d._lee_esto;
    return d;
  } catch (e) {
    console.error(`⚠️  No se pudo leer orden-ovas.json (${e.message}). Se usa orden alfabético.`);
    return {};
  }
})();

const avisos = [];

/** Ordena los OVAs de una unidad: primero los que fija orden-ovas.json, luego
 *  el resto en orden alfabético. */
function ordenarUnidad(items, rutaUnidad) {
  const alfabetico = (a, b) => a.etiqueta.localeCompare(b.etiqueta, 'es');
  const deseado = ORDEN[rutaUnidad];
  if (!deseado) return [...items].sort(alfabetico);

  const porSlug = new Map(items.map((o) => [o.ova, o]));
  const ordenados = [];

  for (const slug of deseado) {
    if (porSlug.has(slug)) {
      ordenados.push(porSlug.get(slug));
      porSlug.delete(slug);
    } else {
      avisos.push(`${rutaUnidad}: "${slug}" está en orden-ovas.json pero esa carpeta no existe`);
    }
  }
  for (const sobrante of [...porSlug.values()].sort(alfabetico)) {
    avisos.push(`${rutaUnidad}: "${sobrante.ova}" no está en orden-ovas.json, va al final`);
    ordenados.push(sobrante);
  }
  return ordenados;
}

const ovas = [];
for (const [prog] of PROGRAMAS) {
  const base = join(ROOT, prog);
  if (!existsSync(base)) continue;
  for (const dir of encontrarOvas(base)) {
    const partes = relative(ROOT, dir).split(sep);
    if (partes.length !== 5) continue;            // fuera de la jerarquía estándar
    const [programa, semestre, materia, unidad, ova] = partes;
    if (EXCLUIR.has(`${programa}/${semestre}/${unidad}`)) continue;
    ovas.push({
      programa, semestre, materia, unidad, ova,
      titulo: tituloDe(dir),
      url: `${BASE}/${programa}/${semestre}/${materia}/${unidad}/${ova}/`,
    });
  }
}

// --- Nombres repetidos ------------------------------------------------------
// Varios OVAs quedaron con el <title> de otro al copiar la plantilla. Mientras
// eso no se corrija en el OVA, agregamos su carpeta entre paréntesis para que
// el enlace siga siendo distinguible.
const cuantos = new Map();
for (const o of ovas) if (o.titulo) cuantos.set(o.titulo, (cuantos.get(o.titulo) || 0) + 1);
for (const o of ovas) {
  if (!o.titulo) o.etiqueta = o.ova;
  else o.etiqueta = cuantos.get(o.titulo) > 1 ? `${o.titulo} (${o.ova})` : o.titulo;
}

// --- Armado del documento ---------------------------------------------------
const L = [
  '# Enlaces de los OVAs publicados',
  '',
  `Todos los OVAs están publicados en GitHub Pages sobre <${BASE}/>.`,
  'Cada enlace abre el OVA directamente en el navegador; no requiere descargar nada.',
  '',
  '> ⚙️ **Este archivo se genera solo.** Lo actualiza `scripts/generar-enlaces.mjs`',
  '> en cada push a `main`. No lo edites a mano: los cambios se perderían en la',
  '> siguiente actualización.',
  '',
];

if (EXCLUIR.size) {
  L.push('> No se incluyen estas unidades: ' + [...EXCLUIR].sort().map((e) => `\`${e}\``).join(', ') + '.', '');
}

const hayRepetidos = [...cuantos.values()].some((n) => n > 1);
if (hayRepetidos) {
  L.push(
    '> Cuando dos OVAs comparten el mismo título, se agrega entre paréntesis el',
    '> nombre de su carpeta para poder distinguirlos. Eso ocurre porque varios OVAs',
    '> quedaron con el `<title>` de otro al copiar la plantilla: la corrección de',
    '> fondo va en el `<title>` del OVA, no en este listado.',
    '',
  );
}

let total = 0;
for (const [prog, etiquetaPrograma] of PROGRAMAS) {
  const delPrograma = ovas.filter((o) => o.programa === prog);
  if (!delPrograma.length) continue;
  L.push(`## ${etiquetaPrograma}`, '');

  for (const sem of [...new Set(delPrograma.map((o) => o.semestre))].sort()) {
    L.push(`### ${sem.replace('semestre-', 'Semestre ')}`, '');

    const mapa = NOMBRES[`${prog}/${sem}`] || {};
    const materias = [...new Set(delPrograma.filter((o) => o.semestre === sem).map((o) => o.materia))]
      .map((slug) => ({ slug, nombre: mapa[slug] || slug.replace(/-/g, ' ') }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

    for (const { slug, nombre } of materias) {
      const delCurso = delPrograma.filter((o) => o.semestre === sem && o.materia === slug);
      total += delCurso.length;
      L.push(`#### ${nombre}  ·  ${delCurso.length} OVAs`, '');

      for (const uni of [...new Set(delCurso.map((o) => o.unidad))].sort()) {
        L.push(`**${uni.replace('unidad-', 'Unidad ')}**`, '');
        const items = ordenarUnidad(
          delCurso.filter((o) => o.unidad === uni),
          `${prog}/${sem}/${slug}/${uni}`,
        );
        for (const o of items) L.push(`- [${o.etiqueta}](${o.url})`);
        L.push('');
      }
    }
  }
}

L.push('---', '', `**${total} OVAs enlazados.**`, '');
const contenido = L.join('\n');

// --- Salida -----------------------------------------------------------------
const modoCheck = process.argv.includes('--check');
const anterior = existsSync(SALIDA) ? readFileSync(SALIDA, 'utf8') : null;

// Se comparan los saltos de línea normalizados. En Windows, con
// core.autocrlf=true, el archivo se descarga con CRLF mientras que aquí se
// escribe con LF: sin esto, el generador creería que está desactualizado
// siempre y reescribiría el archivo aunque el contenido fuera idéntico.
const sinCR = (t) => (t === null ? null : t.replace(/\r\n/g, '\n'));

// Desajustes entre orden-ovas.json y las carpetas que existen de verdad.
if (avisos.length) {
  console.warn(`\n⚠️  ${avisos.length} aviso(s) sobre el orden de los OVAs:`);
  for (const a of avisos) console.warn(`   · ${a}`);
  console.warn('   Revisa scripts/orden-ovas.json.\n');
}

if (sinCR(anterior) === contenido) {
  console.log(`✅ ENLACES-OVAS.md ya está al día (${total} OVAs).`);
  process.exit(0);
}

if (modoCheck) {
  console.error('🚫 ENLACES-OVAS.md está desactualizado.');
  console.error('   Ejecuta: node scripts/generar-enlaces.mjs');
  process.exit(1);
}

writeFileSync(SALIDA, contenido, 'utf8');
console.log(`✏️  ENLACES-OVAS.md actualizado: ${total} OVAs enlazados.`);
