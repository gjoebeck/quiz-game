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
        question: 'Who founded Motown Records?',
        choice1: 'Berry Gordy',
        choice2: 'Clarence Avant',
        choice3: 'Smokey Robinson',
        choice4: 'Diana Ross',
        answer: 1,
    },
    {
        question:
            "Eminem's 8 mile is named after a road in which city?",
        choice1: "New York",
        choice2: "Chicago",
        choice3: "Detroit",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "Who was the lead singer of the band Queen?",
        choice1: "Paul McCartney",
        choice2: "Robert Plant",
        choice3: "Steven Tyler",
        choice4: "Freddie Mercury",
        answer: 4,
    },
    {
        question: "Art Garfunkel initially declined to sing one of Simon & Garfunkel's biggest hits solo. Which song is it?",
        choice1: "The Sound of Silence",
        choice2: "Mrs. Robinson",
        choice3: "Bridge Over Troubled Water",
        choice4: "The Boxer",
        answer: 3,
    },
    {
        question: 'Where was Tupac Shakur born?',
        choice1: 'New York',
        choice2: 'Los Angeles',
        choice3: 'Las Vegas',
        choice4: 'Tupelo, Mississippi',
        answer: 1,
    },
    {
        question: 'Michael Jackson was born in which US state?',
        choice1: 'California',
        choice2: 'Indiana',
        choice3: 'New York',
        choice4: 'Florida',
        answer: 2,
    },
    {
        question: "What is aphex twin's real name?",
        choice1: "Brian Peter George",
        choice2: 'Samuel Thomas Moore',
        choice3: 'Richard David James',
        choice4: 'Calvin Harris',
        answer: 3,
    },
    {
        question: 'Which composer composed baroque music?',
        choice1: 'Johann Sebastian Bach',
        choice2: 'Wolfgang Amadeus Mozart',
        choice3: 'Ludwig van Beethoven',
        choice4: 'Franz Liszt',
        answer: 1,
    },
    {
        question: 'In which country did the instrument called the erhu originate?',
        choice1: 'China',
        choice2: 'Japan',
        choice3: 'Vietnam',
        choice4: 'Korea',
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 9;
const LIFE_POINTS = 3;

startGame = () => {
    questionCounter = 0 // reset the question counter
    score = 0 // reset the score
    lives = 3 // reset the lives
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

choices.forEach(choice => { // for each choice
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

