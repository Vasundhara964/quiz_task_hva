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
            <input type="text" placeholder="Option 4" id="option4_${i + 1}">
            <input type="text" placeholder="Correct Answer" id="correctAnswer_${i + 1}">`;

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
        const correctAnswer = document.getElementById(`correctAnswer_${i + 1}`).value;

        if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
            alert("Please fill in all fields for question " + (i + 1));
            return;
        }

        const questionObject = {
            question,
            options: [option1, option2, option3, option4],
            correctAnswer,
        };

        quiz.questions.push(questionObject);
    }

    saveQuizToLocalStorage(quiz);
    alert("Quiz saved successfully!");
    window.location.href = "interface.html";
}

function saveQuizToLocalStorage(quiz) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(quiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
}
