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
        question: 'What is the oldest firearm in the world?',
        choice1: 'Hand Cannon',
        choice2: 'Chinese Fire Lance',
        choice3: 'The Flintlock',
        choice4: 'The Arquebus',
        answer: 2,
    },
    {
        question:
            "Where did the first modern Olympic Games take place?",
        choice1: "Athens",
        choice2: "Paris",
        choice3: "Sharjah",
        choice4: "London",
        answer: 1,
    },
    {
        question: "Who was the first person to fly solo around the world?",
        choice1: "Charles Lindbergh",
        choice2: "Wiley Hardeman Post",
        choice3: "Bessie Coleman",
        choice4: "Jimmy Doolittle",
        answer: 2,
    },
    {
        question: "Cats originally hail from which continent?",
        choice1: "Africa",
        choice2: "North America",
        choice3: "Europe",
        choice4: "Asia",
        answer: 4,
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
        question: 'Where was the kingdom of Pontus located?',
        choice1: 'Northeastern Turkey',
        choice2: 'Southern Greece',
        choice3: 'Southwestern Syria',
        choice4: 'Western France',
        answer: 1,
    },
    {
        question: 'Who was the first leader of the Ottoman Empire?',
        choice1: 'Suleiman the Magnificent',
        choice2: 'Murad I',
        choice3: 'Bayezid I',
        choice4: 'Osman I',
        answer: 4,
    },
    {
        question: 'When was Machu Picchu built?',
        choice1: '500 AD',
        choice2: 'The 13th Century',
        choice3: 'The 15th Century',
        choice4: 'The 10th Century',
        answer: 3,
    },
    {
        question: 'How long did the Han Dynasty rule over China?',
        choice1: '150 years',
        choice2: '300 years',
        choice3: '900 years',
        choice4: '400 years',
        answer: 4,
    },
    {
        question: 'Who is the only person to have win two unshared nobel prizes?',
        choice1: 'Gabriel García Márquez',
        choice2: 'Linus Pauling',
        choice3: 'John Steinbeck',
        choice4: 'Marie Curie née Skodowlska',
        answer: 2,
    },
    {
        question: 'Which Carthaginean general crossed the Alps with elephants?',
        choice1: 'Hasdrubal the Fair',
        choice2: 'Hannibal Barca',
        choice3: 'Mago',
        choice4: 'Hamilcar Barca',
        answer: 2,
    },
    {
        question: 'What year did the United States declare independence from Great Britain?',
        choice1: '1783',
        choice2: '1776',
        choice3: '1778',
        choice4: '1681',
        answer: 2,
    },

    {
        question: 'Who is the movie "The Revenant" based on?',
        choice1: 'Kit Carson',
        choice2: 'Jebediah Smith',
        choice3: 'Hugh Glass',
        choice4: 'Jim Bridger',
        answer: 3,
    },

    {
        question: 'Which empire ruled the largest contiguous land area in history?',
        choice1: 'The Mongol Empire',
        choice2: 'The Russian Empire',
        choice3: 'The Roman Empire',
        choice4: 'The Ottoman Empire',
        answer: 1,
    },

    {
        question: 'What was the first Chinese dynasty?',
        choice1: 'The Shang Dynasty',
        choice2: 'The Zhou Dynasty',
        choice3: 'The Qin Dynasty',
        choice4: 'The Xia Dynasty',
        answer: 4,
    },

    {
        question: ''
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20;
let LIFE_POINTS = 3;


startGame = () => {
    questionCounter = 0 // reset the question counter
    score = 0 // reset the score
    lives = 3 // reset the lives
    availableQuestions = [...questions] // copy the questions array to the available questions array
    getNewQuestion() // get a new question

}

getNewQuestion = () => {
    if (lives === 0 || availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) { // if there are no more questions or we've reached the max number of questions
        localStorage.setItem('mostRecentScore', score) // save the score to local storage
        return window.location.assign('end.html') // go to the end page
    }

    questionCounter++ // increment the question counter

    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` // update the progress text
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%` // update the progress bar
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
    // timer();
}

function timer() {
    let sec = 15;
    const timer = setInterval(function () {
        document.getElementById('safeTimerDisplay').innerHTML = '' + sec;
        sec--;

        choices.forEach(choice => {
            // for each choice
            choice.addEventListener('click', e => { // when the choice is clicked
                if (!acceptingAnswers) return // if we're not accepting answers, return

                acceptingAnswers = false // we're no longer accepting answers
                const selectedChoice = e.target // get the selected choice
                const selectedAnswer = selectedChoice.dataset['number'] // get the number of the selected choice

                let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' // if the answer is correct, apply the correct class, otherwise apply the incorrect class

                if (classToApply === 'correct') { // if the answer is correct
                    incrementScore(SCORE_POINTS) // increment the score    
                    const correctSound = new Audio('sound_effects/mixkit-correct-answer-tone-2870.wav') // play the correct sound
                    correctSound.volume = 0.2;
                    correctSound.play();
                    sec = 15;
                }
                else { // if the answer is incorrect
                    decrementLives() // decrement the lives 
                    const incorrectSound = new Audio('sound_effects/342756__rhodesmas__failure-01.wav') // play the incorrect sound
                    incorrectSound.volume = 0.4;
                    incorrectSound.play();
                    sec = 15;
                }

                selectedChoice.parentElement.classList.add(classToApply) // add the class to the parent of the selected choice

                setTimeout(() => { // after 1 second
                    selectedChoice.parentElement.classList.remove(classToApply) // remove the class from the parent of the selected choice
                    getNewQuestion() // get a new question

                }, 1000) // after 1 second
            })

        })


        if (sec < 0) {
            sec += 15;
            lives -= 1;
            //  clearInterval(timer);
            getNewQuestion()
        }

        if (sec < 4) {
            setTimeout(() => { // after 1 second
                const tickingSound = new Audio('sound_effects/last_three_seconds_ticks.wav') // play the ticking sound
                tickingSound.volume = 0.4;
                tickingSound.play();
            }, 1100)
        };


    }, 1000);




}
timer();



incrementScore = num => { // increment the score
    score += num // add the number to the score
    scoreText.innerText = score // update the score text
}

decrementLives = num => { // decrement the lives
    lives -= 1 // subtract 1 life
    livesText.innerText = lives // update the lives text
}

startGame() // start the game
window.addEventListener("DOMContentLoaded", event => { // when the DOM is loaded
    const audio = document.querySelector("audio"); // get the audio element
    audio.volume = 0.2; // set the volume
    audio.play(); // play the audio
});

window.onload();


