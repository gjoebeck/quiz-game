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
        question: 'The Olympics are held every how many years?',
        choice1: '6',
        choice2: '4',
        choice3: '3',
        choice4: '2',
        answer: 2,
    },
    {
        question: "Which NBA team has won the most championships?",
        choice1: " Los Angeles Lakers",
        choice2: " Boston Celtics",
        choice3: " Chicago Bulls",
        choice4: " Golden State Warriors",
        answer: 2,
    },
    {
        question: " Which NFL team has won the most Super Bowls?",
        choice1: " The New England Patriots",
        choice2: " The Dallas Cowboys",
        choice3: " The Pittsburgh Steelers",
        choice4: " The Green Bay Packers",
        answer: 4,
    },
    {
        question:  "Which boxer fought against Muhammad Ali and won?",
        choice1: " Joe Frazier",
        choice2: " George Foreman",
        choice3: " Mike Tyson",
        choice4: " Rocky Marciano",
        answer: 1,
    },
    {
        question: 'How many minutes was the longest recorded point in the history of tennis?',
        choice1: '5',
        choice2: '9',
        choice3: '29',
        choice4: '18',
        answer: 3,
    },
    {
        question: "What NFL team was originally called the New York Titans?",
        choice1: ' The New York Giants',
        choice2: ' The New York Jets',
        choice3: ' The New York Eagles',
        choice4: ' The new York Redskins',
        answer: 2,
    },
    {
        question: 'Who won the 2019 NBA Finals?',
        choice1: 'Golden State Warriors',
        choice2: 'Toronto Raptors',
        choice3: 'Los Angeles Lakers',
        choice4: 'Boston Celtics',
        answer: 2,
    },
    {
        question: 'Which sport is considered the most damaging to the brain?',
        choice1: 'Boxing',
        choice2: 'Football',
        choice3: 'Hockey',
        choice4: 'Rugby',
        answer: 2,
    },
    {
        question: "Which Martial Art is known as 'The art of 8 limbs?'",
        choice1: 'Karate',
        choice2: 'Taekwondo',
        choice3: 'Judo',
        choice4: 'Muay Thai',
        answer: 4,
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
    // timer();
}

function timer(){
    let sec = 15;
    const timer = setInterval(function(){
        document.getElementById('safeTimerDisplay').innerHTML='' + sec;
        sec--;

        choices.forEach(choice => {
            // for each choice
               choice.addEventListener('click', e => { // when the choice is clicked
                   if(!acceptingAnswers) return // if we're not accepting answers, return
           
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
            lives-=1;
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
    score +=num // add the number to the score
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


