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
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question:
            "The tallest building in the world is located in which city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What percent of American adults believe that chocolate milk comes from brown cows?",
        choice1: "20%",
        choice2: "18%",
        choice3: "7%",
        choice4: "33%",
        answer: 3,
    },
    {
        question: "Approximately what percent of U.S. power outages are caused by squirrels?",
        choice1: "10-20%",
        choice2: "5-10%",
        choice3: "15-20%",
        choice4: "30%-40%",
        answer: 1,
    },
    {
        question: 'On what island did Ada Blackjack survive her harrowing ordeal?',
        choice1: 'Wake Island',
        choice2: 'Wrangel Island',
        choice3: 'Sentinel Island',
        choice4: 'Jarvis Island',
        answer: 2,
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
