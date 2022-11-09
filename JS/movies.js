const question = document.querySelector('#question'); 
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {} 
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What movie features the line "I\'m going to make him an offer he can\'t refuse"?',
        choice1: 'The Godfather',
        choice2: ' The Godfather Part II',
        choice3: 'The Godfather Part III',
        choice4: 'The Godfather Part IV',
        answer: 1,
    },
    {
        question:
            "What yaer was the premier of the original Star Wars?",
        choice1: "1982",
        choice2: "1977",
        choice3: "1972",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "What flavor of Pop Tarts does Buddy the Elf use in his spaghetti in Elf? ",
        choice1: "Chocolate",
        choice2: "Strawberry",
        choice3: "Vanilla",
        choice4: "S'mores",
        answer: 1,
    },
    {
        question: "Who played Martin Luther King Jr. in the 2014 biopic Selma?",
        choice1: "James Bevel",
        choice2: "Tim Roth",
        choice3: "David Oyelowo",
        choice4: "Common",
        answer: 3,
    },
    {
        question: 'What is the highest-grossing R-rated movie of all time?',
        choice1: 'Deadpool',
        choice2: 'It',
        choice3: 'The Matrix Reloaded',
        choice4: 'Joker',
        answer: 4,
    },
    {
        question: 'In what 1979 James Bond movie does the famous spy go to outer space?',
        choice1: 'Goldfinger',
        choice2: 'Dr. No',
        choice3: 'The Spy Who Loved Me',
        choice4: 'Moonraker',
        answer: 4,
    },
    {
        question: 'Who is the only actor to receive an Oscar nomination for acting in a Lord of the Rings movie?',
        choice1: 'Elijah Wood',
        choice2: 'Viggo Mortensen',
        choice3: 'Ian McKellen',
        choice4: 'Sean Astin',
        answer: 3,
    },
    {
        question: "What TV show was Jack Nicholson referencing when he ad-libbed \"Here's Johnny!\" in The Shining?",
        choice1: 'The Tonight Show Starring Johnny Carson',
        choice2: 'A 1970s game show called The Joker\'s Wild',
        choice3: 'A Different World Starring John Ritter',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question: 'Who played park owner John Hammond in Jurassic Park?',
        choice1: 'Richard Attenborough',
        choice2: 'Tom Hanks',
        choice3: 'Harvey Keitel',
        choice4: 'Ed Harris',
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 9;

startGame = () => {
    questionCounter = 0 // reset the question counter
    score = 0 // reset the score
    availableQuestions = [...questions] // copy the questions array to the available questions array
    getNewQuestion() // get a new question
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) { // if there are no more questions or we've reached the max number of questions
        localStorage.setItem('mostRecentScore', score) // save the score to local storage

        return window.location.assign('end.html') // go to the end page
    }

    questionCounter++ // increment the question counter
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` // update the progress text
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` // update the progress bar
    
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

startGame() // start the game

