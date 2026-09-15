const practiceAnswers = {
  p1: "a",
  p2: "b",
  p3: "a",
  p4: "a",
  p5: "a",
};

const evaluationAnswers = {
  e1: "c",
  e2: "b",
  e3: "c",
  e4: "b",
  e5: "b",
  e6: "b",
  e7: "c",
  e8: "c",
  e9: "b",
  e10: "a",
};

const orderingAnswers = {
  o1: "open",
  o2: "write",
  o3: "run",
  o4: "check",
  o5: "fix",
};

function gradeQuiz(answers, resultElement, passMark = 70) {
  let score = 0;
  const total = Object.keys(answers).length;

  for (const [question, correct] of Object.entries(answers)) {
    const selected = document.querySelector(`input[name="${question}"]:checked`);
    if (selected && selected.value === correct) {
      score += 1;
    }
  }

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= passMark;

  resultElement.className = `result ${passed ? "ok" : "warn"}`;
  resultElement.textContent = passed
    ? `Resultado: ${score}/${total} (${percentage}%). Excelente, has alcanzado el objetivo.`
    : `Resultado: ${score}/${total} (${percentage}%). Revisa el contenido e inténtalo de nuevo.`;
}

function gradeOrdering(answers, resultElement) {
  let score = 0;
  const total = Object.keys(answers).length;

  for (const [step, correct] of Object.entries(answers)) {
    const selected = document.querySelector(`select[name="${step}"]`);
    if (selected && selected.value === correct) {
      score += 1;
    }
  }

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 80;

  resultElement.className = `result ${passed ? "ok" : "warn"}`;
  resultElement.textContent = passed
    ? `Actividad 1: ${score}/${total} (${percentage}%). Excelente secuenciación del proceso.`
    : `Actividad 1: ${score}/${total} (${percentage}%). Reordena los pasos hasta lograr una secuencia completa.`;
}

function analyzeProduction(text, resultElement) {
  const normalizedText = text.toLowerCase();
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const expressions = ["first", "then", "next", "after that", "finally"];
  const found = expressions.filter((expr) => normalizedText.includes(expr));

  const hasLineRange = lines.length >= 6 && lines.length <= 8;
  const hasMinExpressions = found.length >= 4;
  const passed = hasLineRange && hasMinExpressions;

  resultElement.className = `result ${passed ? "ok" : "warn"}`;
  resultElement.textContent = passed
    ? `Actividad 3: Cumples los requisitos. Líneas: ${lines.length}. Expresiones usadas: ${found.join(", ")}.`
    : `Actividad 3: Ajusta tu texto. Líneas actuales: ${lines.length} (objetivo: 6–8). Expresiones detectadas: ${found.length}/4.`;
}

const checkPracticeBtn = document.getElementById("checkPracticeBtn");
const practiceResult = document.getElementById("practiceResult");
const checkEvaluationBtn = document.getElementById("checkEvaluationBtn");
const evaluationResult = document.getElementById("evaluationResult");
const checkOrderingBtn = document.getElementById("checkOrderingBtn");
const orderingResult = document.getElementById("orderingResult");
const analyzeProductionBtn = document.getElementById("analyzeProductionBtn");
const productionText = document.getElementById("productionText");
const productionResult = document.getElementById("productionResult");

if (checkPracticeBtn && practiceResult) {
  checkPracticeBtn.addEventListener("click", () => {
    gradeQuiz(practiceAnswers, practiceResult, 70);
  });
}

if (checkEvaluationBtn && evaluationResult) {
  checkEvaluationBtn.addEventListener("click", () => {
    gradeQuiz(evaluationAnswers, evaluationResult, 70);
  });
}

if (checkOrderingBtn && orderingResult) {
  checkOrderingBtn.addEventListener("click", () => {
    gradeOrdering(orderingAnswers, orderingResult);
  });
}

if (analyzeProductionBtn && productionText && productionResult) {
  analyzeProductionBtn.addEventListener("click", () => {
    analyzeProduction(productionText.value, productionResult);
  });
}
