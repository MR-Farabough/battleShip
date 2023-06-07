import { Gameboard, Ship } from "./index.js"

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
const squareArray = []
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
            squareArray.push(div)
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
    const card = Gameboard()
    let count = 1
    while (count < 6) {
        const positionData = card[`ship${count}`]
        const positisonCords = [positionData.startCord, positionData.endCord];
        const firstSquareSearchEnd = positisonCords[0][0]
        const firstSquareSearchStart = positisonCords[0][1]
        const secondSquareSearchEnd = positisonCords[1][0]
        const secondSquareSearchStart = positisonCords[1][1]
        let start = parseInt(`${firstSquareSearchStart - 1}${firstSquareSearchEnd - 1}`)
        let end = parseInt(`${secondSquareSearchStart - 1}${secondSquareSearchEnd - 1}`)
        squareArray[start].style.backgroundColor = 'blue'
        squareArray[end].style.backgroundColor = 'blue'
        console.log([start, end])
        count++
    }
    return card
}
createBoard(playerCard)
console.log(squareArray);
const playerBoard = renderShips()
// const botBoard = renderShips()
//TODO allow them to be dragged 
playBTN.addEventListener('click', () => {
    playBTN.remove()
    createBoard(botCard)
})