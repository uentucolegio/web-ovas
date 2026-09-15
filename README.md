# 📚 Repositorio institucional de OVAs

Objetos Virtuales de Aprendizaje (OVAs) interactivos de los programas de formación **Técnico** y **Tecnólogo**. Cada OVA es una página web autónoma (HTML + Tailwind local + JavaScript) con contenido, gamificación y evaluación.

---

## 📁 Estructura

Los OVAs se organizan en una jerarquía fija de 5 niveles:

```
<repo>/
├── tecnico/                                  ← programa
│   └── semestre-3/                           ← semestre
│       └── servicios-computacion-nube/       ← materia
│           └── unidad-1/                      ← unidad
│               └── que-es-la-nube/            ← un OVA
│                   ├── index.html
│                   ├── tailwind.css
│                   └── img/
├── tecnologo/
├── _template/            ← plantilla oficial para nuevos OVAs
├── context.md           ← reglas detalladas para el agente de IA
├── CONTRIBUTING.md      ← cómo agregar un OVA (reglas obligatorias)
├── scripts/
│   └── validar-ova.mjs  ← validador automático de reglas
└── .github/             ← validación en cada PR + plantilla de PR + CODEOWNERS
```

---

## ➕ ¿Quieres agregar un OVA?

Lee **[`CONTRIBUTING.md`](CONTRIBUTING.md)**. En resumen:

1. Copia `_template/` a la ruta correcta (`programa/semestre-N/materia/unidad-N/ova/`).
2. Escribe el contenido y hornea el Tailwind local del OVA.
3. Valida en tu equipo: `node scripts/validar-ova.mjs`.
4. Abre un **Pull Request**. El validador automático y la revisión de un responsable son **obligatorios** para fusionar.

> Las reglas no son opcionales: un OVA que no las cumpla **no se puede fusionar**.

---

## 🔒 ¿Por qué las reglas se cumplen "sí o sí"?

1. **Protección de rama**: nadie hace push directo a `main`; todo entra por Pull Request.
2. **Validación automática** ([GitHub Actions](.github/workflows/validar.yml)): cada PR ejecuta `validar-ova.mjs`. Si un OVA no cumple, el check falla y el PR queda bloqueado.
3. **Revisión obligatoria** ([CODEOWNERS](.github/CODEOWNERS)): un responsable debe aprobar antes de fusionar.

---

## 👥 Créditos

**Centro de Innovación en TIC para el apoyo de la Docencia — CINTIA**
Universidad de Córdoba
