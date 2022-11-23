const question = document.querySelector('#question'); 
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const livesText = document.querySelector('#life');

let currentQuestion = {} 
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
//let lives = 3;

let questions = [
    {
        question: 'How many continents are there?',
        choice1: '5',
        choice2: '7',
        choice3: '8',
        choice4: '9',
        answer: 2,
    },
    {
        question:
            "What thin country accounts for more than half of the western coastline of South America?",
        choice1: "Chile",
        choice2: "Peru",
        choice3: "Ecuador",
        choice4: "Bolivia",
        answer: 1,
    },
    {
        question: "What is the world's largest island?",
        choice1: "Greenland",
        choice2: "New Guinea",
        choice3: "Madagascar",
        choice4: "Borneo",
        answer: 1,
    },
    {
        question: "Where is the world's largest desert?",
        choice1: "Gobi",
        choice2: "Xinjiang",
        choice3: "Kalahari",
        choice4: "Sahara",
        answer: 4,
    },
    {
        question: 'Approximately how far away is America from Europe?',
        choice1: '5,000 miles',
        choice2: '3,000 miles',
        choice3: '4,000 miles',
        choice4: '6,000 miles',
        answer: 3,
    },
    {
        question: "Where is the world's largest rainforest?",
        choice1: 'The Amazon',
        choice2: 'Central Africa',
        choice3: 'Equatorial Asia',
        choice4: 'Eastern Australia',
        answer: 1,
    },
    {
        question: 'Europe is made up of how many countries?',
        choice1: '51',
        choice2: '32',
        choice3: '44',
        choice4: '28',
        answer: 3,
    },
    {
        question: 'What is the name of the smallest country in the world?',
        choice1: 'The Vatican',
        choice2: 'Palau',
        choice3: 'Monaco',
        choice4: 'Montenegro',
        answer: 1,
    },
    {
        question:
            "What is the name of the largest ocean on Earth?",
        choice1: "Pacific Ocean",
        choice2: "Atlantic Ocean",
        choice3: "Indian Ocean",
        choice4: "None of the above",
        answer: 1,
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 9;
let LIFE_POINTS = 3;


startGame = () => {
    questionCounter = 0 // reset the question counter
    score = 0 // reset the score
    lives = 3 // reset the lives
    let sec = 30;
    availableQuestions = [...questions] // copy the questions array to the available questions array
    getNewQuestion() // get a new question
}

getNewQuestion = () => {
    if(lives === 0 || availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) { // if there are no more questions or we've reached the max number of questions
        localStorage.setItem('mostRecentScore', score) // save the score to local storage

        return window.location.assign('end.html') // go to the end page
    }

    questionCounter++ // increment the question counter
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` // update the progress text
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` // update the progress bar
    livesText.innerText = `Lives: ${lives}` // update the lives
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length) // get a random question
    currentQuestion = availableQuestions[questionsIndex] // get a random question
    question.innerText = currentQuestion.question // set the question text

    choices.forEach(choice => { // for each choice
        const number = choice.dataset['number'] // get the number of the choice
        choice.innerText = currentQuestion['choice' + number] // set the text of the choice
    })

    availableQuestions.splice(questionsIndex, 1) // remove the question from the available questions

    acceptingAnswers = true // allow the user to answer
}

function timer(){
    let sec = 30;
    var timer = setInterval(function(){
        document.getElementById('safeTimerDisplay').innerHTML='00:' + sec;
        sec--;
        if (sec < 0) {
            sec += 30;
            lives-=1;
            //  clearInterval(timer);
            
            getNewQuestion()
        } 
    }, 1000);
}
timer();



choices.forEach(choice => {
 // for each choice
    choice.addEventListener('click', e => { // when the choice is clicked
        if(!acceptingAnswers) return // if we're not accepting answers, return

        acceptingAnswers = false // we're no longer accepting answers
        const selectedChoice = e.target // get the selected choice
        const selectedAnswer = selectedChoice.dataset['number'] // get the number of the selected choice

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' // if the answer is correct, apply the correct class, otherwise apply the incorrect class

        if(classToApply === 'correct') { // if the answer is correct
            incrementScore(SCORE_POINTS) // increment the score     
        }
        else { // if the answer is incorrect
            decrementLives() // decrement the lives 
        }

        selectedChoice.parentElement.classList.add(classToApply) // add the class to the parent of the selected choice

        setTimeout(() => { // after 1 second
            selectedChoice.parentElement.classList.remove(classToApply) // remove the class from the parent of the selected choice
            getNewQuestion() // get a new question
            
        }, 1000) // after 1 second

    })
})

incrementScore = num => { // increment the score
    score +=num // add the number to the score
    scoreText.innerText = score // update the score text
}

decrementLives = num => { // decrement the lives
    lives -= 1 // subtract 1 life
    livesText.innerText = lives // update the lives text
}

startGame() // start the game


window.onload()