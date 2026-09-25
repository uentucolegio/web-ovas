const truthPatterns = {
  negation: {
    key: "negation",
    title: "Negacion",
    symbol: "¬p",
    vars: ["p"],
    reading: "No p",
    description: "Invierte el valor de verdad de la proposicion base.",
    truthRule: "Es verdadera cuando la proposicion original es falsa.",
    caseHint:
      "Sirve para modelar ausencia de conexion, negacion de permisos o fallos detectados.",
    evaluate: ({ p }) => !p,
  },
  conjunction: {
    key: "conjunction",
    title: "Conjuncion",
    symbol: "p ∧ q",
    vars: ["p", "q"],
    reading: "p y q",
    description: "Exige que ambas condiciones se cumplan al mismo tiempo.",
    truthRule: "Solo es verdadera cuando p y q son verdaderas.",
    caseHint:
      "Util en reglas donde varias dependencias deben cumplirse para habilitar una accion.",
    evaluate: ({ p, q }) => p && q,
  },
  disjunction: {
    key: "disjunction",
    title: "Disyuncion",
    symbol: "p ∨ q",
    vars: ["p", "q"],
    reading: "p o q",
    description: "Modela escenarios donde basta una de varias condiciones validas.",
    truthRule: "Solo es falsa cuando ambas proposiciones son falsas.",
    caseHint:
      "Aparece en alertas, rutas alternativas o eventos donde se acepta una de varias entradas.",
    evaluate: ({ p, q }) => p || q,
  },
  implication: {
    key: "implication",
    title: "Condicional",
    symbol: "p → q",
    vars: ["p", "q"],
    reading: "Si p, entonces q",
    description: "Representa una regla o promesa logica entre antecedente y consecuente.",
    truthRule: "Solo es falsa cuando p es verdadera y q es falsa.",
    caseHint:
      "Es habitual en validaciones del tipo si ocurre una condicion, el sistema debe responder de cierta manera.",
    evaluate: ({ p, q }) => !p || q,
  },
  biconditional: {
    key: "biconditional",
    title: "Bicondicional",
    symbol: "p ↔ q",
    vars: ["p", "q"],
    reading: "p si y solo si q",
    description: "Relaciona dos proposiciones que deben tener el mismo valor de verdad.",
    truthRule: "Es verdadera cuando ambas proposiciones coinciden.",
    caseHint:
      "Sirve para expresar equivalencia entre dos estados o condiciones mutuamente dependientes.",
    evaluate: ({ p, q }) => p === q,
  },
};

const logicLabOrder = [
  "negation",
  "conjunction",
  "disjunction",
  "implication",
  "biconditional",
];

