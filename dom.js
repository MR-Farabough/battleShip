// import { Gameboard, Ship } from "./app.js"

const colorModeBTN = document.querySelector('.colorMode')
const header = document.querySelector('.header')
const title = document.querySelector('.title')
const gameBoard = document.querySelector('.game-boards')
const playerCard = document.querySelector('.card-one')
const botCard = document.querySelector('.card-two')
const body = document.querySelector('body')
const player = document.querySelectorAll('.player')
const footer = document.querySelector('.footer')
const footerTitle = document.querySelector('.footer-title')
const githubLogo = document.querySelector('.github-logo')
const playBTN = document.querySelector('.play')
const elementArray = [
    colorModeBTN, title,
    gameBoard, playerCard,
    botCard, header, footer, 
    footerTitle, githubLogo, body ]


colorModeBTN.addEventListener('click', () => {
    const nextMode = colorModeBTN.textContent
    if (nextMode == 'Light Mode') {
        elementArray.forEach(element => {
            element.classList.remove('dark')
            element.classList.add('light')
        })
        colorModeBTN.textContent = 'Dark Mode'
    } else {
        elementArray.forEach(element => {
            element.classList.remove('light')
            element.classList.add('dark')
        })
        colorModeBTN.textContent = 'Light Mode'
    }
})

function createBoard(cardEl) {
    function createDiv() {
      const newDiv = document.createElement('div')
      newDiv.setAttribute('class', 'square')
      return newDiv
    }
    
    function generateSquares() {
        let count = 0
        while(count < 100) {
            const div = createDiv()
            div.style.height = '9%'
            div.style.width = '9%'
            div.style.minHeight = '15px'
            div.style.minWidth = '15px'
            div.style.border = '1px solid black'
            cardEl.append(div) 
            count++
        }
      }
    generateSquares()
    const divs = document.querySelectorAll('.square')
    let count = 0
    while (count < divs.length) {
        const divEL = divs[count]
        divEL.addEventListener('mouseover', () => {
            divEL.style.cursor = 'pointer'
        })
        count++
    }
}

function renderShips() {
    // const card = Gameboard()
    const card = 1
    return card
}
const playerBoard = renderShips()
const botBoard = renderShips()
createBoard(playerCard)
renderShips(playerCard)
//TODO allow them to be dragged 
playBTN.addEventListener('click', () => {
    playBTN.remove()
    createBoard(botCard)
})