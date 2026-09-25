const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 3,
});

const caseStudies = [
  {
    id: "reales",
    shortLabel: "Reales",
    title: "Caso 1. Promedio de tiempos de respuesta",
    tag: "Cerradura en R",
    narrative:
      "Un equipo de desarrollo analiza los tiempos de respuesta de una API: 120.5 ms, 98.2 ms y 110.1 ms. Necesita saber si el promedio sigue siendo un numero real y por que.",
    infoCards: [
      {
        title: "Datos observados",
        body: "120.5, 98.2 y 110.1 son mediciones reales obtenidas de pruebas de rendimiento.",
      },
      {
        title: "Pregunta",
        body: "¿El promedio de esos valores permanece dentro del conjunto de los reales?",
      },
      {
        title: "Idea clave",
        body: "La suma y la division por un numero distinto de cero conservan resultados reales.",
      },
    ],
    formulaText: `Promedio = (120.5 + 98.2 + 110.1) / 3
= 328.8 / 3
= 109.6`,
    resultLabel: "Resultado del caso",
    resultItems: ["109.6", "real", "promedio valido"],
    guideCards: [
      {
        title: "Tipo de numero",
        prompt: "¿Que clase de datos hay en el caso?",
        detail: "Son mediciones decimales, por tanto pertenecen al conjunto de los reales.",
      },
      {
        title: "Propiedad",
        prompt: "¿Que propiedad se observa?",
        detail: "Cerradura: operar con reales mantiene el resultado en R.",
      },
      {
        title: "Lectura",
        prompt: "¿Que permite concluir el promedio?",
        detail: "Que el analisis estadistico se mantiene en el dominio de los reales.",
      },
    ],
    decision:
      "El promedio es 109.6 y sigue siendo real porque se obtuvo a partir de operaciones validas dentro de R.",
    conclusion: "La cerradura mantiene coherencia numerica en calculos reales.",
    takeaway:
      "Esta propiedad es esencial cuando se promedian metricas, tiempos o costos en contextos de software.",
  },
  {
    id: "propiedades",
    shortLabel: "Propiedades",
    title: "Caso 2. Distribucion de costo por servicio",
    tag: "Distributiva",
    narrative:
      "Se desplegaran 6 servicios y cada uno tiene un costo base de 12 unidades mas 3 unidades de monitoreo. El equipo quiere reorganizar el calculo total para explicarlo mejor.",
    infoCards: [
      {
        title: "Expresion inicial",
        body: "6(12 + 3) representa el costo de 6 servicios con dos componentes por cada uno.",
      },
      {
        title: "Pregunta",
        body: "¿Como reescribir la expresion sin cambiar su valor?",
      },
      {
        title: "Idea clave",
        body: "La propiedad distributiva permite repartir el 6 sobre cada termino del parentesis.",
      },
    ],
    formulaText: `6(12 + 3) = 6·12 + 6·3
= 72 + 18
= 90`,
    resultLabel: "Resultado del caso",
    resultItems: ["90", "distributiva", "reorganizacion valida"],
    guideCards: [
      {
        title: "Estructura",
        prompt: "¿Que se observa en la expresion?",
        detail: "Un producto multiplicando una suma entre parentesis.",
      },
      {
        title: "Propiedad",
        prompt: "¿Que propiedad transforma la expresion?",
        detail: "La distributiva, porque reparte el factor comun en cada sumando.",
      },
      {
        title: "Uso",
        prompt: "¿Para que sirve en el caso?",
        detail: "Para separar componentes de costo sin alterar el total final.",
      },
    ],
    decision:
      "El costo total sigue siendo 90, pero la distributiva permite explicarlo como suma de costos parciales.",
    conclusion: "La distributiva facilita expansion y lectura de expresiones.",
    takeaway:
      "En software se usa para descomponer costos, tamanos, cargas o conteos agregados.",
  },
  {
    id: "complejos",
    shortLabel: "Complejos",
    title: "Caso 3. Ecuacion sin solucion real",
    tag: "Extension a C",
    narrative:
      "Durante una modelacion simbolica aparece la ecuacion x² + 1 = 0. En los reales no existe ningun numero cuyo cuadrado sea -1, por lo que se requiere extender el sistema numerico.",
    infoCards: [
      {
        title: "Problema",
        body: "x² = -1 no tiene solucion en R porque todo cuadrado real es mayor o igual que cero.",
      },
      {
        title: "Extension",
        body: "Se introduce la unidad imaginaria i, definida por i² = -1.",
      },
      {
        title: "Resultado",
        body: "La ecuacion tiene soluciones x = i y x = -i dentro del conjunto de los complejos.",
      },
    ],
    formulaText: `x² + 1 = 0
x² = -1
x = ±i`,
    resultLabel: "Resultado del caso",
    resultItems: ["i", "-i", "complejos"],
    guideCards: [
      {
        title: "Limite de R",
        prompt: "¿Por que no basta con los reales?",
        detail: "Porque no existe numero real cuyo cuadrado sea -1.",
      },
      {
        title: "Nuevo numero",
        prompt: "¿Que se introduce?",
        detail: "La unidad imaginaria i para extender el sistema hacia C.",
      },
      {
        title: "Interpretacion",
        prompt: "¿Que gana el modelo?",
        detail: "Capacidad para resolver ecuaciones y representar comportamientos mas amplios.",
      },
    ],
    decision:
      "La solucion requiere complejos porque la estructura de R no alcanza para este tipo de ecuaciones.",
    conclusion: "Los complejos amplian el rango de problemas resolubles.",
    takeaway:
      "Son utiles en algebra, senales, control, graficos y modelado matematico avanzado.",
  },
  {
    id: "conjugado",
    shortLabel: "Conjugado",
    title: "Caso 4. Magnitud de una senal compleja",
    tag: "Conjugado y modulo",
    narrative:
      "Una senal se representa como z = 3 - 4i. El equipo necesita hallar su conjugado y su modulo para interpretar direccion y magnitud.",
    infoCards: [
      {
        title: "Numero complejo",
        body: "z = 3 - 4i tiene parte real 3 y parte imaginaria -4.",
      },
      {
        title: "Conjugado",
        body: "Cambiar el signo imaginario produce z̄ = 3 + 4i.",
      },
      {
        title: "Modulo",
        body: "|z| = √(3² + (-4)²) = √25 = 5.",
      },
    ],
    formulaText: `z = 3 - 4i
z̄ = 3 + 4i
|z| = √(3² + (-4)²) = 5`,
    resultLabel: "Resultado del caso",
    resultItems: ["3 + 4i", "5", "magnitud"],
    guideCards: [
      {
        title: "Conjugado",
        prompt: "¿Que cambia en z̄?",
        detail: "Solo cambia el signo de la parte imaginaria.",
      },
      {
        title: "Modulo",
        prompt: "¿Que expresa |z|?",
        detail: "La distancia del punto complejo al origen del plano.",
      },
      {
        title: "Uso",
        prompt: "¿Para que sirve en el caso?",
        detail: "Para separar direccion algebraica y magnitud de la senal.",
      },
    ],
    decision:
      "El conjugado es 3 + 4i y el modulo es 5, lo que resume de forma clara la informacion de la senal.",
    conclusion: "Conjugado y modulo son lecturas complementarias de un mismo complejo.",
    takeaway:
      "Estas herramientas aparecen en procesamiento de senales, fasores y representaciones geometricas.",
  },
];

