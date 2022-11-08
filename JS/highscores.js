const highScoresList = document.querySelector('#highScoresList') // This is the list of high scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [] // This is the array of high scores

highScoresList.innerHTML = // Set the inner HTML of the high scores list
highScores.map(score => { // Map the high scores array
    return `<li class="high-score">${score.name} - ${score.score}</li>` // Return the high score list item
}).join("") // Join the list items together