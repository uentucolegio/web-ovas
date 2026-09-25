const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 4,
});

const caseStudies = [
  {
    id: "grafica",
    shortLabel: "Grafica",
    title: "Caso 1. Incidencias entre frontend y backend",
    tag: "Metodo grafico",
    method: "Grafica",
    coefficients: [1, 1, 10, 1, -1, 2],
    narrative:
      "En una jornada de soporte se atendieron 10 incidencias entre frontend y backend. Ademas, frontend registro 2 incidencias mas que backend.",
    question:
      "¿Cuantas incidencias correspondieron a cada area y como se interpreta la interseccion de las rectas?",
    guideCards: [
      {
        title: "Variables",
        prompt: "Define las cantidades desconocidas.",
        detail: "x representa incidencias de frontend y y representa incidencias de backend.",
      },
      {
        title: "Ecuaciones",
        prompt: "¿Que restricciones aparecen?",
        detail: "La suma total es 10 y la diferencia entre ambas areas es 2.",
      },
      {
        title: "Lectura",
        prompt: "¿Que muestra la grafica?",
        detail: "El punto donde se cruzan las rectas entrega la unica solucion del sistema.",
      },
    ],
    resolutionText: `x + y = 10
x - y = 2
En la grafica, las rectas se cruzan en el punto (6, 4).`,
    decision:
      "El area frontend atendio 6 incidencias y backend atendio 4. El cruce entre las rectas confirma que ambas restricciones se satisfacen al mismo tiempo.",
    conclusion: "La grafica permite leer una solucion unica como punto de interseccion.",
    takeaway:
      "Es util cuando interesa interpretar visualmente el equilibrio entre dos cantidades relacionadas.",
  },
  {
    id: "sustitucion",
    shortLabel: "Sustitucion",
    title: "Caso 2. Venta de planes basicos y premium",
    tag: "Metodo por sustitucion",
    method: "Sustitucion",
    coefficients: [1, 1, 18, 5, 8, 120],
    narrative:
      "Una plataforma vendio 18 planes entre basicos y premium. El plan basico equivale a 50 unidades monetarias y el premium a 80, para un ingreso total de 1200 unidades monetarias.",
    question:
      "¿Cuantos planes de cada tipo se vendieron y por que la sustitucion es conveniente en este caso?",
    guideCards: [
      {
        title: "Variables",
        prompt: "¿Que representa cada variable?",
        detail: "x es el numero de planes basicos y y el numero de planes premium.",
      },
      {
        title: "Atajo",
        prompt: "¿Por que usar sustitucion?",
        detail: "La ecuacion x + y = 18 permite despejar rapido una variable: x = 18 - y.",
      },
      {
        title: "Lectura",
        prompt: "¿Como se interpreta la solucion?",
        detail: "La pareja ordenada indica cuantas unidades de cada plan explican exactamente el total vendido y el ingreso recibido.",
      },
    ],
    resolutionText: `x + y = 18
5x + 8y = 120
x = 18 - y
5(18 - y) + 8y = 120
90 - 5y + 8y = 120
3y = 30
y = 10
x = 8`,
    decision:
      "Se vendieron 8 planes basicos y 10 planes premium. La sustitucion simplifica el calculo porque una de las ecuaciones ya permite despejar una variable sin esfuerzo extra.",
    conclusion: "La sustitucion funciona bien cuando una variable puede aislarse con rapidez.",
    takeaway:
      "Es util para modelar ventas, asignacion de licencias y combinaciones de servicios con una restriccion total clara.",
  },
  {
    id: "reduccion",
    shortLabel: "Reduccion",
    title: "Caso 3. Horas de analista y tester",
    tag: "Metodo por reduccion",
    method: "Reduccion",
    coefficients: [2, 1, 11, 3, -1, 4],
    narrative:
      "En una iteracion se registraron horas de analista x y horas de tester y. Dos veces las horas de analista mas las de tester suman 11, mientras que tres veces las de analista menos las de tester suman 4.",
    question:
      "¿Cuantas horas correspondieron a cada rol y por que conviene eliminar una variable?",
    guideCards: [
      {
        title: "Patron",
        prompt: "¿Que observas en los coeficientes?",
        detail: "Las ecuaciones tienen y y -y, por lo que al sumarlas la variable y desaparece.",
      },
      {
        title: "Calculo",
        prompt: "¿Que sucede al sumar?",
        detail: "Se obtiene 5x = 15 y luego x = 3. Despues se reemplaza para encontrar y = 5.",
      },
      {
        title: "Lectura",
        prompt: "¿Que expresa la solucion?",
        detail: "La pareja ordenada resume la distribucion exacta de horas entre los dos roles.",
      },
    ],
    resolutionText: `2x + y = 11
3x - y = 4

5x = 15
x = 3

2(3) + y = 11
y = 5`,
    decision:
      "El equipo registro 3 horas de analista y 5 horas de tester. La reduccion fue el camino mas corto porque permitio eliminar y de inmediato.",
    conclusion: "La reduccion es eficaz cuando los coeficientes facilitan anular una variable.",
    takeaway:
      "Sirve para balances de tiempo, recursos, trafico o costos donde los coeficientes permiten combinar ecuaciones con facilidad.",
  },
  {
    id: "clasificacion",
    shortLabel: "Tipo",
    title: "Caso 4. Restricciones incompatibles de inventario",
    tag: "Clasificacion del sistema",
    method: "Analisis del tipo",
    coefficients: [1, 1, 4, 2, 2, 10],
    narrative:
      "Un reporte afirma que el total de modulos pendientes entre dos equipos es 4, pero otro reporte afirma que el doble de esas mismas cantidades suma 10.",
    question:
      "¿Es posible satisfacer ambas afirmaciones al mismo tiempo o el sistema es incompatible?",
    guideCards: [
      {
        title: "Comparacion",
        prompt: "¿Que ocurre si duplicas la primera ecuacion?",
        detail: "Se obtiene 2x + 2y = 8, que contradice la segunda ecuacion 2x + 2y = 10.",
      },
      {
        title: "Interpretacion",
        prompt: "¿Que significa la contradiccion?",
        detail: "No existe una pareja ordenada que cumpla simultaneamente ambas restricciones.",
      },
      {
        title: "Lectura",
        prompt: "¿Como se veria en la grafica?",
        detail: "Las rectas son paralelas y nunca se cruzan.",
      },
    ],
    resolutionText: `x + y = 4
2x + 2y = 10

Si duplicamos la primera ecuacion:
2x + 2y = 8

Como 8 != 10, el sistema es incompatible.`,
    decision:
      "El sistema no tiene solucion. Los datos son inconsistentes y deben revisarse porque describen restricciones que no pueden cumplirse a la vez.",
    conclusion: "Un sistema incompatible aparece cuando las ecuaciones se contradicen.",
    takeaway:
      "Es util para detectar errores en reportes, inventarios, presupuestos o reglas de negocio que no son coherentes entre si.",
  },
];

