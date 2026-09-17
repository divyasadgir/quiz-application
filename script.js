// ================================
// QUIZ QUESTIONS
// ================================

const questions = [
    {
        question: "Which language is mainly used to make a webpage interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling a webpage?",
        options: ["Python", "CSS", "Java", "C++"],
        answer: "CSS"
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: ["//", "##", "<!-- -->", "**"],
        answer: "//"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["variable", "var", "define", "value"],
        answer: "var"
    }
];


// ================================
// VARIABLES
// ================================

let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let timeLeft = 10;
let timer;


// ================================
// HTML ELEMENTS
// ================================

const startBox = document.getElementById("start-box");
const startButton = document.getElementById("start-btn");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

const nextButton = document.getElementById("next-btn");

const timerElement = document.getElementById("timer");
const questionNumber = document.getElementById("question-number");

const progressBar = document.getElementById("progress-bar");

const feedbackElement = document.getElementById("feedback");

const scoreElement = document.getElementById("score");
const correctAnswersElement =
    document.getElementById("correct-answers");

const restartButton = document.getElementById("restart-btn");


// ================================
// START QUIZ
// ================================

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    selectedAnswer = "";

    startBox.classList.add("hidden");

    quizBox.classList.remove("hidden");

    resultBox.classList.add("hidden");

    showQuestion();
}


// ================================
// SHOW QUESTION
// ================================

function showQuestion() {

    clearInterval(timer);

    selectedAnswer = "";

    timeLeft = 10;

    timerElement.textContent = "⏱️ " + timeLeft;

    const current = questions[currentQuestion];

    // Question text
    questionElement.textContent = current.question;

    // Question number
    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;


    // Progress bar
    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";


    // Clear old options
    optionsElement.innerHTML = "";


    // Clear feedback
    feedbackElement.style.display = "none";
    feedbackElement.className = "";
    feedbackElement.textContent = "";


    // Create options
    current.options.forEach(function(option) {

        const button = document.createElement("button");

        button.classList.add("option");

        button.textContent = option;


        // Option click
        button.addEventListener("click", function() {

            // Remove selected class from all buttons
            document.querySelectorAll(".option").forEach(function(btn) {
                btn.classList.remove("selected");
            });


            // Select current button
            button.classList.add("selected");


            // Store answer
            selectedAnswer = option;


            // Show feedback
            if (selectedAnswer === current.answer) {

                feedbackElement.textContent =
                    "✅ Correct Answer!";

                feedbackElement.className =
                    "feedback-correct";

                feedbackElement.style.display = "block";

            } else {

                feedbackElement.textContent =
                    "❌ Wrong Answer! Correct answer: "
                    + current.answer;

                feedbackElement.className =
                    "feedback-wrong";

                feedbackElement.style.display = "block";
            }

        });


        optionsElement.appendChild(button);

    });


    // Start timer
    startTimer();
}


// ================================
// TIMER
// ================================

function startTimer() {

    timer = setInterval(function() {

        timeLeft--;

        timerElement.textContent =
            "⏱️ " + timeLeft;


        // Time finished
        if (timeLeft <= 0) {

            clearInterval(timer);

            nextQuestion();
        }

    }, 1000);
}


// ================================
// NEXT QUESTION
// ================================

function nextQuestion() {

    clearInterval(timer);


    // Check answer
    if (
        selectedAnswer ===
        questions[currentQuestion].answer
    ) {

        score++;

    }


    // Move to next question
    currentQuestion++;


    // More questions available
    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
}


// ================================
// SHOW RESULT
// ================================

function showResult() {

    clearInterval(timer);

    quizBox.classList.add("hidden");

    resultBox.classList.remove("hidden");


    // Calculate percentage
    const percentage =
        Math.round((score / questions.length) * 100);


    // Show score
    scoreElement.textContent =
        `Your Score: ${score} / ${questions.length} (${percentage}%)`;


    // Clear previous answers
    correctAnswersElement.innerHTML =
        "<h3>Correct Answers:</h3>";


    // Show all correct answers
    questions.forEach(function(question, index) {

        const answerDiv =
            document.createElement("div");

        answerDiv.classList.add("correct-answer");

        answerDiv.innerHTML =
            `<strong>Q${index + 1}:</strong> ${question.answer}`;

        correctAnswersElement.appendChild(answerDiv);

    });

}


// ================================
// RESTART QUIZ
// ================================

function restartQuiz() {

    clearInterval(timer);

    currentQuestion = 0;

    score = 0;

    selectedAnswer = "";

    resultBox.classList.add("hidden");

    quizBox.classList.add("hidden");

    startBox.classList.remove("hidden");

    progressBar.style.width = "0%";

    feedbackElement.textContent = "";

    feedbackElement.style.display = "none";
}


// ================================
// BUTTON EVENTS
// ================================

startButton.addEventListener(
    "click",
    startQuiz
);


nextButton.addEventListener(
    "click",
    nextQuestion
);


restartButton.addEventListener(
    "click",
    restartQuiz
);