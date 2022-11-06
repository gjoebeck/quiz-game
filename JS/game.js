const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let available = [];

let questions = [
    {
        question: 'On what island did Ada Blackjack survive her harrowing ordeal?',
        choice1: 'Wake Island',
        choice2: 'Wrangel Island',
        choice3: 'Sentinel Island',
        choice4: 'Jarvis Island',
        answer: 'Wrangel Island'
    },
    {
        question: 'Where was the kingdom of Pontus located?',
        choice1: 'Northeastern Turkey',
        choice2: 'Southern Greece',
        choice3: 'Southwestern Syria',
        choice4: 'Western France',
        answer: 'Northeastern Turkey'
    },
    {
        question: 'Who was the first leader of the Ottoman Empire?',
        choice1: 'Suleiman the Magnificent',
        choice2: 'Murad I',
        choice3: 'Bayezid I',
        choice4: 'Osman I',
        answer: 'Osman I'
    },
    {
        question: 'When was Machu Picchu built?',
        choice1: '500 AD',
        choice2: 'The 13th Century',
        choice3: 'The 15th Century',
        choice4: 'The 10th Century',
        answer: 'The 15th Century'
    },
    {
        question: 'How long did the Han Dynasty rule over China?',
        choice1: '150 years',
        choice2: '300 years',
        choice3: '900 years',
        choice4: '400 years',
        answer: '400 years'
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: ''
    },
]