const caseStudies = [
  {
    id: "diagnostico",
    shortLabel: "Diagnostico",
    title: "Caso 1. Diagnostico de despliegue",
    tag: "Servicios y backend",
    patternKey: "conjunction",
    expression: "p ∧ q",
    narrative:
      "El equipo libera una nueva version de la aplicacion solo cuando el servidor responde correctamente y la base de datos esta disponible.",
    propositions: [
      {
        symbol: "p",
        title: "Servidor disponible",
        text: "El servidor responde correctamente.",
      },
      {
        symbol: "q",
        title: "Base de datos disponible",
        text: "La base de datos esta activa y accesible.",
      },
    ],
    question: "¿Cuándo puede publicarse la aplicacion?",
    decision:
      "La regla solo se cumple en la fila donde p y q son verdaderas. Si una dependencia falla, la publicacion no debe continuar.",
    conclusion: "La conjuncion protege decisiones criticas.",
    takeaway:
      "Este patron evita aprobar despliegues cuando falta alguna condicion esencial del sistema.",
    flashcards: [
      {
        front: "Condicion 1",
        prompt: "Revisa el primer requisito del caso.",
        back: "p representa que el servidor responde correctamente.",
      },
      {
        front: "Condicion 2",
        prompt: "Revisa el segundo requisito del caso.",
        back: "q representa que la base de datos esta disponible.",
      },
      {
        front: "Conector",
        prompt: "Identifica la palabra clave de la regla.",
        back: "La expresion usa y, por eso corresponde a una conjuncion.",
      },
      {
        front: "Decision",
        prompt: "¿Cuándo se permite el despliegue?",
        back: "Solo cuando ambas condiciones son verdaderas al mismo tiempo.",
      },
    ],
  },
  {
    id: "semaforos",
    shortLabel: "Semaforos",
    title: "Caso 2. Semaforos inteligentes",
    tag: "Automatizacion y sensores",
    patternKey: "disjunction",
    expression: "p ∨ q",
    narrative:
      "El semaforo cambia de fase si el sensor detecta un vehiculo en espera o si el peaton activa el boton de cruce.",
    propositions: [
      {
        symbol: "p",
        title: "Vehiculo detectado",
        text: "El sensor del carril detecta al menos un vehiculo.",
      },
      {
        symbol: "q",
        title: "Boton peatonal activo",
        text: "El boton de cruce peatonal fue presionado.",
      },
    ],
    question: "¿En que situaciones debe ocurrir el cambio de fase?",
    decision:
      "Basta con que una de las dos condiciones sea verdadera para justificar el cambio. Solo se mantiene la fase cuando ninguna esta activa.",
    conclusion: "La disyuncion representa alternativas validas.",
    takeaway:
      "Este operador es util cuando el sistema debe reaccionar ante cualquiera de varias entradas aceptables.",
    flashcards: [
      {
        front: "Entrada 1",
        prompt: "Primera situacion que puede activar el sistema.",
        back: "p representa que el sensor detecta un vehiculo.",
      },
      {
        front: "Entrada 2",
        prompt: "Segunda situacion posible.",
        back: "q representa que el peaton solicita cruce.",
      },
      {
        front: "Conector",
        prompt: "¿Que palabra del caso manda?",
        back: "La palabra o indica una disyuncion inclusiva.",
      },
      {
        front: "Decision",
        prompt: "¿Cuándo no cambia la fase?",
        back: "Solo cuando no hay vehiculo ni solicitud peatonal.",
      },
    ],
  },
  {
    id: "acceso",
    shortLabel: "Acceso",
    title: "Caso 3. Validacion de acceso",
    tag: "Autenticacion",
    patternKey: "implication",
    expression: "p → q",
    narrative:
      "La plataforma establece la regla: si el estudiante se autentica con credenciales validas, entonces debe acceder al tablero principal.",
    propositions: [
      {
        symbol: "p",
        title: "Credenciales validas",
        text: "El estudiante se autentica correctamente.",
      },
      {
        symbol: "q",
        title: "Acceso concedido",
        text: "La plataforma habilita el tablero principal.",
      },
    ],
    question: "¿Cual es el unico caso que invalida la regla?",
    decision:
      "La implicacion falla cuando el antecedente es verdadero y el consecuente es falso: el sistema reconocio credenciales validas, pero no concedio el acceso prometido.",
    conclusion: "El condicional verifica promesas del sistema.",
    takeaway:
      "Este patron es clave para revisar coherencia entre validacion y respuesta esperada de la aplicacion.",
    flashcards: [
      {
        front: "Antecedente",
        prompt: "Primera parte de la regla.",
        back: "p indica que las credenciales son validas.",
      },
      {
        front: "Consecuente",
        prompt: "Segunda parte de la regla.",
        back: "q indica que la plataforma concede acceso.",
      },
      {
        front: "Conector",
        prompt: "Forma verbal del caso.",
        back: "Si... entonces... corresponde a una implicacion.",
      },
      {
        front: "Fallo critico",
        prompt: "Fila mas importante de la tabla.",
        back: "La regla falla cuando p es verdadera y q es falsa.",
      },
    ],
  },
  {
    id: "conectividad",
    shortLabel: "Conectividad",
    title: "Caso 4. Modo fuera de linea",
    tag: "Infraestructura",
    patternKey: "negation",
    expression: "¬p",
    narrative:
      "La app activa el modo fuera de linea cuando no hay conexion a Internet disponible.",
    propositions: [
      {
        symbol: "p",
        title: "Conexion disponible",
        text: "Existe conexion a Internet.",
      },
    ],
    question: "¿Cuándo se activa el modo fuera de linea?",
    decision:
      "La negacion es verdadera exactamente cuando la proposicion base es falsa. Si hay conexion, la regla deja de cumplirse.",
    conclusion: "La negacion modela ausencia o bloqueo.",
    takeaway:
      "Es util en escenarios donde el sistema reacciona ante la falta de un recurso o servicio.",
    flashcards: [
      {
        front: "Base",
        prompt: "Proposicion original del caso.",
        back: "p representa que existe conexion a Internet.",
      },
      {
        front: "Negacion",
        prompt: "Lectura simbolica del caso.",
        back: "¬p se lee como no hay conexion disponible.",
      },
      {
        front: "Patron",
        prompt: "¿Que hace este operador?",
        back: "Invierte el valor de verdad de la proposicion original.",
      },
      {
        front: "Decision",
        prompt: "¿Cuándo se activa el modo offline?",
        back: "Solo cuando p es falsa, es decir, cuando no hay conexion.",
      },
    ],
  },
];

