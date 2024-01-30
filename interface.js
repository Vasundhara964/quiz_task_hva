document.addEventListener('DOMContentLoaded', function() {
    var savedUsername = localStorage.getItem('savedUsername');
    document.getElementById('name_of_user').innerText =  savedUsername;
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        displayQuizzes();
    });
    
    function displayQuizzes() {
        const quizzesContainer = document.getElementById("quizzesContainer");
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    
        quizzes.forEach((quiz, index) => {
            const quizDiv = document.createElement("div");
            quizDiv.classList.add("quiz");
            quizDiv.innerHTML = `
                <h1>${quiz.category}</h1>
                <p><a href="quiz.html?index=${index}">Start -></a></p>
            `;
            quizzesContainer.appendChild(quizDiv);
        });
    }
    