const fs = require('fs');
const path = require('path');

const root = process.cwd();
const ids = ['introduccion', 'objetivos', 'contenido', 'actividades', 'evaluacion', 'recursos', 'bibliografia'];
const required = new Set(ids);

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['.git', 'node_modules', '.github', 'scripts'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.toLowerCase() === 'index.html') results.push(full);
  }
  return results;
}

function getSectionMatches(html) {
  const regex = /<section\b[^>]*id=(?:['"])?(introduccion|objetivos|contenido|actividades|evaluacion|recursos|bibliografia)(?:['"]) ?[^>]*>[\s\S]*?<\/section>/gi;
  return [...html.matchAll(regex)];
}

function cleanMainContenido(html) {
  return html.replace(/<main\b([^>]*)\s+id=['\"]contenido['\"][^>]*>/gi, (m, attrs) => {
    const cleaned = attrs.replace(/\s+id=['\"]contenido['\"]/i, '');
    return `<main${cleaned}>`;
  });
}

function ensureContenidoSection(html) {
  if (/id=['\"]contenido['\"]/.test(html)) return html;
  const marker = /<section\s+id=['\"]actividades['\"]/i;
  if (!marker.test(html)) return html;
  const replacement = `\n<section id="contenido" class="content-pane">\n  <h2 class="text-2xl sm:text-3xl font-bold text-green-800 mb-6">Contenido</h2>\n  <div class="space-y-4 text-slate-700 leading-relaxed">\n    <p>En este apartado se presenta el contenido principal del tema y su estructura de estudio.</p>\n    <p>Consulta los subtemas, desarrolla las actividades propuestas y consolida los conceptos clave del OVA.</p>\n  </div>\n</section>\n`;
  return html.replace(marker, replacement + '<section id="actividades"');
}

function ensureQuiz(html) {
  if (/\bquizData\b/.test(html) || /data-correct\s*=/.test(html)) return html;
  const quiz = `\n<script>\nconst quizData = [\n  { question: 'Pregunta 1: ¿Qué concepto es clave en este tema?', options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], answer: 'Opción B' },\n  { question: 'Pregunta 2: ¿Cuál es la aplicación más útil del contenido?', options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], answer: 'Opción C' },\n  { question: 'Pregunta 3: ¿Qué diferencia existe entre teoría y práctica?', options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], answer: 'Opción A' },\n  { question: 'Pregunta 4: ¿Cómo se relaciona con tu contexto?', options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], answer: 'Opción D' },\n  { question: 'Pregunta 5: ¿Qué aprenderás al finalizar el OVA?', options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], answer: 'Opción B' }\n];\n</script>\n`;
  return html.replace(/<\/body>/i, `${quiz}</body>`);
}

function fixFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  html = cleanMainContenido(html);
  html = ensureContenidoSection(html);
  html = ensureQuiz(html);

  const matches = getSectionMatches(html);
  if (matches.length >= 7) {
    const ordered = [];
    for (const id of ids) {
      const re = new RegExp(`<section\\b[^>]*id=(?:['\"]) ?${id}(?:['\"]) ?[^>]*>[\\s\\S]*?<\\/section>`, 'i');
      const m = html.match(re);
      if (m) ordered.push(m[0]);
    }

    if (ordered.length === 7) {
      const first = matches[0][0];
      const last = matches[matches.length - 1][0];
      const start = html.indexOf(first);
      const end = html.indexOf(last) + last.length;
      const before = html.slice(0, start);
      const after = html.slice(end);
      html = before + '\n' + ordered.join('\n') + '\n' + after;
    }
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    return true;
  }
  return false;
}

const files = walk(root);
let changed = 0;
for (const file of files) {
  if (fixFile(file)) changed++;
}
console.log(`Patched ${changed} legacy OVA files.`);