const quizQuestions = [
  {
    prompt: "¿Cual de los siguientes enunciados si es una proposicion?",
    options: [
      "El servidor responde en menos de 2 segundos.",
      "¿El servidor responde en menos de 2 segundos?",
      "Conecta la base de datos.",
      "Tal vez el servidor responda pronto.",
    ],
    answer: 0,
    explanation:
      "Una proposicion es declarativa y puede evaluarse como verdadera o falsa.",
  },
  {
    prompt: "¿Que hace la negacion ¬p?",
    options: [
      "Mantiene el mismo valor de verdad",
      "Intercambia verdadero por falso y falso por verdadero",
      "Hace verdadera cualquier proposicion",
      "Convierte p en una pregunta",
    ],
    answer: 1,
    explanation:
      "La negacion invierte el valor de verdad de la proposicion original.",
  },
  {
    prompt: "¿Cuándo es verdadera la conjuncion p ∧ q?",
    options: [
      "Cuando al menos una proposicion es verdadera",
      "Solo cuando ambas proposiciones son verdaderas",
      "Solo cuando ambas son falsas",
      "Siempre que p sea verdadera",
    ],
    answer: 1,
    explanation:
      "La conjuncion exige simultaneidad: las dos proposiciones deben ser verdaderas.",
  },
  {
    prompt: "¿Cuándo es falsa la disyuncion p ∨ q?",
    options: [
      "Cuando ambas proposiciones son falsas",
      "Cuando ambas proposiciones son verdaderas",
      "Cuando p es verdadera y q es falsa",
      "Nunca",
    ],
    answer: 0,
    explanation:
      "La disyuncion inclusiva solo falla si no se cumple ninguna de las dos condiciones.",
  },
  {
    prompt: "¿En que fila es falsa la implicacion p → q?",
    options: [
      "p = V, q = V",
      "p = V, q = F",
      "p = F, q = V",
      "p = F, q = F",
    ],
    answer: 1,
    explanation:
      "La implicacion solo falla cuando el antecedente es verdadero y el consecuente es falso.",
  },
  {
    prompt:
      "Si una expresion tiene tres proposiciones simples, ¿cuantas filas tendra su tabla de verdad?",
    options: ["4", "6", "8", "16"],
    answer: 2,
    explanation:
      "Con n proposiciones simples se construyen 2ⁿ filas. Para n = 3, el resultado es 8.",
  },
  {
    prompt: "¿Cuándo es verdadera la bicondicional p ↔ q?",
    options: [
      "Cuando al menos una proposicion es verdadera",
      "Solo cuando p es verdadera",
      "Cuando p y q tienen el mismo valor de verdad",
      "Solo cuando ambas son falsas",
    ],
    answer: 2,
    explanation:
      "La bicondicional es verdadera cuando ambas proposiciones coinciden: V,V o F,F.",
  },
  {
    prompt: "¿Para que sirve una tabla de verdad en un estudio de caso de software?",
    options: [
      "Para decorar el analisis con simbolos",
      "Para listar usuarios del sistema",
      "Para verificar en que combinaciones una regla es valida o falla",
      "Para reemplazar completamente las pruebas de software",
    ],
    answer: 2,
    explanation:
      "La tabla permite justificar formalmente cuando una regla del caso se cumple y cuando no.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  bindPaneNavigation();
  initObjectiveAccordion();
  initContentAccordions();
  renderCaseStudies();
  setupClassificationActivity();
  setupConnectorActivity();
  setupSequenceActivity();
  setupTruthTablePractice();
  setupLogicLab();
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

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initObjectiveAccordion() {
  const items = document.querySelectorAll(".objective-item");
  if (!items.length) {
    return;
  }

  items.forEach((item) => {
    const button = item.querySelector(".objective-toggle");
    const panelId = button?.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!button || !panel) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      items.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".objective-toggle");
        const otherPanelId = otherButton?.getAttribute("aria-controls");
        const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;

        otherItem.classList.remove("active");
        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }
        if (otherPanel) {
          otherPanel.hidden = true;
        }
      });

      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });
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

