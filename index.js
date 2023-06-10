export function Ship(length, timesHit = 0, sunk = false) {    
    return {
        length,
        timesHit,
        sunk,
        isSunk() {
            return this.timesHit + 1 === this.length
        },
        hit() {
            if (!this.isSunk()) {
                this.timesHit += 1
                return this
            }
            this.timesHit += 1,
            this.sunk = true
            return 'SUNK'
        }
    }
}

export function Gameboard() {
    const shipArr = [Ship(2),Ship(3),Ship(3),Ship(4),Ship(5)]
    const obj = {
        missedShots: [],
        ship1: {
            startCord: [1,1],
            endCord: [2,1]},

        ship2: {
            startCord: [3,3],
            endCord: [5,3]},

        ship3: {
            startCord: [4,5],
            endCord: [6,5]},

        ship4: {
            startCord: [8,1],
            endCord: [8,4]},

        ship5: {
            startCord: [1,6],
            endCord: [1,10]},
        checkEnd() {
            let count = 0
            let end = 0
            while (count < shipArr.length) {
                if (shipArr[count].sunk == true ) {
                    return end += 1
                }
                count++
            }
            return end == 5 ? true : false
        },
        checkSpotAvailablity(endCordOne, endCordTwo) {
            let count = 1
            let checkAvailable = true
            while (count < 6) {
                const shipStart = this[`ship${count}`].startCord
                const shipEnd = this[`ship${count}`].endCord
                const shipLevelCheck = shipStart[0] == shipEnd[0]
                const shipColumnCheck = shipStart[1] == shipEnd[1]
                const newCordLevelCheck = endCordOne[0] == endCordTwo[0]
                const newCordColumnCheck = endCordOne[1] == endCordTwo[1]
                if (shipLevelCheck) {
                    if (newCordColumnCheck && endCordOne[1] == shipStart[1]) {
                        checkAvailable = false
                    }
                    if (newCordLevelCheck && endCordOne[0] == shipStart[0]) {
                        checkAvailable = false
                    }
                } else if (shipColumnCheck) {
                    if (newCordColumnCheck && shipEnd[0] >= endCordOne[0]) {
                        checkAvailable = false
                    }
                    if (newCordLevelCheck && shipEnd[1] >= endCordOne[1]) {
                        checkAvailable = false
                    }
                }
                count++
            }
            return checkAvailable == false ? false : true
        },
        receiveAttack(cord) {
            let count = 1
            while (count < 6) {
                const start = this[`ship${count}`].startCord
                const end = this[`ship${count}`].endCord
                const levelCheck = start[0] == end[0]
                const columnCheck = start[1] == end[1]
                if (levelCheck && cord[0] == end[0]) {
                    if (start[1] <= cord[1] && cord[1] <= end[1]) {
                        if (shipArr[count - 1].hit() == 'SUNK') {
                            this[`ship${count}`].startCord = null
                            this[`ship${count}`].endCord = null
                        } else {
                            shipArr[count - 1] = shipArr[count - 1].hit()
                            return 'HIT'
                        }
                    }
                } else if (columnCheck && cord[1] == end[1]) {
                    if (start[0] <= cord[0] && cord[0] <= end[0]) {
                        if (shipArr[count - 1].hit() == 'SUNK') {
                            this[`ship${count}`].startCord = null
                            this[`ship${count}`].endCord = null
                        } else {
                            shipArr[count - 1] = shipArr[count - 1].hit()
                            return 'HIT'
                        }
                    }
                }
                count++
                if (count == 6) {
                    this.missedShots.push(cord)
                    return 'MISS'
                }
            }
        },
        move(ship, [endCordOne, endCordTwo]) {
            if (!this.checkSpotAvailablity(endCordOne, endCordTwo)) return 'MOVE FAILURE'
            this[ship].startCord = endCordOne
            this[ship].endCord = endCordTwo
            return 'MOVE SUCCESSFUL'
        }
    }
    return obj
}

const player = Gameboard()
const bot = Gameboard()
let turn = 'player'
switch (turn) {
    case 'player':
        player.checkEnd()
        // Wait for player input if game over is false
        //TODO Need to get input on board. 
            // Just use a basic one for now
        //TODO Check input is not already used

        turn = 'bot'
        break;

    case 'bot':
        bot.checkEnd()
        // Get bot input if game over is false
        botInput
        turn = 'player'
        break;
}

function botInput() {

}