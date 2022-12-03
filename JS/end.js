const username = document.querySelector('#username') // This is the input field
const saveScoreBtn = document.querySelector('#saveScoreBtn') // This is the button
const finalScore = document.querySelector('#finalScore') // This is the span
const mostRecentScore = localStorage.getItem('mostRecentScore') // This is the score from the game.js file
const muteMusic = document.querySelector('#muteMusic') // This is the toggle music button
const highScores = JSON.parse(localStorage.getItem('highScores')) || [] // This is the array of high scores

const MAX_HIGH_SCORES = 5 // This is the max number of high scores
let counter = 0;
finalScore.innerText = mostRecentScore // Set the final score text to the most recent score

username.addEventListener('keyup', () => { // When the user types in the username field
    saveScoreBtn.disabled = !username.value // Disable the save button if the username field is empty
})

saveHighScore = e => { // This function saves the high score
    e.preventDefault() // Prevent the default action

    const score = { // This is the score object
        score: mostRecentScore, // The score is the most recent score
        name: username.value // The name is the value of the username field
    }

    highScores.push(score) // Push the score object to the high scores array

    highScores.sort((a, b) => { // Sort the high scores array
        return b.score - a.score // Sort the high scores array
    })

    highScores.splice(5) // Remove the last item in the array

    localStorage.setItem('highScores', JSON.stringify(highScores)) // Save the high scores array to local storage  
    window.location.assign('/') // Go to the home page


}

window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    audio.volume = 0.2;
    audio.play();
});

muteMusic.addEventListener('click', event => {
    counter++
    const audio = document.querySelector("audio");
    if (counter % 2 == 0) {
        audio.volume = 0.2;
        audio.play();
    } else {
        audio.volume = 0.0;
        audio.pause();
        sound.currentTime = 0;
    }
});


