import { Gameboard } from "./index.js"

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
    let index = 1
    while (index < 6) {
        const positionData = card[`ship${index}`]
        const positisonCords = [positionData.startCord, positionData.endCord];
        const firstSquareSearchEnd = positisonCords[0][0]
        const firstSquareSearchStart = positisonCords[0][1]
        const secondSquareSearchEnd = positisonCords[1][0]
        const secondSquareSearchStart = positisonCords[1][1]
        let start = parseInt(`${firstSquareSearchStart - 1}${firstSquareSearchEnd - 1}`)
        let end = parseInt(`${secondSquareSearchStart - 1}${secondSquareSearchEnd - 1}`)
        squareArray[start].style.backgroundColor = 'blue'
        squareArray[end].style.backgroundColor = 'blue'
        const startLength = `${start}`.length
        const endLength = `${end}`.length
        let count = 0
        if (startLength == 1 && endLength == 1) {
            while (start < end) {
                squareArray[start].style.backgroundColor = 'blue'
                start++
            }
        } else if (startLength == 1) {
            const endString = end.toString()
            const endArray = []
            count = 0 
            while (count < 2) {
                endArray.push(endString[count])
                count++
            }
            let startIndex = endArray.indexOf(start.toString())
            startIndex == 1 ? startIndex = 0 : null 
            count = 0
            while (count < endArray[startIndex]) {
                squareArray[parseInt(`${count}${start}`)].style.backgroundColor = 'blue'
                count++
            }
        } else if (endLength == 1) {
            const startString = start.toString()
            const startArray = []
            count = 0 
            while (count < 2) {
                startArray.push(startString[count])
                count++
            }
            let endIndex = startArray.indexOf(end.toString())
            endIndex == 1 ? endIndex = 0 : null 
            count = 0
            while (count < startArray[endIndex]) {
                squareArray[parseInt(`${count}${end}`)].style.backgroundColor = 'blue'
                count++
            }
        } else if (startLength == 2 && endLength == 2) {
            const startString = start.toString()
            const endString = end.toString()
            const startArray = []
            const endArray = []
            count = 0
            while (count < 2) {
                startArray.push(startString[count])
                endArray.push(endString[count])
                count++
            }
            const firstDigitCheck = startArray[0] == endArray[0]
            const secondDigitCheck = startArray[1] == endArray[1]
            if (firstDigitCheck) {
                let incrementer = startArray[1]
                while (incrementer < endArray[1]) {
                    squareArray[parseInt(`${startArray[0]}${incrementer}`)].style.backgroundColor = 'blue'
                    incrementer++
                }
            } else if (secondDigitCheck) {
                let incrementer = startArray[0]
                while (incrementer < endArray[0]) {
                    squareArray[parseInt(`${incrementer}${endArray[1]}`)].style.backgroundColor = 'blue'
                    incrementer++
                }
            }
        }
        index++
    }
    return card
}
createBoard(playerCard)
const playerBoard = renderShips()
//TODO allow them to be dragged 
playBTN.addEventListener('click', () => {
    playBTN.remove()
    createBoard(botCard)
    const botBoard = renderShips()
})