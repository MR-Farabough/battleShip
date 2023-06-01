export function Ship(length, timesHit = 0, sunk = false) {    
    return {
        length,
        timesHit,
        sunk,
        hit(isSunk = timesHit + 1 < this.length ? false : true) {
            if (!isSunk) return this.timesHit + 1
            // handle a sunk ship
        }
    }
}

const shipOne = Ship(2)
const shipTwo = Ship(3)
const shipThree = Ship(3)
const shipFour = Ship(4)
const shipFive = Ship(5)
shipFive.hit()

console.log(shipFive)