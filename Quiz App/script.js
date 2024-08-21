const questions = [
    {
        question: "Which is the largest country in the world?",
        answers: [
            { text: "China", correct: false},
            { text: "The USA", correct: false},
            { text: "Brazil", correct: false},
            { text: "Russia", correct: true},
        ]
    },
    {
        question: "Which country borders Black sea?",
        answers: [
            { text: "Finland", correct: false},
            { text: "Spain", correct: false},
            { text: "Bulgaria", correct: true},
            { text: "Mexico", correct: false},
        ]
    },
    {
        question: "Which is the most populated country in the world?",
        answers: [
            { text: "China", correct: false},
            { text: "India", correct: true},
            { text: "The USA", correct: false},
            { text: "Russia", correct: false},
        ]
    },
    {
        question: "Which is not placed in Africa?",
        answers: [
            { text: "Algeria", correct: false},
            { text: "Angola", correct: false},
            { text: "Turkey", correct: true},
            { text: "Madagascar", correct: false},
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Nagasaki", correct: false},
            { text: "Kyoto", correct: false},
            { text: "Seoul", correct: false},
            { text: "Tokyo", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();