const quizQuestions = [
  {
    prompt: "¿Que describe un sistema de ecuaciones lineales?",
    options: [
      "Una sola ecuacion sin variables",
      "Un conjunto de restricciones sobre las mismas variables",
      "Una tabla de valores aleatorios",
      "Solo una funcion cuadratica",
    ],
    answer: 1,
    explanation:
      "Un sistema lineal expresa varias condiciones que deben cumplirse simultaneamente sobre las mismas variables.",
  },
  {
    prompt: "Si dos rectas se cortan en un solo punto, el sistema es:",
    options: ["SCI", "SI", "SCD", "Dependiente no lineal"],
    answer: 2,
    explanation:
      "Cuando dos rectas se intersectan una sola vez, existe una unica solucion y el sistema es compatible determinado.",
  },
  {
    prompt: "¿Cuando conviene usar sustitucion?",
    options: [
      "Cuando una variable puede despejarse facilmente",
      "Cuando no hay variables",
      "Cuando el sistema es cuadratico",
      "Cuando la grafica no tiene ejes",
    ],
    answer: 0,
    explanation:
      "La sustitucion es conveniente si una ecuacion ya deja una variable casi aislada.",
  },
  {
    prompt: "¿Que caracteriza a un sistema incompatible?",
    options: [
      "Tiene infinitas soluciones",
      "Tiene una unica solucion",
      "No tiene solucion",
      "Siempre usa tres variables",
    ],
    answer: 2,
    explanation:
      "Un sistema incompatible representa restricciones contradictorias y por eso no tiene solucion.",
  },
  {
    prompt: "Si x + y = 10 y x - y = 2, entonces x es:",
    options: ["4", "5", "6", "8"],
    answer: 2,
    explanation:
      "Al sumar las ecuaciones se obtiene 2x = 12, luego x = 6.",
  },
  {
    prompt: "El determinante del sistema 2x + y = 11 y 3x - y = 4 es:",
    options: ["5", "-5", "1", "-1"],
    answer: 1,
    explanation:
      "El determinante es 2(-1) - 1(3) = -5.",
  },
  {
    prompt: "Si dos ecuaciones son proporcionales y representan la misma recta, el sistema es:",
    options: ["SCI", "SCD", "SI", "Imposible de clasificar"],
    answer: 0,
    explanation:
      "Cuando ambas ecuaciones describen la misma recta, hay infinitas soluciones y el sistema es compatible indeterminado.",
  },
  {
    prompt: "¿Que paso nunca debe omitirse al final de un caso?",
    options: [
      "Interpretar la solucion en el contexto",
      "Borrar las variables",
      "Cambiar el signo de todas las ecuaciones",
      "Dibujar un triangulo",
    ],
    answer: 0,
    explanation:
      "Resolver no basta; tambien hay que explicar que significa la solucion dentro del problema original.",
  },
];

