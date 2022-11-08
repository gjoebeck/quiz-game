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
        question: 'Can humans see the Great Wall of China from space?',
        choice1: 'Yes',
        choice2: 'No',
        choice3: 'Maybe',
        answer: 2,
    },
    {
        question:
            "What is the biggest planet in our solar system?",
        choice1: "Earth",
        choice2: "Jupiter",
        choice3: "Saturn",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "What is the heaviest organ in the human body?",
        choice1: "The heart",
        choice2: "The brain",
        choice3: "The lungs",
        choice4: "None of the above",
        answer: 4,
    },
    {
        question: "Which freezes faster, hot water or cold water?",
        choice1: "Hot water",
        choice2: "Cold water",
        choice3: "They freeze at the same rate",
        answer: 1,
    },
    {
        question: 'What is the only planet that spins clockwise?',
        choice1: 'Venus',
        choice2: 'Jupiter',
        choice3: 'Uranus',
        choice4: 'Saturn',
        answer: 1,
    },
    {
        question: 'Which blood type is the rarest in humans?',
        choice1: 'O',
        choice2: 'A',
        choice3: 'B',
        choice4: 'AB',
        answer: 4,
    },
    {
        question: "Gold can be created from other elements",
        choice1: "True",
        choice2: 'False',
        answer: 1,
    },
    {
        question: 'What is the only rock that floats?',
        choice1: 'Basalt',
        choice2: 'Granite',
        choice3: 'Obsidian',
        choice4: 'Pumice',
        answer: 4,
    },
    {
        question: 'Which is the most abundant element in the universe?',
        choice1: 'Hydrogen',
        choice2: 'Helium',
        choice3: 'Oxygen',
        choice4: 'Carbon',
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