const quizQuestions = [
  {
    prompt: "¿Que conjunto incluye racionales e irracionales?",
    options: ["Z", "Q", "R", "C"],
    answer: 2,
    explanation:
      "Los reales incluyen tanto los numeros racionales como los irracionales.",
  },
  {
    prompt: "¿Que propiedad se expresa en a + b = b + a?",
    options: ["Asociativa", "Conmutativa", "Distributiva", "Cerradura"],
    answer: 1,
    explanation:
      "La conmutativa indica que el orden de los sumandos no altera el resultado.",
  },
  {
    prompt: "¿Que propiedad permite escribir 5(x + 2) como 5x + 10?",
    options: ["Distributiva", "Conmutativa", "Identidad", "Cerradura"],
    answer: 0,
    explanation:
      "La distributiva reparte el producto sobre cada termino de la suma.",
  },
  {
    prompt: "¿Que forma general tiene un numero complejo?",
    options: ["a/b", "a + bi", "a² + b²", "|a - b|"],
    answer: 1,
    explanation:
      "Todo numero complejo se representa en forma binomica como a + bi.",
  },
  {
    prompt: "¿Cuanto vale i²?",
    options: ["1", "0", "-1", "2"],
    answer: 2,
    explanation:
      "La unidad imaginaria se define precisamente por la identidad i² = -1.",
  },
  {
    prompt: "¿Cual es el conjugado de 2 - 5i?",
    options: ["-2 + 5i", "2 + 5i", "2 - 5i", "-2 - 5i"],
    answer: 1,
    explanation:
      "El conjugado conserva la parte real y cambia el signo de la parte imaginaria.",
  },
  {
    prompt: "¿Cual es el modulo de 3 + 4i?",
    options: ["7", "1", "5", "25"],
    answer: 2,
    explanation:
      "El modulo es √(3² + 4²) = √25 = 5.",
  },
  {
    prompt: "¿Por que se necesitan numeros complejos?",
    options: [
      "Para ordenar todos los numeros",
      "Para evitar el uso de fracciones",
      "Para resolver problemas sin solucion en R",
      "Para convertir enteros en irracionales",
    ],
    answer: 2,
    explanation:
      "Los complejos extienden a los reales y permiten resolver ecuaciones que en R no tienen solucion.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  bindPaneNavigation();
  syncInitialPane();
  initContentAccordions();
  renderCaseStudies();
  setupClassificationActivity();
  setupConceptMatchActivity();
  setupSequenceActivity();
  setupOperationPractice();
  setupRealLab();
  setupComplexLab();
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

function formatNumber(value) {
  return numberFormatter.format(normalizeNumber(value));
}

function normalizeNumber(value) {
  const numeric = Number(value);
  if (Object.is(numeric, -0)) {
    return 0;
  }
  return numeric;
}

function buildChipList(items) {
  if (!items.length) {
    return '<span class="text-slate-500 text-sm">Sin datos</span>';
  }

  return items
    .map(
      (item) => `
        <span class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-100 border border-green-200 text-sm font-semibold text-green-900">
          ${escapeHtml(item)}
        </span>
      `,
    )
    .join("");
}

function buildInfoCardsHtml(cards) {
  return `
    <div class="concept-card-grid">
      ${cards
        .map(
          (card) => `
            <article class="concept-card">
              <h4 class="font-bold text-green-800 mb-2">${escapeHtml(card.title)}</h4>
              <p class="text-slate-700 text-sm leading-relaxed">${escapeHtml(card.body)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
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
              <p class="text-slate-700 text-sm leading-relaxed">${escapeHtml(card.prompt)}</p>
              <p class="text-slate-600 text-sm leading-relaxed mt-3">${escapeHtml(card.detail)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildCaseHtml(caseStudy) {
  return `
    <div class="module-intro">
      <article class="sub-panel">
        <div class="card-title-row">
          <h3>${escapeHtml(caseStudy.title)}</h3>
          <span class="status-pill">${escapeHtml(caseStudy.tag)}</span>
        </div>
        <p class="text-slate-700">${escapeHtml(caseStudy.narrative)}</p>
        <div class="mt-4">
          ${buildInfoCardsHtml(caseStudy.infoCards)}
        </div>
        <div class="formula-box">
          <code>${escapeHtml(caseStudy.formulaText)}</code>
        </div>
      </article>

      <aside class="note-card">
        <strong>${escapeHtml(caseStudy.resultLabel)}</strong>
        <div class="flex flex-wrap gap-2 mt-3">${buildChipList(caseStudy.resultItems)}</div>
      </aside>
    </div>

    ${buildGuideCardsHtml(caseStudy.guideCards)}

    <div class="duo-grid mt-4">
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Interpretacion</h4>
          <span class="status-pill">Analisis</span>
        </div>
        <div class="insight-stack">
          <div class="insight-block">
            <span>Decision</span>
            <strong>${escapeHtml(caseStudy.conclusion)}</strong>
            <p>${escapeHtml(caseStudy.decision)}</p>
          </div>
          <div class="insight-block">
            <span>Aplicacion</span>
            <strong>Uso en software</strong>
            <p>${escapeHtml(caseStudy.takeaway)}</p>
          </div>
        </div>
      </article>

      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Pregunta del caso</h4>
          <span class="status-pill">Contexto</span>
        </div>
        <p class="text-slate-700 leading-relaxed">
          ${escapeHtml(caseStudy.narrative)}
        </p>
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
          ${buildCaseHtml(caseStudy)}
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
      "Excelente. Diferenciaste correctamente numeros reales, complejos y propiedades.",
    incompleteMessage: "Ubica todas las tarjetas antes de verificar la actividad.",
    partialMessage: (correct, total) =>
      `Obtuviste ${correct} de ${total} tarjetas correctas. Revisa si el elemento es un numero real, un complejo o un concepto teorico.`,
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
      "Muy bien. Relacionaste correctamente cada situacion con la propiedad o concepto adecuado.",
    incompleteMessage: "Ubica todas las tarjetas antes de verificar la actividad.",
    partialMessage: (correct, total) =>
      `Tienes ${correct} de ${total} relaciones correctas. Revisa si el caso habla de permanencia en R, reparto, conjugado o magnitud.`,
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
        "Muy bien. Ordenaste correctamente la metodologia para analizar el caso numerico.",
      );
      return;
    }

    showFeedback(
      feedback,
      `Tienes ${correct} de ${fields.length} pasos correctos. Revisa el orden desde la identificacion del numero hasta la interpretacion final.`,
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
        "Correcto. Interpretaste bien clasificacion numerica, suma compleja y modulo.",
      );
      return;
    }

    showFeedback(
      feedback,
      `Tienes ${correct} de ${fields.length} respuestas correctas. Revisa la diferencia entre racional e irracional, y recalcula las operaciones con complejos.`,
    );
  });

  resetButton.addEventListener("click", () => {
    fields.forEach((field) => {
      field.value = "";
    });
    clearFeedback(feedback);
  });
}

function buildRealLabResultHtml(a, b, c, operation) {
  if (operation === "closure-add") {
    const result = a + b;
    return `
      <div class="duo-grid">
        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Cerradura en suma</h4>
            <span class="status-pill">R</span>
          </div>
          <div class="formula-box">
            <code>a = ${escapeHtml(formatNumber(a))}
b = ${escapeHtml(formatNumber(b))}
a + b = ${escapeHtml(formatNumber(result))}</code>
          </div>
        </article>
        <article class="sub-panel">
          <div class="insight-stack">
            <div class="insight-block">
              <span>Lectura</span>
              <strong>El resultado sigue en R</strong>
              <p>Sumar dos reales produce otro real, por eso la propiedad se conserva.</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  if (operation === "commutative-add") {
    const left = a + b;
    const right = b + a;
    return `
      <div class="duo-grid">
        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Conmutativa de la suma</h4>
            <span class="status-pill">a + b = b + a</span>
          </div>
          <div class="formula-box">
            <code>a + b = ${escapeHtml(formatNumber(a))} + ${escapeHtml(formatNumber(b))} = ${escapeHtml(formatNumber(left))}
b + a = ${escapeHtml(formatNumber(b))} + ${escapeHtml(formatNumber(a))} = ${escapeHtml(formatNumber(right))}</code>
          </div>
        </article>
        <article class="sub-panel">
          <div class="insight-stack">
            <div class="insight-block">
              <span>Lectura</span>
              <strong>El orden no cambia el resultado</strong>
              <p>Ambas expresiones valen ${escapeHtml(formatNumber(left))}.</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  if (operation === "associative-add") {
    const left = (a + b) + c;
    const right = a + (b + c);
    return `
      <div class="duo-grid">
        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Asociativa de la suma</h4>
            <span class="status-pill">(a + b) + c</span>
          </div>
          <div class="formula-box">
            <code>(a + b) + c = (${escapeHtml(formatNumber(a))} + ${escapeHtml(formatNumber(b))}) + ${escapeHtml(formatNumber(c))} = ${escapeHtml(formatNumber(left))}
a + (b + c) = ${escapeHtml(formatNumber(a))} + (${escapeHtml(formatNumber(b))} + ${escapeHtml(formatNumber(c))}) = ${escapeHtml(formatNumber(right))}</code>
          </div>
        </article>
        <article class="sub-panel">
          <div class="insight-stack">
            <div class="insight-block">
              <span>Lectura</span>
              <strong>La agrupacion no altera la suma</strong>
              <p>Ambas agrupaciones producen ${escapeHtml(formatNumber(left))}.</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  const left = a * (b + c);
  const right = a * b + a * c;
  return `
    <div class="duo-grid">
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Distributiva</h4>
          <span class="status-pill">a(b + c)</span>
        </div>
        <div class="formula-box">
          <code>a(b + c) = ${escapeHtml(formatNumber(a))}(${escapeHtml(formatNumber(b))} + ${escapeHtml(formatNumber(c))}) = ${escapeHtml(formatNumber(left))}
ab + ac = ${escapeHtml(formatNumber(a))}·${escapeHtml(formatNumber(b))} + ${escapeHtml(formatNumber(a))}·${escapeHtml(formatNumber(c))} = ${escapeHtml(formatNumber(right))}</code>
        </div>
      </article>
      <article class="sub-panel">
        <div class="insight-stack">
          <div class="insight-block">
            <span>Lectura</span>
            <strong>El producto se reparte en la suma</strong>
            <p>Ambas formas son equivalentes y valen ${escapeHtml(formatNumber(left))}.</p>
          </div>
        </div>
      </article>
    </div>
  `;
}

function setupRealLab() {
  const fieldA = document.querySelector("#real-lab-a");
  const fieldB = document.querySelector("#real-lab-b");
  const fieldC = document.querySelector("#real-lab-c");
  const operation = document.querySelector("#real-lab-operation");
  const button = document.querySelector("#real-lab-generate");
  const status = document.querySelector("#real-lab-status");
  const output = document.querySelector("#real-lab-output");

  if (!fieldA || !fieldB || !fieldC || !operation || !button || !status || !output) {
    return;
  }

  function render() {
    const a = Number(fieldA.value);
    const b = Number(fieldB.value);
    const c = Number(fieldC.value);

    if ([a, b, c].some((value) => Number.isNaN(value))) {
      status.textContent = "Ingresa valores validos";
      output.innerHTML = "";
      return;
    }

    output.innerHTML = buildRealLabResultHtml(a, b, c, operation.value);
    status.textContent = "Resultado generado";
  }

  button.addEventListener("click", render);
  render();
}

function formatComplex(real, imag) {
  const re = normalizeNumber(real);
  const im = normalizeNumber(imag);
  const realPart = formatNumber(re);
  const imagAbs = formatNumber(Math.abs(im));

  if (im === 0) {
    return realPart;
  }

  if (re === 0) {
    return `${im < 0 ? "-" : ""}${imagAbs}i`;
  }

  return `${realPart} ${im < 0 ? "-" : "+"} ${imagAbs}i`;
}

function buildComplexLabResultHtml(a, b, c, d, operation) {
  const z1 = formatComplex(a, b);
  const z2 = formatComplex(c, d);

  if (operation === "sum") {
    const real = a + c;
    const imag = b + d;
    return `
      <div class="duo-grid">
        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Suma de complejos</h4>
            <span class="status-pill">z1 + z2</span>
          </div>
          <div class="formula-box">
            <code>z1 = ${escapeHtml(z1)}
z2 = ${escapeHtml(z2)}
z1 + z2 = ${escapeHtml(formatComplex(real, imag))}</code>
          </div>
        </article>
        <article class="sub-panel">
          <div class="insight-stack">
            <div class="insight-block">
              <span>Regla</span>
              <strong>Se suman partes homogeneas</strong>
              <p>Parte real con parte real, parte imaginaria con parte imaginaria.</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  if (operation === "product") {
    const real = a * c - b * d;
    const imag = a * d + b * c;
    return `
      <div class="duo-grid">
        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Producto de complejos</h4>
            <span class="status-pill">z1 · z2</span>
          </div>
          <div class="formula-box">
            <code>z1 = ${escapeHtml(z1)}
z2 = ${escapeHtml(z2)}
z1 · z2 = ${escapeHtml(formatComplex(real, imag))}</code>
          </div>
        </article>
        <article class="sub-panel">
          <div class="insight-stack">
            <div class="insight-block">
              <span>Regla</span>
              <strong>Se usa i² = -1</strong>
              <p>Al multiplicar, la parte real queda como ac - bd y la imaginaria como ad + bc.</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  if (operation === "conjugateZ1") {
    return `
      <div class="duo-grid">
        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Conjugado de z1</h4>
            <span class="status-pill">z̄1</span>
          </div>
          <div class="formula-box">
            <code>z1 = ${escapeHtml(z1)}
z̄1 = ${escapeHtml(formatComplex(a, -b))}</code>
          </div>
        </article>
        <article class="sub-panel">
          <div class="insight-stack">
            <div class="insight-block">
              <span>Lectura</span>
              <strong>Solo cambia el signo imaginario</strong>
              <p>La parte real se conserva y la parte imaginaria invierte su signo.</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  const modulus = Math.hypot(a, b);
  return `
    <div class="duo-grid">
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>Modulo de z1</h4>
          <span class="status-pill">|z1|</span>
        </div>
        <div class="formula-box">
          <code>z1 = ${escapeHtml(z1)}
|z1| = √(${escapeHtml(formatNumber(a))}² + ${escapeHtml(formatNumber(b))}²)
= ${escapeHtml(formatNumber(modulus))}</code>
        </div>
      </article>
      <article class="sub-panel">
        <div class="insight-stack">
          <div class="insight-block">
            <span>Lectura</span>
            <strong>Magnitud del complejo</strong>
            <p>El modulo representa la distancia del punto complejo al origen.</p>
          </div>
        </div>
      </article>
    </div>
  `;
}

function setupComplexLab() {
  const fieldA = document.querySelector("#complex-lab-a");
  const fieldB = document.querySelector("#complex-lab-b");
  const fieldC = document.querySelector("#complex-lab-c");
  const fieldD = document.querySelector("#complex-lab-d");
  const operation = document.querySelector("#complex-lab-operation");
  const button = document.querySelector("#complex-lab-generate");
  const status = document.querySelector("#complex-lab-status");
  const output = document.querySelector("#complex-lab-output");

  if (!fieldA || !fieldB || !fieldC || !fieldD || !operation || !button || !status || !output) {
    return;
  }

  function render() {
    const a = Number(fieldA.value);
    const b = Number(fieldB.value);
    const c = Number(fieldC.value);
    const d = Number(fieldD.value);

    if ([a, b, c, d].some((value) => Number.isNaN(value))) {
      status.textContent = "Ingresa valores validos";
      output.innerHTML = "";
      return;
    }

    output.innerHTML = buildComplexLabResultHtml(a, b, c, d, operation.value);
    status.textContent = "Operacion generada";
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
          <h4>${questionIndex + 1}. ${escapeHtml(question.prompt)}</h4>
          <div class="option-list">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <label class="quiz-option" data-question="${questionIndex}" data-option="${optionIndex}">
                    <input type="radio" name="quiz-${questionIndex}" value="${optionIndex}" />
                    <span>${escapeHtml(option)}</span>
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
          `<li><strong>Pregunta ${index + 1}:</strong> ${escapeHtml(question.explanation)}</li>`,
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
            : '<p class="mt-3">Excelente. Dominas las propiedades de los numeros reales y complejos.</p>'
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