const typeLabCases = {
  interseccion: {
    title: "Sistema con una solucion",
    coefficients: [1, 1, 10, 1, -1, 2],
    note: "Las rectas se cruzan en un solo punto, por eso el sistema es SCD.",
  },
  coincidente: {
    title: "Sistema con infinitas soluciones",
    coefficients: [1, 1, 4, 2, 2, 8],
    note: "Una ecuacion es multiple de la otra, asi que ambas representan la misma recta.",
  },
  paralelo: {
    title: "Sistema sin solucion",
    coefficients: [1, 1, 4, 2, 2, 10],
    note: "Las rectas tienen la misma pendiente pero distinto termino independiente, por eso son paralelas.",
  },
  reduccion: {
    title: "Sistema apto para reduccion",
    coefficients: [2, 1, 11, 3, -1, 4],
    note: "Los coeficientes de y permiten eliminar esa variable al sumar las ecuaciones.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  bindPaneNavigation();
  syncInitialPane();
  initContentAccordions();
  enhanceStaticMathNotation();
  renderCaseStudies();
  setupClassificationActivity();
  setupConceptMatchActivity();
  setupSequenceActivity();
  setupOperationPractice();
  setupSystemLab();
  setupTypeLab();
  setupQuiz();
});

function bindPaneNavigation() {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const mobileNav = document.querySelector("#mobile-nav");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPane(link.dataset.target);
    });
  });

  if (mobileNav) {
    mobileNav.addEventListener("change", (event) => {
      showPane(event.target.value);
    });
  }
}

function syncInitialPane() {
  const targetId = window.location.hash.replace("#", "").trim();
  if (!targetId) {
    return;
  }

  if (document.getElementById(targetId)?.classList.contains("content-pane")) {
    showPane(targetId);
  }
}

