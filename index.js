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
            startCord: [3,2],
            endCord: [5,2]},

        ship3: {
            startCord: [4,3],
            endCord: [6,3]},

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
        checkSpotAvailability(endCordOne, endCordTwo) {
            const newShipCoordinates = [endCordOne, endCordTwo];
            for (let count = 1; count <= 5; count++) {
              const existingShip = this[`ship${count}`];
              if (this.doCoordinatesOverlap(newShipCoordinates, existingShip)) {
                return false;
              }
            }
            return true;
        },
        doCoordinatesOverlap(newShipCoordinates, existingShip) {
            const [newStart, newEnd] = newShipCoordinates;
            const [existingStart, existingEnd] = [
              existingShip.startCord,
              existingShip.endCord,
            ];
            for (let col = newStart[0]; col <= newEnd[0]; col++) {
              for (let row = newStart[1]; row <= newEnd[1]; row++) {
                if (
                  col >= existingStart[0] &&
                  col <= existingEnd[0] &&
                  row >= existingStart[1] &&
                  row <= existingEnd[1]
                ) {
                  return true;
                }
              }
            }
            return false;
        },
        receiveAttack(cord) {
            let count = 1;
            while (count < 6) {
              const start = this[`ship${count}`].startCord;
              const end = this[`ship${count}`].endCord;
              const levelCheck = start[1] === end[1];
              const columnCheck = start[0] === end[0];
          
              if ((levelCheck && cord[1] >= Math.min(start[1], end[1]) && cord[1] <= Math.max(start[1], end[1]) && cord[0] >= Math.min(start[0], end[0]) && cord[0] <= Math.max(start[0], end[0])) ||
                  (columnCheck && cord[0] === start[0] && cord[1] >= Math.min(start[1], end[1]) && cord[1] <= Math.max(start[1], end[1]))) {
                shipArr[count - 1].hit();
                if (shipArr[count - 1].isSunk()) {
                  console.log(`Ship ${count} is sunk!`);
                }
                return 'HIT';
              }
              count++;
              if (count === 6) {
                this.missedShots.push(cord);
                return 'MISS';
              }
            }
        },                                   
        move(ship, [endCordOne, endCordTwo]) {
            if (!this.checkSpotAvailability(endCordOne, endCordTwo)) {
                return 'MOVE FAILURE'
            }
            this[ship].startCord = endCordOne
            this[ship].endCord = endCordTwo
            return 'MOVE SUCCESSFUL'
        }
    }
    return obj
}