function bindFlipCards() {
  document.querySelectorAll(".flip-card").forEach((card) => {
    const toggleCard = () => {
      card.classList.toggle("is-flipped");
    };

    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
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

function boolToText(value) {
  return value ? "V" : "F";
}

function buildTruthPill(value) {
  return `<span class="truth-pill ${value ? "truth-pill-true" : "truth-pill-false"}">${boolToText(value)}</span>`;
}

function generateAssignments(vars) {
  const totalRows = 2 ** vars.length;
  return Array.from({ length: totalRows }, (_, rowIndex) => {
    const assignment = {};

    vars.forEach((variable, variableIndex) => {
      const blockSize = 2 ** (vars.length - variableIndex - 1);
      assignment[variable] = Math.floor(rowIndex / blockSize) % 2 === 0;
    });

    return assignment;
  });
}

function buildTruthTableHtml(patternKey, finalLabel) {
  const pattern = truthPatterns[patternKey];
  const assignments = generateAssignments(pattern.vars);
  const headers = pattern.vars
    .map((variable) => `<th>${escapeHtml(variable)}</th>`)
    .join("");

  const rows = assignments
    .map((assignment) => {
      const result = pattern.evaluate(assignment);
      const cells = pattern.vars
        .map((variable) => `<td>${buildTruthPill(assignment[variable])}</td>`)
        .join("");

      return `
        <tr>
          ${cells}
          <td>${buildTruthPill(result)}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <div class="table-wrap">
      <table class="logic-table">
        <thead>
          <tr>
            ${headers}
            <th>${escapeHtml(finalLabel || pattern.symbol)}</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function buildFlashcardsHtml(cards) {
  return cards
    .map(
      (card, index) => `
        <article class="flip-card" tabindex="0" role="button" aria-label="${escapeHtml(card.front)}">
          <div class="flip-card-inner">
            <div class="flip-face flip-front">
              <span class="flip-index">${index + 1}</span>
              <h4>${escapeHtml(card.front)}</h4>
              <p>${escapeHtml(card.prompt)}</p>
            </div>
            <div class="flip-face flip-back">
              <h4>${escapeHtml(card.front)}</h4>
              <p>${escapeHtml(card.back)}</p>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function buildCaseModuleHtml(caseStudy, active) {
  const pattern = truthPatterns[caseStudy.patternKey];
  const propositions = caseStudy.propositions
    .map(
      (item) => `
        <div class="proposition-card">
          <span class="proposition-symbol">${escapeHtml(item.symbol)}</span>
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.text)}</p>
          </div>
        </div>
      `,
    )
    .join("");

  return `
    <div id="case-module-${caseStudy.id}" class="case-module ${active ? "active" : ""}">
      <div class="module-intro">
        <article class="sub-panel">
          <div class="card-title-row">
            <h3>${escapeHtml(caseStudy.title)}</h3>
            <span class="status-pill">${escapeHtml(caseStudy.tag)}</span>
          </div>
          <p>${escapeHtml(caseStudy.narrative)}</p>
          <div class="proposition-list">
            ${propositions}
          </div>
        </article>

        <aside class="note-card">
          <strong>Expresion simbolica</strong>
          <p><strong>${escapeHtml(caseStudy.expression)}</strong></p>
          <p>${escapeHtml(pattern.reading)}</p>
          <p>${escapeHtml(pattern.truthRule)}</p>
          <p><strong>Pregunta del caso:</strong> ${escapeHtml(caseStudy.question)}</p>
        </aside>
      </div>

      <div class="flip-grid">
        ${buildFlashcardsHtml(caseStudy.flashcards)}
      </div>

      <div class="duo-grid">
        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Tabla de verdad</h4>
            <span class="status-pill">${escapeHtml(pattern.symbol)}</span>
          </div>
          ${buildTruthTableHtml(caseStudy.patternKey, caseStudy.expression)}
        </article>

        <article class="sub-panel">
          <div class="card-title-row">
            <h4>Interpretacion del caso</h4>
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
              <strong>Uso en desarrollo</strong>
              <p>${escapeHtml(caseStudy.takeaway)}</p>
            </div>
            <div class="insight-block">
              <span>Pista didactica</span>
              <strong>${escapeHtml(pattern.title)}</strong>
              <p>${escapeHtml(pattern.caseHint)}</p>
            </div>
          </div>
        </article>
      </div>
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
    .map((caseStudy, index) => buildCaseModuleHtml(caseStudy, index === 0))
    .join("");

  bindCaseTabs();
  bindFlipCards();
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
      "Excelente. Diferenciaste correctamente proposiciones, no proposiciones y conectores logicos.",
    incompleteMessage: "Ubica todas las tarjetas antes de verificar la actividad.",
    partialMessage: (correct, total) =>
      `Obtuviste ${correct} de ${total} tarjetas correctas. Revisa si el enunciado es declarativo y si realmente expresa un conector logico.`,
  });
}

function setupConnectorActivity() {
  setupDragSortActivity({
    poolSelector: "#connector-cards",
    zoneSelector: ".connector-zone",
    feedbackSelector: "#feedback-connectors",
    checkSelector: "#check-connectors",
    resetSelector: "#reset-connectors",
    successMessage:
      "Muy bien. Relacionaste correctamente cada caso con su conector logico.",
    incompleteMessage: "Ubica todas las tarjetas antes de verificar la relacion.",
    partialMessage: (correct, total) =>
      `Tienes ${correct} de ${total} relaciones correctas. Revisa que casos exigen simultaneidad, alternativa, negacion o una regla del tipo si... entonces.`,
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
        "Muy bien. Ordenaste correctamente la metodologia del estudio de casos.",
      );
      return;
    }

    showFeedback(
      feedback,
      `Tienes ${correct} de ${fields.length} pasos correctos. Revisa el orden desde la observacion del caso hasta la interpretacion final.`,
    );
  });

  resetButton.addEventListener("click", () => {
    fields.forEach((field) => {
      field.value = "";
    });
    clearFeedback(feedback);
  });
}

function setupTruthTablePractice() {
  const fields = Array.from(document.querySelectorAll(".truth-result-field"));
  const checkButton = document.querySelector("#check-truth-table");
  const resetButton = document.querySelector("#reset-truth-table");
  const feedback = document.querySelector("#truth-table-feedback");

  if (!fields.length || !checkButton || !resetButton || !feedback) {
    return;
  }

  checkButton.addEventListener("click", () => {
    if (fields.some((field) => field.value === "")) {
      showFeedback(feedback, "Completa los cuatro resultados antes de verificar la tabla.");
      return;
    }

    const correct = fields.filter((field) => field.value === field.dataset.answer).length;
    if (correct === fields.length) {
      showFeedback(
        feedback,
        "Correcto. La implicacion solo falla en la fila V, F; en las demas combinaciones resulta verdadera.",
      );
      return;
    }

    showFeedback(
      feedback,
      `Tienes ${correct} de ${fields.length} filas correctas. Recuerda que p → q solo es falsa cuando el antecedente es verdadero y el consecuente es falso.`,
    );
  });

  resetButton.addEventListener("click", () => {
    fields.forEach((field) => {
      field.value = "";
    });
    clearFeedback(feedback);
  });
}

function buildLabHtml(patternKey) {
  const pattern = truthPatterns[patternKey];

  return `
    <div class="duo-grid">
      <article class="sub-panel">
        <div class="card-title-row">
          <h4>${escapeHtml(pattern.title)}</h4>
          <span class="status-pill">${escapeHtml(pattern.symbol)}</span>
        </div>
        <p>${escapeHtml(pattern.description)}</p>
        <div style="margin-top: 1rem;">
          ${buildTruthTableHtml(patternKey, pattern.symbol)}
        </div>
      </article>

      <article class="sub-panel">
        <div class="insight-stack">
          <div class="insight-block">
            <span>Lectura natural</span>
            <strong>${escapeHtml(pattern.reading)}</strong>
            <p>${escapeHtml(pattern.description)}</p>
          </div>
          <div class="insight-block">
            <span>Regla de verdad</span>
            <strong>¿Cuándo se cumple?</strong>
            <p>${escapeHtml(pattern.truthRule)}</p>
          </div>
          <div class="insight-block">
            <span>Aplicacion</span>
            <strong>Uso en software</strong>
            <p>${escapeHtml(pattern.caseHint)}</p>
          </div>
        </div>
      </article>
    </div>
  `;
}

function setupLogicLab() {
  const select = document.querySelector("#logic-lab-select");
  const generateButton = document.querySelector("#logic-lab-generate");
  const status = document.querySelector("#logic-lab-status");
  const output = document.querySelector("#logic-lab-output");

  if (!select || !generateButton || !status || !output) {
    return;
  }

  select.innerHTML = logicLabOrder
    .map((key) => {
      const pattern = truthPatterns[key];
      return `<option value="${key}">${escapeHtml(pattern.title)} (${escapeHtml(pattern.symbol)})</option>`;
    })
    .join("");

  function renderLab() {
    const key = select.value || logicLabOrder[0];
    const pattern = truthPatterns[key];
    output.innerHTML = buildLabHtml(key);
    status.textContent = `Patron activo: ${pattern.title}`;
  }

  generateButton.addEventListener("click", renderLab);
  select.addEventListener("change", renderLab);

  renderLab();
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
            : '<p class="mt-3">Excelente. Dominas la traduccion de casos, los conectores y la lectura de tablas de verdad.</p>'
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