function showPane(targetId) {
  document.querySelectorAll(".content-pane").forEach((pane) => {
    pane.classList.toggle("active", pane.id === targetId);
  });

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.target === targetId);
  });

  const mobileNav = document.querySelector("#mobile-nav");
  if (mobileNav && mobileNav.value !== targetId) {
    mobileNav.value = targetId;
  }

  if (window.location.hash !== `#${targetId}`) {
    window.history.replaceState(null, "", `#${targetId}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initContentAccordions() {
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger, index) => {
    const content = trigger.nextElementSibling;
    if (!content) {
      return;
    }

    if (index === 0) {
      trigger.classList.add("is-open");
      content.classList.remove("hidden");
    }

    trigger.addEventListener("click", () => {
      trigger.classList.toggle("is-open");
      content.classList.toggle("hidden");
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMathInline(value) {
  let html = escapeHtml(value);

  html = html.replace(/([A-Za-z])_\(([^)]+)\)/g, "$1<sub>$2</sub>");
  html = html.replace(/([A-Za-z])_([A-Za-z0-9]+)/g, "$1<sub>$2</sub>");
  html = html.replace(
    /(\([^()]+\)|[A-Za-z][A-Za-z0-9]*|\d+(?:[.,]\d+)?)\^\(([^)]+)\)/g,
    "$1<sup>$2</sup>",
  );
  html = html.replace(
    /(\([^()]+\)|[A-Za-z][A-Za-z0-9]*|\d+(?:[.,]\d+)?)\^([A-Za-z0-9+\-]+)/g,
    "$1<sup>$2</sup>",
  );

  return `<span class="math-inline">${html}</span>`;
}

function formatMathBlock(value) {
  return String(value)
    .split("\n")
    .map((line) => formatMathInline(line))
    .join("<br>");
}

function enhanceStaticMathNotation() {
  document.querySelectorAll(".concept-card code, .formula-box code").forEach((element) => {
    if (element.dataset.mathEnhanced === "true") {
      return;
    }

    element.innerHTML = formatMathBlock(element.textContent.trim());
    element.dataset.mathEnhanced = "true";
  });

  document
    .querySelectorAll(".rule-pill, .draggable, .practice-table tbody tr td:first-child")
    .forEach((element) => {
      if (element.dataset.mathEnhanced === "true") {
        return;
      }

      element.innerHTML = formatMathInline(element.textContent.trim());
      element.dataset.mathEnhanced = "true";
    });
}

function normalizeNumber(value) {
  const numeric = Number(value);
  if (Object.is(numeric, -0)) {
    return 0;
  }
  return numeric;
}

function formatNumber(value) {
  return numberFormatter.format(normalizeNumber(value));
}

function approximatelyZero(value, tolerance = 1e-9) {
  return Math.abs(value) <= tolerance;
}

function formatTerm(coefficient, variable, isFirst) {
  if (approximatelyZero(coefficient)) {
    return "";
  }

  const absolute = Math.abs(coefficient);
  const coefficientText = absolute === 1 ? "" : formatNumber(absolute);
  const term = `${coefficientText}${variable}`;

  if (isFirst) {
    return coefficient < 0 ? `-${term}` : term;
  }

  return coefficient < 0 ? `- ${term}` : `+ ${term}`;
}

function formatEquation(a, b, c) {
  const terms = [];
  const xTerm = formatTerm(a, "x", true);
  const yTerm = formatTerm(b, "y", xTerm === "");

  if (xTerm) {
    terms.push(xTerm);
  }
  if (yTerm) {
    terms.push(yTerm);
  }

  const leftSide = terms.length ? terms.join(" ") : "0";
  return `${leftSide} = ${formatNumber(c)}`;
}

function solveLinearSystem2x2(a, b, c, d, e, f) {
  const determinant = a * e - b * d;
  const determinantX = c * e - b * f;
  const determinantY = a * f - c * d;

  if (!approximatelyZero(determinant)) {
    return {
      determinant,
      determinantX,
      determinantY,
      hasUniqueSolution: true,
      typeCode: "SCD",
      typeLabel: "Compatible determinado",
      x: normalizeNumber(determinantX / determinant),
      y: normalizeNumber(determinantY / determinant),
    };
  }

  const proportional =
    approximatelyZero(a * e - b * d) &&
    approximatelyZero(a * f - c * d) &&
    approximatelyZero(b * f - c * e);

  return {
    determinant,
    determinantX,
    determinantY,
    hasUniqueSolution: false,
    typeCode: proportional ? "SCI" : "SI",
    typeLabel: proportional ? "Compatible indeterminado" : "Incompatible",
  };
}

function buildChipList(items) {
  if (!items.length) {
    return '<span class="text-slate-500 text-sm">Sin datos</span>';
  }

  return items
    .map(
      (item) => `
        <span class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-100 border border-green-200 text-sm font-semibold text-green-900">
          ${formatMathInline(item)}
        </span>
      `,
    )
    .join("");
}

function buildGuideCardsHtml(cards) {
  return `
    <div class="concept-card-grid">
      ${cards
        .map(
          (card) => `
            <article class="concept-card">
              <span class="eyebrow">Guia</span>
              <h4 class="font-bold text-green-800 mb-2">${escapeHtml(card.title)}</h4>
              <p class="text-slate-700 text-sm leading-relaxed">${formatMathInline(card.prompt)}</p>
              <p class="text-slate-600 text-sm leading-relaxed mt-3">${formatMathInline(card.detail)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildResultChips(result) {
  if (result.hasUniqueSolution) {
    return buildChipList([
      result.typeCode,
      `x = ${formatNumber(result.x)}`,
      `y = ${formatNumber(result.y)}`,
    ]);
  }

  return buildChipList([result.typeCode, result.typeLabel.toLowerCase()]);
}

function buildCaseStudyHtml(caseStudy) {
  const [a, b, c, d, e, f] = caseStudy.coefficients;
  const result = solveLinearSystem2x2(a, b, c, d, e, f);
  const equations = [formatEquation(a, b, c), formatEquation(d, e, f)];
  const systemSummary = [
    `Metodo: ${caseStudy.method}`,
    `Det = ${formatNumber(result.determinant)}`,
    result.typeCode,
  ];

  if (result.hasUniqueSolution) {
    systemSummary.push(`(${formatNumber(result.x)}, ${formatNumber(result.y)})`);
  }

  return `
    <div class="module-intro">
      <article class="sub-panel">
        <div class="card-title-row">
          <h3>${escapeHtml(caseStudy.title)}</h3>
          <span class="status-pill">${escapeHtml(caseStudy.tag)}</span>
        </div>
        <p class="text-slate-700">${escapeHtml(caseStudy.narrative)}</p>
        <div class="mt-4 concept-card-grid">
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Ecuacion 1</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${formatMathInline(equations[0])}</p>
          </article>
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Ecuacion 2</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${formatMathInline(equations[1])}</p>
          </article>
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Metodo</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${escapeHtml(caseStudy.method)}</p>
          </article>
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Tipo de sistema</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${escapeHtml(result.typeLabel)}</p>
          </article>
        </div>
        <div class="formula-box">
          <code>${formatMathBlock(caseStudy.resolutionText)}</code>
        </div>
      </article>

      <aside class="note-card">
        <strong>Pregunta del caso</strong>
        <p>${escapeHtml(caseStudy.question)}</p>
        <strong class="mt-4 block">Resultado clave</strong>
        <div class="flex flex-wrap gap-2 mt-2">
          ${buildResultChips(result)}
        </div>
      </aside>
    </div>

    ${buildGuideCardsHtml(caseStudy.guideCards)}

    <div class="duo-grid mt-4">
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Interpretacion</h4>
          <span class="status-pill">${escapeHtml(result.typeCode)}</span>
        </div>
        <div class="insight-stack">
          <div class="insight-block">
            <span>Decision</span>
            <strong>${escapeHtml(caseStudy.conclusion)}</strong>
            <p>${escapeHtml(caseStudy.decision)}</p>
          </div>
          <div class="insight-block">
            <span>Aplicacion</span>
            <strong>Uso en contexto</strong>
            <p>${escapeHtml(caseStudy.takeaway)}</p>
          </div>
        </div>
      </article>

      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Sistema analizado</h4>
          <span class="status-pill">${escapeHtml(caseStudy.method)}</span>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          ${buildChipList(systemSummary)}
        </div>
        <div class="formula-box">
          <code>${formatMathBlock(`${equations[0]}
${equations[1]}`)}</code>
        </div>
      </article>
    </div>
  `;
}

function renderCaseStudies() {
  const tabContainer = document.querySelector("#case-study-switcher");
  const moduleContainer = document.querySelector("#case-study-viewer");

  if (!tabContainer || !moduleContainer) {
    return;
  }

  tabContainer.innerHTML = caseStudies
    .map(
      (caseStudy, index) => `
        <button
          class="case-tab ${index === 0 ? "active" : ""}"
          type="button"
          data-case-target="case-module-${caseStudy.id}"
        >
          ${escapeHtml(caseStudy.shortLabel)}
        </button>
      `,
    )
    .join("");

  moduleContainer.innerHTML = caseStudies
    .map(
      (caseStudy, index) => `
        <div id="case-module-${caseStudy.id}" class="case-module ${index === 0 ? "active" : ""}">
          ${buildCaseStudyHtml(caseStudy)}
        </div>
      `,
    )
    .join("");

  bindCaseTabs();
}

function bindCaseTabs() {
  const tabs = document.querySelectorAll(".case-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.caseTarget;

      tabs.forEach((item) => {
        item.classList.toggle("active", item === tab);
      });

      document.querySelectorAll(".case-module").forEach((module) => {
        module.classList.toggle("active", module.id === target);
      });
    });
  });
}

function showFeedback(element, message) {
  if (!element) {
    return;
  }

  element.innerHTML = message;
  element.classList.add("is-visible");
}

function clearFeedback(element) {
  if (!element) {
    return;
  }

  element.classList.remove("is-visible");
  element.innerHTML = "";
}

function setupDragSortActivity({
  poolSelector,
  zoneSelector,
  feedbackSelector,
  checkSelector,
  resetSelector,
  successMessage,
  incompleteMessage,
  partialMessage,
}) {
  const pool = document.querySelector(poolSelector);
  const cards = Array.from(document.querySelectorAll(`${poolSelector} .draggable`));
  const zones = Array.from(document.querySelectorAll(zoneSelector));
  const feedback = document.querySelector(feedbackSelector);
  const checkButton = document.querySelector(checkSelector);
  const resetButton = document.querySelector(resetSelector);

  if (!pool || !feedback || !checkButton || !resetButton || cards.length === 0) {
    return;
  }

  let draggedCard = null;
  let selectedCard = null;

  function clearSelection() {
    cards.forEach((card) => card.classList.remove("is-selected"));
    selectedCard = null;
  }

  function moveCardToZone(zone, card) {
    const dropItems = zone.querySelector(".drop-items");
    if (!dropItems || !card) {
      return;
    }

    dropItems.appendChild(card);
    clearSelection();
  }

  cards.forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      draggedCard = event.target;
      setTimeout(() => {
        event.target.style.display = "none";
      }, 0);
    });

    card.addEventListener("dragend", (event) => {
      setTimeout(() => {
        event.target.style.display = "";
        draggedCard = null;
      }, 0);
    });

    card.addEventListener("click", () => {
      if (selectedCard === card) {
        clearSelection();
        return;
      }

      clearSelection();
      selectedCard = card;
      card.classList.add("is-selected");
    });
  });

  zones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("hovered");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("hovered");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("hovered");
      moveCardToZone(zone, draggedCard);
    });

    zone.addEventListener("click", () => {
      if (selectedCard) {
        moveCardToZone(zone, selectedCard);
      }
    });
  });

  checkButton.addEventListener("click", () => {
    const placedCards = zones.flatMap((zone) =>
      Array.from(zone.querySelectorAll(".draggable")),
    );

    if (placedCards.length < cards.length) {
      showFeedback(feedback, incompleteMessage);
      return;
    }

    const correct = placedCards.filter((card) => {
      const zone = card.closest(zoneSelector);
      return zone && zone.dataset.category === card.dataset.category;
    }).length;

    if (correct === cards.length) {
      showFeedback(feedback, successMessage);
      return;
    }

    showFeedback(feedback, partialMessage(correct, cards.length));
  });

  resetButton.addEventListener("click", () => {
    cards.forEach((card) => pool.appendChild(card));
    clearSelection();
    clearFeedback(feedback);
  });
}

function setupClassificationActivity() {
  setupDragSortActivity({
    poolSelector: "#classification-cards",
    zoneSelector: ".classification-zone",
    feedbackSelector: "#feedback-classification",
    checkSelector: "#check-classification",
    resetSelector: "#reset-classification",
    successMessage:
      "Excelente. Diferenciaste correctamente ecuaciones, metodos y tipos de sistema.",
    incompleteMessage: "Ubica todas las tarjetas antes de verificar la actividad.",
    partialMessage: (correct, total) =>
      `Obtuviste ${correct} de ${total} tarjetas correctas. Revisa si el elemento es una ecuacion, un metodo o una clasificacion del sistema.`,
  });
}

function setupConceptMatchActivity() {
  setupDragSortActivity({
    poolSelector: "#connector-cards",
    zoneSelector: ".connector-zone",
    feedbackSelector: "#feedback-connectors",
    checkSelector: "#check-connectors",
    resetSelector: "#reset-connectors",
    successMessage:
      "Muy bien. Relacionaste correctamente cada situacion con el metodo mas apropiado.",
    incompleteMessage: "Ubica todas las tarjetas antes de verificar la actividad.",
    partialMessage: (correct, total) =>
      `Tienes ${correct} de ${total} relaciones correctas. Revisa si el caso pide graficar, despejar, eliminar o clasificar el sistema.`,
  });
}

function setupSequenceActivity() {
  const fields = Array.from(document.querySelectorAll(".sequence-field")).filter((field) =>
    field.id.startsWith("sequence-"),
  );
  const checkButton = document.querySelector("#check-sequence");
  const resetButton = document.querySelector("#reset-sequence");
  const feedback = document.querySelector("#sequence-feedback");

  if (!fields.length || !checkButton || !resetButton || !feedback) {
    return;
  }

  checkButton.addEventListener("click", () => {
    const values = fields.map((field) => field.value);

    if (values.some((value) => value === "")) {
      showFeedback(feedback, "Completa todos los pasos antes de verificar la secuencia.");
      return;
    }

    if (new Set(values).size !== fields.length) {
      showFeedback(feedback, "Cada numero del 1 al 5 debe usarse una sola vez.");
      return;
    }

    const correct = fields.filter((field) => field.value === field.dataset.answer).length;
    if (correct === fields.length) {
      showFeedback(
        feedback,
        "Muy bien. Ordenaste correctamente la metodologia para resolver el sistema del caso.",
      );
      return;
    }

    showFeedback(
      feedback,
      `Tienes ${correct} de ${fields.length} pasos correctos. Revisa el orden desde las variables hasta la interpretacion final.`,
    );
  });

  resetButton.addEventListener("click", () => {
    fields.forEach((field) => {
      field.value = "";
    });
    clearFeedback(feedback);
  });
}

function setupOperationPractice() {
  const fields = Array.from(document.querySelectorAll(".result-field"));
  const checkButton = document.querySelector("#check-results");
  const resetButton = document.querySelector("#reset-results");
  const feedback = document.querySelector("#results-feedback");

  if (!fields.length || !checkButton || !resetButton || !feedback) {
    return;
  }

  checkButton.addEventListener("click", () => {
    if (fields.some((field) => field.value === "")) {
      showFeedback(feedback, "Completa todas las respuestas antes de verificar.");
      return;
    }

    const correct = fields.filter((field) => field.value === field.dataset.answer).length;
    if (correct === fields.length) {
      showFeedback(
        feedback,
        "Correcto. Interpretaste bien soluciones, tipos de sistema y determinantes basicos.",
      );
      return;
    }

    showFeedback(
      feedback,
      `Tienes ${correct} de ${fields.length} respuestas correctas. Revisa el procedimiento de resolucion y la clasificacion del sistema.`,
    );
  });

  resetButton.addEventListener("click", () => {
    fields.forEach((field) => {
      field.value = "";
    });
    clearFeedback(feedback);
  });
}

function buildSystemLabHtml(a, b, c, d, e, f) {
  const result = solveLinearSystem2x2(a, b, c, d, e, f);
  const equationOne = formatEquation(a, b, c);
  const equationTwo = formatEquation(d, e, f);

  let formulaText = `Sistema:
${equationOne}
${equationTwo}

Det = ae - bd = (${formatNumber(a)} * ${formatNumber(e)}) - (${formatNumber(b)} * ${formatNumber(d)}) = ${formatNumber(result.determinant)}`;

  if (result.hasUniqueSolution) {
    formulaText += `
Dx = ce - bf = (${formatNumber(c)} * ${formatNumber(e)}) - (${formatNumber(b)} * ${formatNumber(f)}) = ${formatNumber(result.determinantX)}
Dy = af - cd = (${formatNumber(a)} * ${formatNumber(f)}) - (${formatNumber(c)} * ${formatNumber(d)}) = ${formatNumber(result.determinantY)}
x = Dx / Det = ${formatNumber(result.x)}
y = Dy / Det = ${formatNumber(result.y)}`;
  } else if (result.typeCode === "SCI") {
    formulaText += `
Det = 0 y las ecuaciones son proporcionales.
El sistema tiene infinitas soluciones.`;
  } else {
    formulaText += `
Det = 0 pero las ecuaciones no son proporcionales.
El sistema no tiene solucion.`;
  }

  return `
    <div class="duo-grid">
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Resolucion del sistema</h4>
          <span class="status-pill">${escapeHtml(result.typeCode)}</span>
        </div>
        <div class="formula-box">
          <code>${formatMathBlock(formulaText)}</code>
        </div>
      </article>
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Lectura del resultado</h4>
          <span class="status-pill">Interpretacion</span>
        </div>
        <div class="insight-stack">
          <div class="insight-block">
            <span>Tipo de sistema</span>
            <strong>${escapeHtml(result.typeLabel)}</strong>
            <p>${escapeHtml(result.hasUniqueSolution ? "Existe una unica pareja ordenada que satisface ambas ecuaciones." : result.typeCode === "SCI" ? "Las dos ecuaciones representan la misma recta." : "Las restricciones son contradictorias y no se cruzan.")}</p>
          </div>
          <div class="insight-block">
            <span>Resultado</span>
            <strong>${escapeHtml(result.hasUniqueSolution ? `(${formatNumber(result.x)}, ${formatNumber(result.y)})` : result.typeCode)}</strong>
            <p>${escapeHtml(result.hasUniqueSolution ? "La pareja ordenada resuelve simultaneamente el sistema." : "La clasificacion del sistema es la respuesta mas importante en este caso.")}</p>
          </div>
        </div>
      </article>
    </div>
  `;
}

function setupSystemLab() {
  const aField = document.querySelector("#system-lab-a");
  const bField = document.querySelector("#system-lab-b");
  const cField = document.querySelector("#system-lab-c");
  const dField = document.querySelector("#system-lab-d");
  const eField = document.querySelector("#system-lab-e");
  const fField = document.querySelector("#system-lab-f");
  const button = document.querySelector("#system-lab-generate");
  const status = document.querySelector("#system-lab-status");
  const output = document.querySelector("#system-lab-output");

  if (
    !aField ||
    !bField ||
    !cField ||
    !dField ||
    !eField ||
    !fField ||
    !button ||
    !status ||
    !output
  ) {
    return;
  }

  function render() {
    const values = [aField, bField, cField, dField, eField, fField].map((field) =>
      Number(field.value),
    );

    if (values.some((value) => Number.isNaN(value))) {
      status.textContent = "Ingresa valores validos";
      output.innerHTML =
        '<div class="feedback-box is-visible">Usa coeficientes numericos validos para las dos ecuaciones del sistema.</div>';
      return;
    }

    output.innerHTML = buildSystemLabHtml(...values);
    status.textContent = "Sistema resuelto";
  }

  button.addEventListener("click", render);
  render();
}

function buildTypeLabHtml(caseKey) {
  const selectedCase = typeLabCases[caseKey];
  const [a, b, c, d, e, f] = selectedCase.coefficients;
  const result = solveLinearSystem2x2(a, b, c, d, e, f);
  const equationOne = formatEquation(a, b, c);
  const equationTwo = formatEquation(d, e, f);

  return `
    <div class="duo-grid">
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>${escapeHtml(selectedCase.title)}</h4>
          <span class="status-pill">${escapeHtml(result.typeCode)}</span>
        </div>
        <div class="concept-card-grid">
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Ecuacion 1</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${formatMathInline(equationOne)}</p>
          </article>
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Ecuacion 2</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${formatMathInline(equationTwo)}</p>
          </article>
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Determinante</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${formatMathInline(`Det = ${formatNumber(result.determinant)}`)}</p>
          </article>
          <article class="concept-card">
            <h4 class="font-bold text-green-800 mb-2">Clasificacion</h4>
            <p class="text-slate-700 text-sm leading-relaxed">${escapeHtml(result.typeLabel)}</p>
          </article>
        </div>
      </article>
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Lectura del comportamiento</h4>
          <span class="status-pill">Tipo</span>
        </div>
        <div class="insight-stack">
          <div class="insight-block">
            <span>Explicacion</span>
            <strong>${escapeHtml(result.typeCode)}</strong>
            <p>${escapeHtml(selectedCase.note)}</p>
          </div>
          <div class="insight-block">
            <span>Resultado</span>
            <strong>${escapeHtml(result.hasUniqueSolution ? `(${formatNumber(result.x)}, ${formatNumber(result.y)})` : result.typeLabel)}</strong>
            <p>${escapeHtml(result.hasUniqueSolution ? "Existe una pareja ordenada unica." : result.typeCode === "SCI" ? "Existen infinitas parejas ordenadas que satisfacen el sistema." : "No existe una pareja ordenada comun.")}</p>
          </div>
        </div>
      </article>
    </div>
  `;
}

function setupTypeLab() {
  const ruleField = document.querySelector("#type-lab-rule");
  const button = document.querySelector("#type-lab-generate");
  const status = document.querySelector("#type-lab-status");
  const output = document.querySelector("#type-lab-output");

  if (!ruleField || !button || !status || !output) {
    return;
  }

  function render() {
    output.innerHTML = buildTypeLabHtml(ruleField.value);
    status.textContent = "Exploracion generada";
  }

  button.addEventListener("click", render);
  render();
}

function setupQuiz() {
  const container = document.querySelector("#quiz-questions");
  const checkButton = document.querySelector("#check-quiz");
  const resetButton = document.querySelector("#reset-quiz");
  const feedback = document.querySelector("#quiz-feedback");

  if (!container || !checkButton || !resetButton || !feedback) {
    return;
  }

  container.innerHTML = quizQuestions
    .map(
      (question, questionIndex) => `
        <div class="question-card">
          <h4>${questionIndex + 1}. ${formatMathInline(question.prompt)}</h4>
          <div class="option-list">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <label class="quiz-option" data-question="${questionIndex}" data-option="${optionIndex}">
                    <input type="radio" name="quiz-${questionIndex}" value="${optionIndex}" />
                    <span>${formatMathInline(option)}</span>
                  </label>
                `,
              )
              .join("")}
          </div>
        </div>
      `,
    )
    .join("");

  const optionLabels = Array.from(document.querySelectorAll(".quiz-option"));
  optionLabels.forEach((label) => {
    label.addEventListener("change", () => {
      const questionIndex = label.dataset.question;
      optionLabels
        .filter((item) => item.dataset.question === questionIndex)
        .forEach((item) => item.classList.remove("selected"));
      label.classList.add("selected");
    });
  });

  checkButton.addEventListener("click", () => {
    const chosenAnswers = quizQuestions.map((_, index) => {
      const checked = document.querySelector(`input[name="quiz-${index}"]:checked`);
      return checked ? Number(checked.value) : null;
    });

    if (chosenAnswers.some((answer) => answer === null)) {
      showFeedback(feedback, "Responde todas las preguntas antes de calificar la evaluacion.");
      return;
    }

    optionLabels.forEach((label) => {
      label.classList.remove("correct", "incorrect");
    });

    let score = 0;
    const explanations = [];

    quizQuestions.forEach((question, index) => {
      const chosen = chosenAnswers[index];
      const labels = optionLabels.filter((label) => Number(label.dataset.question) === index);

      labels.forEach((label) => {
        const optionIndex = Number(label.dataset.option);
        if (optionIndex === question.answer) {
          label.classList.add("correct");
        }
        if (optionIndex === chosen && chosen !== question.answer) {
          label.classList.add("incorrect");
        }
      });

      if (chosen === question.answer) {
        score += 1;
      } else {
        explanations.push(
          `<li><strong>Pregunta ${index + 1}:</strong> ${formatMathInline(question.explanation)}</li>`,
        );
      }
    });

    showFeedback(
      feedback,
      `
        <p><strong>Resultado:</strong> ${score} de ${quizQuestions.length} respuestas correctas.</p>
        ${
          explanations.length
            ? `<ul class="mt-3 space-y-2">${explanations.join("")}</ul>`
            : '<p class="mt-3">Excelente. Dominas la formulacion y resolucion de sistemas lineales.</p>'
        }
      `,
    );
  });

  resetButton.addEventListener("click", () => {
    document.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.checked = false;
    });
    optionLabels.forEach((label) => {
      label.classList.remove("selected", "correct", "incorrect");
    });
    clearFeedback(feedback);
  });
}
