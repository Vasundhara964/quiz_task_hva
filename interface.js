document.addEventListener('DOMContentLoaded', function() {
    var savedUsername = localStorage.getItem('savedUsername');
    document.getElementById('name_of_user').innerText =  savedUsername;
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        displayQuizzes();
    });

    document.addEventListener("DOMContentLoaded", function () {
        const addQuizDiv = document.getElementById("addQuizDiv");
        addQuizDiv.addEventListener("click", function() {
            window.location.href = "create.html";
        });
    });
    
    
    function displayQuizzes() {
        const quizzesContainer = document.getElementById("quizzesContainer");
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    
        quizzes.forEach((quiz, index) => {
            const quizDiv = document.createElement("div");
            quizDiv.classList.add("quiz");
            quizDiv.innerHTML = `
                <h1>${quiz.category}</h1>
                <p>Start -></p>
            `;
            quizzesContainer.appendChild(quizDiv);
        });
    }
    