var allQuestions = [{
    question: 'What does HTML stand for?',
    choices: [
        {text: 'How to Make Lasagna', correct: false},
        {text: 'Hit the Mother Load', correct: false},
        {text: 'HyperText Markup Language', correct: true},
        {text: 'HyperText Machine Learning', correct: false}]
    },
    {
    question: 'What does CSS stand for?',
    choices: [
        {text: 'Cool Shooting Stars', correct: false},
        {text: 'Cascading Style Sheets', correct: true},
        {text: 'Chicken Salad Sandwich', correct: false},
        {text: 'Character Select Screen', correct: false}]
    },
    {
    question: 'Which heading is the largest?',
    choices: [
        {text: '<h3>', correct: false},
        {text: '<h6>', correct: false},
        {text: '<H20>', correct: false},
        {text: '<h1>', correct: true}]
    },
    {
    question: 'Which is an example of a pseudo class in CSS?',
    choices: [
        {text: 'color: blue', correct: false},
        {text: 'class = blue', correct: false},
        {text: 'button:hover', correct: true},
        {text: 'display: flex', correct: false}]
    },
    {
    question: 'Which symbol is used to separate JavaScript statements?',
    choices: [
        {text: 'Semicolon (;)', correct: true},
        {text: 'Colon (:)', correct: false},
        {text: 'Comma (,)', correct: false},
        {text: 'None of the above', correct: false}]
    }
];

var questionContainer = document.querySelector("#questionContainer");

var mixedQuestions, currentQuestionIndex;

const questionEl = document.getElementById('currentQuestion');


var startButton = document.querySelector("#startButton");
var nextButton = document.getElementById('nextButton');
var answerEl = document.querySelector("#answerButton");

// What happens when we click the start button. Starts the game
function startGame(){
    console.log("Started game");
    startButton.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    nextButton.classList.remove('hidden');  

    mixedQuestions = allQuestions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    nextQuestion();
}

// Advances to the next question. Clicking on the next button
function nextQuestion(){
    console.log("Next Question please");
    resetState();
    revealQuestion(mixedQuestions[currentQuestionIndex]);   
}

function resetState(){
    nextButton.classList.add('hidden');
    while (answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild)
    }
}
// When we select an answer
var selectAnswer = function(event){
    console.log("Selected an answer");

    const selectedButton = event.target;
    const correctAnswer = selectedButton.dataset.correct;

    setClassStatus(document.body, correctAnswer);
    Array.from(answerEl.children).forEach(answButton => {
        setClassStatus(answButton, answButton.dataset.correct)
    });

    if(mixedQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hidden')
    }
    else {
        // nextButton.classList.add('hidden');
        startButton.classList.remove('hidden');
        startButton.textContent = 'Retry?';
    }
}

function setClassStatus (element, correct){
    clearClassStatus(element);
    if(correct){
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearClassStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function revealQuestion(allQuestions){
    // Changes text to the questions from allQuestions
    questionEl.textContent = allQuestions.question;

    // populates answers to the answer buttons
    allQuestions.choices.forEach(answer => {
        const answButton = document.createElement('button');
        answButton.textContent = answer.text;
        answButton.classList.add('btn');
        if (answer.correct){
            answButton.dataset.correct = answer.correct
        }
        answButton.addEventListener("click", selectAnswer)
        answerEl.appendChild(answButton);
    });
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    nextQuestion();
});

startButton.addEventListener("click", startGame);
answerEl.addEventListener("click", selectAnswer);