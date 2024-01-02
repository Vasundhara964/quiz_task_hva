let quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
let currentQuiz = null;

function addQuestion() {
  const quizNameInput = document.getElementById("quiz-name");
  const quizName = currentQuiz || quizNameInput.value;
  const question = document.getElementById("question").value;
  const options = document.getElementById("options").value.split(",").map(option => option.trim());
  const correctOption = parseInt(document.getElementById("correct-option").value);


  if (!quizzes[quizName]) {
    quizzes[quizName] = [];
  }

  quizzes[quizName].push({ question, options, correctOption });
  currentQuiz = quizName;

  quizNameInput.value = "";
  document.getElementById("question").value = "";
  document.getElementById("options").value = "";
  document.getElementById("correct-option").value = "";
}

function saveQuiz() {
  const quizDropdown = document.getElementById("quiz-dropdown");
  const quizNameInput = document.getElementById("quiz-name");
  const quizName = currentQuiz || quizNameInput.value;

  if (!quizName || quizzes[quizName]) {
    alert("Please enter a unique quiz name.");
    return;
  }

  quizzes[quizName] = [];
  quizDropdown.options.add(new Option(quizName, quizName));
  alert("Quiz saved successfully!");


  localStorage.setItem('quizzes', JSON.stringify(quizzes));


  quizNameInput.value = "";
  currentQuiz = null;
}

function loadQuiz() {
  const quizDropdown = document.getElementById("quiz-dropdown");
  currentQuiz = quizDropdown.value;

  if (currentQuiz) {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>${currentQuiz}</h2>`;

    quizzes[currentQuiz].forEach((q, index) => {
      quizContainer.innerHTML += `<p>${index + 1}. ${q.question}</p>`;
      q.options.forEach((option, optionIndex) => {
        const isCorrect = optionIndex === q.correctOption;
        quizContainer.innerHTML += `<span>${optionIndex + 1}. ${option} ${isCorrect ? '(Correct)' : ''}</span><br>`;
      });
    });
  }
}

function startQuiz() {
  if (!currentQuiz) {
    alert("Please select a quiz to start.");
    return;
  }

  const quizSolveContainer = document.getElementById("quiz-solve-container");
  const quizSolve = document.getElementById("quiz-solve");
  quizSolve.innerHTML = `<h2>${currentQuiz}</h2>`;

  quizzes[currentQuiz].forEach((q, index) => {
    quizSolve.innerHTML += `<p>${index + 1}. ${q.question}</p>`;
    q.options.forEach((option, optionIndex) => {
      quizSolve.innerHTML += `<input type="radio" name="q${index}" value="${optionIndex}">${option}<br>`;
    });
  });

  quizSolveContainer.style.display = "block";
}
