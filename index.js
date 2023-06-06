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
const elementArray = [
    colorModeBTN, title,
    gameBoard, playerCard,
    botCard, header, footer, 
    footerTitle, githubLogo, body ]


colorModeBTN.addEventListener('click', () => {
    const nextMode = colorModeBTN.textContent
    if (nextMode == 'Dark Mode') {
        elementArray.forEach(element => {
            element.classList.remove('dark')
            element.classList.add('light')
        })
        colorModeBTN.textContent = 'Light Mode'
    } else {
        elementArray.forEach(element => {
            element.classList.remove('light')
            element.classList.add('dark')
        })
        colorModeBTN.textContent = 'Dark Mode'
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
            div.style.height = '50px'
            div.style.width = '50px'
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
        divEL.addEventListener('click', () => {
        // check spot // hit square // etc.
        divEL.style.backgroundColor = 'blue'
        })
        count++
    }
}

createBoard(playerCard)
createBoard(botCard)