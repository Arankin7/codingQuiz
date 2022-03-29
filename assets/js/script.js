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

var mixedQuestions, currentQuestionIndex;

var timeLeft;
var timeInterval;
var quizScore; 

var nameInput = document.querySelector("#name");
var highScoreEl = document.querySelector("#highScore");
var questionContainer = document.querySelector("#questionContainer");
const questionEl = document.getElementById('currentQuestion');
var startButton = document.querySelector("#startButton");
var nextButton = document.getElementById('nextButton');
var answerEl = document.querySelector("#answerButton");
var timerEl = document.querySelector("#countdown");

function pullHighScore(){
    window.localStorage.getItem('user');
    JSON.parse(window.localStorage.getItem('user'));
}


// Timer function
function countdown() {
    timeLeft = 59;

    timeInterval = setInterval(function(){
        quizScore = timeLeft;
        if (timeLeft >= 1){
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        else{
            timerEl.textContent = "Time Up!";
            endGame();
        }
    }, 1000);
};

function saveScore(){
    
    var highScore = {
        score: window.localStorage.getItem('user').score
    };

    if (quizScore > highScore.score){
        highScore.name = window.prompt("Enter your name")

        highScore.score = quizScore;
        window.alert("Great Job! You got a new High Score!")

        window.localStorage.setItem('user', JSON.stringify(highScore));

    }
    else if(quizScore < highScore.score){
        window.alert("Almost! Try again for the High Score")
    }
};

// Ends the game
function endGame (){
    resetState();
    questionEl.textContent = ("Your score is " + quizScore);
    startButton.classList.remove('hidden');
    startButton.textContent = 'Retry?';
    clearInterval(timeInterval);
    saveScore();  
};

// What happens when we click the start button. Starts the game
function startGame(){
    timeInterval = 59;
    console.log("Started game");
    startButton.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    nextButton.classList.remove('hidden'); 
    
    countdown();

    mixedQuestions = allQuestions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    nextQuestion();
};

// Advances to the next question. Clicking on the next button
function nextQuestion(){
    console.log("Next Question please");
    resetState();
    revealQuestion(mixedQuestions[currentQuestionIndex]);   
}

// resets the sate of the questions/answers
function resetState(){
    nextButton.classList.add('hidden');
    while (answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild)
    }
};

// When we select an answer
var selectAnswer = function(event){
    
    console.log(quizScore);

    const selectedButton = event.target;
    // const correctAnswer = selectedButton.dataset.correct;

    resetState();

    // setClassStatus(document.body, correctAnswer);
    // Array.from(answerEl.children).forEach(answButton => {
    //     setClassStatus(answButton, answButton.dataset.correct)
    // });

    // If a correct answer is chosen
    if(selectedButton.dataset.correct){
        timeLeft = timeLeft + 5;
        questionEl.textContent = ("Correct!");
        questionEl.classList.add('correct');
    }
    // If a wrong answer is chosen
    else if(!selectedButton.dataset.correct){
        timeLeft = timeLeft - 5;
        questionEl.textContent = ("Wrong!");
    }

    if(mixedQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hidden');
    }
    else {
        // END THE GAME
        endGame();
        
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
            answButton.dataset.correct = answer.correct;
        }
        answButton.addEventListener("click", selectAnswer)
        answerEl.appendChild(answButton);
    });
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    nextQuestion();
});

pullHighScore();
startButton.addEventListener("click", startGame);
answerEl.addEventListener("click", selectAnswer);