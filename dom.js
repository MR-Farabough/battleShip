import { Gameboard } from "./index.js"

const colorModeBTN = document.querySelector('.colorMode')
const header = document.querySelector('.header')
const title = document.querySelector('.title')
const gameBoardDOM = document.querySelector('.game-boards')
const playerCardDOM = document.querySelector('.card-one')
const botCardDOM = document.querySelector('.card-two')
const body = document.querySelector('body')
const player = document.querySelectorAll('.player')
const footer = document.querySelector('.footer')
const footerTitle = document.querySelector('.footer-title')
const githubLogo = document.querySelector('.github-logo')
const playBTN = document.querySelector('.play')
const squareArray = []
const shipArr = []
const shipObj = {
    'ship1' : [],
    'ship2' : [],
    'ship3' : [],
    'ship4' : [],
    'ship5' : [],
}
const elementArray = [
    colorModeBTN, title,
    gameBoardDOM, playerCardDOM,
    botCardDOM, header, footer, 
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
}

function createBoat(cord, ship) {
    const cordDiv = document.createElement('div')
    cordDiv.style.cursor = 'move'
    cordDiv.style.backgroundColor = 'blue'
    cordDiv.setAttribute('draggable', true)
    cordDiv.setAttribute('class', 'ship')
    cordDiv.style.height = '100%'
    if (squareArray[cord].childNodes.length < 1) {
        squareArray[cord].appendChild(cordDiv)
        shipArr.push([ship, cord])
    }
}

function generateBoat(start, end, ship) {
    const startLength = `${start}`.length
    const endLength = `${end}`.length
    let incrementer;
    let count = 0
    const startString = start.toString()
    const startArray = []
    const endString = end.toString()
    const endArray = []
    if (startLength == 1 && endLength == 1) {
        while (start < end) {
            createBoat(start, ship)
            start++
        }
    } else if (startLength == 1) {
        while (count < 2) {
            endArray.push(endString[count])
            count++
        }
        let startIndex = endArray.indexOf(startString)
        startIndex == 1 ? startIndex = 0 : null
        count = 0
        while (count < endArray[startIndex]) {
            createBoat(parseInt(`${count}${start}`), ship)
            count++
        }
    } else if (endLength == 1) {
        while (count < 2) {
            startArray.push(startString[count])
            count++
        }
        let endIndex = startArray.indexOf(endString)
        endIndex == 1 ? endIndex = 0 : null 
        count = 0
        while (count < startArray[endIndex]) {
            createBoat(parseInt(`${count}${end}`), ship)
            count++
        }
    } else if (startLength == 2 && endLength == 2) {
        while (count < 2) {
            startArray.push(startString[count])
            endArray.push(endString[count])
            count++
        }  
        const firstDigitCheck = startArray[0] == endArray[0]
        const secondDigitCheck = startArray[1] == endArray[1]
        if (firstDigitCheck) {
            incrementer = startArray[1]
            while (incrementer < endArray[1]) {
                createBoat(parseInt(`${startArray[0]}${incrementer}`), ship)
                incrementer++
            }
        } else if (secondDigitCheck) {
            incrementer = startArray[0]
            while (incrementer < endArray[0]) {
                createBoat(parseInt(`${incrementer}${endArray[1]}`), ship)
                incrementer++
            }
        }
    }
}

function renderShips(board) {
    const card = board
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
        generateBoat(start, end, `ship${index}`)
        createBoat(end, `ship${index}`)
        index++
    }
    return card
}

function convertShipArr() {
    shipArr.forEach(ship => {
        shipObj[ship[0]].push(ship[1])
    })
}

playBTN.addEventListener('click', () => {
    playBTN.remove()
    createBoard(botCardDOM)
    const botBoard = Gameboard()
    renderShips(botBoard)
})

createBoard(playerCardDOM)
const playerBoard = Gameboard()
renderShips(playerBoard)
convertShipArr()

console.log(shipObj)

const draggables = document.querySelectorAll('.ship')
const boardCords = document.querySelectorAll('.square')
let currentShipCords = []
let prevSquare;
let currentShip;
draggables.forEach(drag => {
    drag.addEventListener('dragstart', () => {
        squareArray.forEach(square => {
            // Get the square you are dragging
            if (square.contains(drag)) {
                prevSquare = squareArray.indexOf(square)
            }
        })
        // Get current ship cords
        let count = 1
        while (count < 6) {
            if (shipObj[`ship${count}`].includes(prevSquare)) {
                currentShipCords = shipObj[`ship${count}`]
                currentShip = `ship${count}`
            }
            count++
        }
        // Add dragging class to ship on certain cord
        currentShipCords.forEach(cord => {
            if(squareArray[cord].childNodes.length > 0) {
                squareArray[cord].childNodes[0].classList.add('dragging')
            }
        })
    })
})

draggables.forEach(drag => {
    drag.addEventListener('dragend', () => {
        drag.classList.remove('dragging')
    })
})

boardCords.forEach(cord => {
    cord.addEventListener('dragover', () => { 
        if (cord.childNodes.length == 0) {
        const draggingList = document.querySelectorAll('.dragging')
        const newCord = squareArray.indexOf(cord)
        const difference = newCord - prevSquare
        const newCordNums = []
        const newCords = []
        const prevCords = []
        shipObj[currentShip].forEach(ship => {
            newCordNums.push(ship + difference)
        })
        draggingList.forEach(drag => {
            prevCords.push(drag.parentElement)
        })
        newCordNums.forEach(num => {
            newCords.push(squareArray[num])
        })
        let count = 0
        while(count < prevCords.length) {
            const shipSquare = prevCords[count].childNodes[0]
            newCords[count].append(shipSquare)
            count++
        }
        //TODO get the cords of new position
        const startString = newCordNums[0].toString()
        const endString = newCordNums[newCordNums.length-1].toString()
        const startCord = []
        const endCord = []
        if (startString.length == 1) {
            startCord.push(newCordNums[0] + 1, 1)
        } else if (startString.length == 2) {
            startCord.push(parseInt(startString[1]) + 1, parseInt(startString[0]) + 1)
        }
        if (endString.length == 1) {
            endCord.push(newCordNums[newCordNums.length-1] + 1, 1)
        } else if (endString.length == 2) {
            endCord.push(parseInt(endString[1]) + 1,parseInt(endString[0]) + 1)
        }
        if (playerBoard.move(currentShip, [startCord, endCord]) == 'MOVE SUCCESSFUL') {
            console.log(currentShip, [startCord, endCord])
            playerBoard.move(currentShip, [startCord, endCord])
            console.log(playerBoard)
            renderShips(playerBoard)
        } 
    }
    })
})