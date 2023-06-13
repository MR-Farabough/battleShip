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
const playerSquareArray = []
const botSquareArray = []
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

function createBoard(cardEl, board) {
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
            if (board == 'PLAYER') playerSquareArray.push(div)
            if (board == 'BOT') botSquareArray.push(div)
            cardEl.append(div)
            count++
        }
      }
    generateSquares()
}

function createBoat(cord, boardSide) {
    const cordDiv = document.createElement('div')
    cordDiv.setAttribute('class', 'ship')
    cordDiv.style.height = '100%'
    if (boardSide == 'PLAYER') {
        if (playerSquareArray[cord].childNodes.length < 1) {
            cordDiv.style.backgroundColor = 'blue'
            playerSquareArray[cord].appendChild(cordDiv)
        }
    } else if (boardSide == 'BOT') {
        if (botSquareArray[cord].childNodes.length < 1) {
            cordDiv.style.backgroundColor = 'grey'
            botSquareArray[cord].appendChild(cordDiv)
        }
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

function renderShips(board, boardSide) {
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
        generateBoat(start, end, boardSide)
        createBoat(end, boardSide)
        index++
    }
    return card
}

function getShipLength(ship) {
    let shipLength;
    if (ship == 1) {
        shipLength = 1
    } else if (ship == 2 || ship == 3) {
        shipLength = 2
    } else if (ship == 4) {
        shipLength = 3
    } else if (ship == 5) {
        shipLength = 4
    }
    return shipLength
}

const playerBoard = Gameboard()
const modalEl = document.querySelector('.modal')
const bgOpacity = document.querySelector('.backColor')
const nextBTN = document.querySelector('.nextBTN')
const inputEls = document.querySelectorAll('input')
let selectedShip;
let selectedInput;

inputEls.forEach(input => {
    input.addEventListener('input', () => {
        const shipIndex = Array.from(inputEls).indexOf(input) + 1
        const curShip = playerBoard[`ship${shipIndex}`]
        selectedInput = shipIndex
        selectedShip = curShip
        const value = input.value
        let valid = true
        function checkNum(value) {
            const alpha = [
            'A', 'B', 'C', 'D', 'E',
            'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e',
            'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o',
            'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z']
            if (value > 10 || value < 1) {
                input.value = ''
                input.placeholder = 'Number must be 1-10'
                input.style.border = '2px solid red'
                valid = false
            } else {
                valid = true
                input.style.border = '2px solid lightGreen'
            }
            alpha.forEach(letter => {
                if (value.includes(letter)) {
                    input.value = ''
                    input.placeholder = 'Must enter number'
                    input.style.border = '2px solid red'
                    valid = false
                }
            })
            if (value.length == 0) {
                valid = true
            }
        }
        checkNum(value)
        // Single Digit UX Control
        if (value.length == 1 && value > 1) {
            input.value += ','
        }
        // Second Digit UX Control
        if (value.includes(',') && value.length - 1 > value.indexOf(',')) {
            const secondNumberIndex = value.indexOf(',') + 1
            const secondNumber = value.slice(secondNumberIndex)
            checkNum(secondNumber)
        }

        function checkCords(cords) {
            let newSet = cords
            cords.forEach(cord => {
                cord.forEach(num => {
                    if (num > 10) {
                        const curArrNumIndex = cord.indexOf(num)
                        const subtract = cords[1][curArrNumIndex] - cords[0][curArrNumIndex]
                        newSet[1][curArrNumIndex] -= subtract * 2
                        const firstArrayCache = newSet[0]
                        const secondArrayCache = newSet[1]
                        newSet = [secondArrayCache, firstArrayCache]
                    }
                })
            })
            return newSet
        }

        function createCords(ship, cord) {
            const shipLength = getShipLength(ship)
            const firstCordNum1 = cord.slice(0, cord.indexOf(','))
            const firstCordNum2 = cord.slice(cord.indexOf(',') + 1)
            let newCords = [ 
                [parseInt(firstCordNum1), parseInt(firstCordNum2)],
                [parseInt(firstCordNum1) + shipLength, parseInt(firstCordNum2)]
            ]
            return checkCords(newCords)
        }
        function ghostRender(ship, cord) {
            if (cord.includes(',')) {
                document.querySelectorAll('.ship').forEach(ship => {
                    ship.remove()
                })
                const cords = createCords(ship,cord)
                playerBoard.move(`ship${shipIndex}`, cords)
                renderShips(playerBoard, 'PLAYER')
            }
        } 
        if (valid) ghostRender(shipIndex, value)
    })
    const rotateBtn = document.querySelector('.rotateBTN');
    rotateBtn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        const shipLevel = selectedShip.startCord[1] === selectedShip.endCord[1];
        const shipColumn = selectedShip.startCord[0] === selectedShip.endCord[0];
        if (shipLevel) {
            let endCord = selectedShip.endCord;
            const shipLength = Math.abs(selectedShip.endCord[0] - selectedShip.startCord[0]);
            endCord = [selectedShip.startCord[0], selectedShip.startCord[1] + shipLength];
            selectedShip.endCord = endCord;
            if (selectedShip.endCord[1] < selectedShip.startCord[1]) {
                const cache = selectedShip.startCord;
                selectedShip.startCord = selectedShip.endCord;
                selectedShip.startCord[1] += 1;
                selectedShip.endCord = cache;
            }
            document.querySelectorAll('.ship').forEach(ship => {
                ship.remove();
            });
            playerBoard.move(`ship${selectedInput}`, [selectedShip.startCord, selectedShip.endCord]);
            renderShips(playerBoard, 'PLAYER');
        } else if (shipColumn) {
            let endCord = selectedShip.endCord;
            const shipLength = Math.abs(selectedShip.endCord[1] - selectedShip.startCord[1]);
            endCord = [selectedShip.startCord[0] + shipLength, selectedShip.startCord[1]];
            selectedShip.endCord = endCord;
            if (selectedShip.endCord[0] < selectedShip.startCord[0]) {
                const cache = selectedShip.startCord;
                selectedShip.startCord = selectedShip.endCord;
                selectedShip.startCord[0] += 1;
                selectedShip.endCord = cache;
            }
            document.querySelectorAll('.ship').forEach(ship => {
                ship.remove();
            });
            renderShips(playerBoard, 'PLAYER');
        }
    });
})

nextBTN.addEventListener('click', () => {
    modalEl.childNodes.forEach(node => {
        modalEl.remove(node)
    })
    playBTN.classList.remove('deactive')
    bgOpacity.classList.remove('active')
    modalEl.classList.remove('active')
    bgOpacity.classList.add('deactive')
    modalEl.classList.add('deactive')
    renderShips(playerBoard, 'PLAYER')
})
createBoard(playerCardDOM, 'PLAYER')

playBTN.addEventListener('click', () => {
    playBTN.remove()
    createBoard(botCardDOM, 'BOT')
    const botBoard = Gameboard()
    renderShips(botBoard, 'BOT')
    playGame(playerBoard, botBoard)
})

function playGame(player, bot) {
    console.log(player, bot)
}