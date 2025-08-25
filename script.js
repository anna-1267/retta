const questions = [
  {
    question: "Qual è l'equazione di una retta passante per l'origine con coefficiente angolare 2?",
    answers: [
      { text: "y = 2x", correct: true },
      { text: "y = x + 2", correct: false },
      { text: "y = -2x", correct: false },
      { text: "x = 2y", correct: false }
    ],
    explanation: "Una retta passante per l'origine ha termine noto 0, quindi y = mx con m = 2.",
    level: "facile"
  },
  {
    question: "Qual è la pendenza della retta y = -3x + 1?",
    answers: [
      { text: "-3", correct: true },
      { text: "1", correct: false },
      { text: "3", correct: false },
      { text: "0", correct: false }
    ],
    explanation: "La pendenza è il coefficiente davanti alla x, quindi -3.",
    level: "facile"
  },
  {
    question: "Qual è l'equazione della retta passante per i punti (1,2) e (3,6)?",
    answers: [
      { text: "y = 2x", correct: true },
      { text: "y = 2x + 0", correct: false },
      { text: "y = 2x - 1", correct: false },
      { text: "y = 2x + 1", correct: false }
    ],
    explanation: "Il coefficiente angolare è (6-2)/(3-1)=2, passa per (1,2): y - 2 = 2(x - 1) => y = 2x.",
    level: "intermedio"
  },
  {
    question: "Una retta è parallela all'asse x. Qual è la sua equazione?",
    answers: [
      { text: "y = k", correct: true },
      { text: "x = k", correct: false },
      { text: "y = 0x + k", correct: false },
      { text: "x = y", correct: false }
    ],
    explanation: "Le rette parallele all'asse x hanno equazione y = costante.",
    level: "facile"
  },
  {
    question: "Determinare il punto di intersezione tra le rette y = 2x + 1 e y = -x + 4",
    answers: [
      { text: "x = 1, y = 3", correct: true },
      { text: "x = 1, y = 2", correct: false },
      { text: "x = 0, y = 1", correct: false },
      { text: "x = 2, y = 4", correct: false }
    ],
    explanation: "Uguagliando: 2x + 1 = -x + 4 => 3x = 3 => x = 1, y = 3.",
    level: "difficile"
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(questions);

const quizContainer = document.getElementById('quiz-container');

questions.forEach((q, index) => {
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;

  const answerDiv = document.createElement('div');
  answerDiv.className = 'answers';

  q.answers.forEach((ans, i) => {
    const id = `q${index}_a${i}`;
    answerDiv.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${ans.correct}" data-level="${q.level}">
        ${ans.text}
      </label>`;
  });

  div.appendChild(answerDiv);
  quizContainer.appendChild(div);
});

function submitQuiz() {
  let score = 0;
  let total = 0;
  const radios = document.querySelectorAll('input[type=radio]:checked');

  radios.forEach(radio => {
    const isCorrect = radio.value === "true";
    const level = radio.dataset.level;
    let weight = 1;
    if (level === "intermedio") weight = 2;
    if (level === "difficile") weight = 3;

    if (isCorrect) score += weight;
    total += weight;
  });

  let result = `<p>Punteggio: ${score} su ${total}</p>`;

  questions.forEach((q, index) => {
    result += `<p><strong>Domanda ${index + 1}:</strong> ${q.explanation}</p>`;
  });

  document.getElementById('result').innerHTML = result;
}
