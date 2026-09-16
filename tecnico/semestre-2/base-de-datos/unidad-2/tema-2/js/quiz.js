const examAnswers = { q1: 'b', q2: 'a', q3: 'c', q4: 'a', q5: 'b' };

function gradeExam() {
    let score = 0;
    document.querySelectorAll('#exam-form .question').forEach((question, index) => {
        const number = index + 1;
        const selected = question.querySelector(`input[name="q${number}"]:checked`);
        const correct = selected && selected.value === examAnswers[`q${number}`];
        question.classList.toggle('incorrect', !correct);
        if (correct) score += 1;
    });
    document.getElementById('exam-score').textContent = score;
    document.getElementById('exam-results').style.display = 'block';
    document.getElementById('exam-errors-list').textContent = score === 5 ? 'Excelente resultado.' : 'Revisa las preguntas marcadas.';
}

function resetExam() {
    document.getElementById('exam-form').reset();
    document.querySelectorAll('#exam-form .question').forEach((question) => question.classList.remove('incorrect'));
    document.getElementById('exam-results').style.display = 'none';
}
