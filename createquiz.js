document.addEventListener("DOMContentLoaded", function () {
    loadHomePage();
});

function loadHomePage() {
    document.getElementById("homePage").style.display = "block";
    document.getElementById("startQuizPage").style.display = "none";
    document.getElementById("createQuizPage").style.display = "none";
    displayQuizList();
}

function loadStartQuizPage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("startQuizPage").style.display = "block";
    document.getElementById("createQuizPage").style.display = "none";
    displayQuizCategories();
}

function loadCreateQuizPage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("startQuizPage").style.display = "none";
    document.getElementById("createQuizPage").style.display = "block";
    document.getElementById("addQuestionsBtn").style.display = "block";
}

function addQuestion() {
    const numQuestionsInput = document.getElementById("numQuestionsInput");
    const numQuestions = parseInt(numQuestionsInput.value);

    if (isNaN(numQuestions) || numQuestions <= 0) {
        alert("Please enter a valid number of questions.");
        return;
    }

    const questionsContainer = document.getElementById("questionsContainer");
    questionsContainer.innerHTML = "";

    for (let i = 0; i < numQuestions; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<h4>Question ${i + 1}</h4>
            <input type="text" placeholder="Enter the question" id="question${i + 1}">
            <input type="text" placeholder="Option 1" id="option1_${i + 1}">
            <input type="text" placeholder="Option 2" id="option2_${i + 1}">
            <input type="text" placeholder="Option 3" id="option3_${i + 1}">
            <input type="text" placeholder="Option 4" id="option4_${i + 1}">`;

        questionsContainer.appendChild(questionDiv);
    }
    document.getElementById("addQuestionsBtn").style.display = "none";
}

function saveQuiz() {
    const quizCategoryInput = document.getElementById("quizCategory");
    const numQuestionsInput = document.getElementById("numQuestionsInput");

    const quiz = {
        category: quizCategoryInput.value,
        questions: [],
    };
    if (!quiz.category) {
        alert("Please enter a quiz category.");
        return;
    }
    const numQuestions = parseInt(numQuestionsInput.value);
    if (isNaN(numQuestions) || numQuestions <= 0) {
        alert("Please enter a valid number of questions.");
        return;
    }
    for (let i = 0; i < numQuestions; i++) {
        const question = document.getElementById(`question${i + 1}`).value;
        const option1 = document.getElementById(`option1_${i + 1}`).value;
        const option2 = document.getElementById(`option2_${i + 1}`).value;
        const option3 = document.getElementById(`option3_${i + 1}`).value;
        const option4 = document.getElementById(`option4_${i + 1}`).value;

        if (!question || !option1 || !option2 || !option3 || !option4) {
            alert("Please fill in all fields for question " + (i + 1));
            return;
        }

        const questionObject = {
            question,
            options: [option1, option2, option3, option4],
            correctAnswer: option1,
        };

        quiz.questions.push(questionObject);
    }

    saveQuizToLocalStorage(quiz);
    alert("Quiz saved successfully!");
    loadHomePage();
}

function saveQuizToLocalStorage(quiz) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(quiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
}

function displayQuizCategories() {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const categories = Array.from(new Set(quizzes.map((quiz) => quiz.category)));
    const quizCategoriesElement = document.getElementById("quizCategories");
    quizCategoriesElement.innerHTML = "";

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", () => startQuiz(category));
        quizCategoriesElement.appendChild(button);
    });
}

function startQuiz(category) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const selectedQuizzes = quizzes.filter((quiz) => quiz.category === category);
    const quizListElement = document.getElementById("quizList");
    quizListElement.innerHTML = "";

    selectedQuizzes.forEach((quiz) => {
        const button = document.createElement("button");
        button.textContent = quiz.questions.length > 0 ? quiz.questions[0].question : "No questions available";
        button.addEventListener("click", () => performQuiz(quiz));
        quizListElement.appendChild(button);
    });
}
/*function performQuiz(quiz) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("startQuizPage").style.display = "none";
    document.getElementById("createQuizPage").style.display = "none";
    document.getElementById("performQuizPage").style.display = "block";
    const quizQuestionsElement = document.getElementById("quizQuestions");
    quizQuestionsElement.innerHTML = "";

    for (let i = 0; i < quiz.questions.length; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${i + 1}. ${quiz.questions[i].question}</p>
            <label><input type="radio" name="q${i + 1}" value="${quiz.questions[i].options[0]}"> ${quiz.questions[i].options[0]}</label><br>
            <label><input type="radio" name="q${i + 1}" value="${quiz.questions[i].options[1]}"> ${quiz.questions[i].options[1]}</label><br>
            <label><input type="radio" name="q${i + 1}" value="${quiz.questions[i].options[2]}"> ${quiz.questions[i].options[2]}</label><br>
            <label><input type="radio" name="q${i + 1}" value="${quiz.questions[i].options[3]}"> ${quiz.questions[i].options[3]}</label><br>`;
        quizQuestionsElement.appendChild(questionDiv);
    }
}*/

function submitAnswers() {
    const quizQuestions = document.querySelectorAll('[name^="q"]');
    let score = 0;

    quizQuestions.forEach((question, index) => {
        const selectedOption = document.querySelector(`[name="q${index + 1}"]:checked`);

        if (selectedOption) {
            const userAnswer = selectedOption.value;
            const correctAnswer = quizzes[currentQuizIndex].questions[index].correctAnswer;

            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                score++;
            }
        }
    });
    const quizResultElement = document.getElementById("quizResult");
    quizResultElement.textContent = `Your Score: ${score}/${quizzes[currentQuizIndex].questions.length}`;
}


function displayQuizList() {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const quizListElement = document.getElementById("quizList");
    quizListElement.innerHTML = "";
    quizzes.forEach((quiz) => {
        const div = document.createElement("div");
        div.textContent = quiz.questions.length > 0 ? quiz.questions[0].question : "No questions available";
        quizListElement.appendChild(div);
    });
}
