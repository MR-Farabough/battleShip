export function Ship(length, timesHit = 0, sunk = false) {    
    return {
        length,
        timesHit,
        sunk,
        hit(isSunk = timesHit + 1 < this.length ? false : true) {
            if (!isSunk) return this.timesHit + 1
            //TODO handle a sunk ship
        }
    }
}

export function Gameboard() {
    const ship1 = Ship(2)
    const ship2 = Ship(3)
    const ship3 = Ship(3)
    const ship4 = Ship(4)
    const ship5 = Ship(5)
    const obj = {
        missedShots: [],
        ship1: {
            startCord: [1,1],
            endCord: [2,1]},

        ship2: {
            startCord: [3,2],
            endCord: [5,2]},

        ship3: {
            startCord: [4,3],
            endCord: [6,3]},

        ship4: {
            startCord: [8,1],
            endCord: [8,4]},

        ship5: {
            startCord: [1,5],
            endCord: [1,10]},
        // checkSpotAvailablity(newCord = [endCordOne, endCordTwo]) {
        //     let count = 1
        //     while (count < 6) {
        //         const startCord = this[`ship${count}`].startCord
        //         const endCord = this[`ship${count}`].endCord
        //         const levelCheck = startCord[1] == endCord[1]
        //         const columnCheck = startCord[0] == endCord[0]
        //         if (levelCheck) {
        //             count++
        //             console.log('Row Check',startCord, endCord)
        //             //TODO Check Row
        //         }
        //         if (columnCheck) {
        //             count++
        //             console.log('Column Check', startCord, endCord)
        //             //TODO Check Column 
        //         } else {count++}
        //     }
        // },
        receiveAttack(cord) {
            //TODO Updated 'hit' return
            let count = 1
            while (count < 6) {
                const start = this[`ship${count}`].startCord
                const end = this[`ship${count}`].endCord
                const levelCheck = start[1] == end[1]
                const columnCheck = start[0] == end[0]
                if (levelCheck && cord[1] == end[1]) {
                    count++
                    if (start[0] <= cord[0] && cord[0] <= end[0]) {
                        return 'HIT'
                    }
                } else if (columnCheck && cord[0] == end[0]) {
                    count++
                    if (start[1] <= cord[1] && cord[1] <= end[1]) {
                        return 'HIT'
                    }
                } 
                else {
                    count++
                }
                if (count == 6) {
                    this.missedShots.push(cord)
                    return this.missedShots
                }
            }
        },
        // move(ship, [endCordOne, endCordTwo]) {
        //     this.checkSpotAvailablity(ship, endCordOne, endCordTwo)
        //     //TODO Change the ships Cordinates if available. else null
        //     //TODO Write test case for ship movement => outcome
        // }
    }
    return obj
}