var allQuestions = [{
    question: 'What does HTML stand for?',
    choices: ['How to Make Lasagne', 'Hit the Mother Load ', 'HyperText Markup Language', 'HyperText Machine Learning'],
    correctAnswer: 2
    },
    {
    question: 'What does CSS stand for?',
    choices: ['Cool Shooting Stars', 'Cascading Style Sheets', 'Chicken Salad Sandwich', 'Character Select Screen'],
    correctAnswer: 1
    },
    {
    question: 'Which is an example of a pseudo class in CSS?',
    choices: ['<h3>', '<h6>', '<h20>', '<h1>'],
    correctAnswer: 3
    },
    {
    question: 'What time is it?',
    choices: ['color: blue', 'class = blue', 'button:hover', 'display: flex'],
    correctAnswer: 2
    },
    {
    question: 'Whick symbol is used to separate JavaScript statements?',
    choices: ['Semicolon (;)', 'Colon (:)', 'Comma (,)', 'None of the above'],
    correctAnswer: 0
    }
];

var questionTitle = document.querySelector("#currentQuestion");
var answerSelection = document.querySelector("#currentAnswers");
var button = document.querySelector("#startButton");
// var answers = document.querySelector("#option");


button.addEventListener("click", function(event){
    var answers = document.querySelector("#option");
    button = event.target;
    button.textContent = "hello";

});