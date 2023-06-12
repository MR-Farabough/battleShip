import { Ship, Gameboard } from "./index.js";

it ('Ship.hit SUNK', () => { 
    expect(Ship(5,4).hit())
    .toBe('SUNK')
})

it ('Ship.hit + 1', () => {
    expect(Ship(5,3).hit().timesHit)
    .toBe(4)
})

it ('Gamboard receiveAttack (hit 1)', () => {
    expect(Gameboard().receiveAttack([1,10]))
    .toBe('HIT')
})

it ('Gameboard receiveAttack (hit 2)', () => {
    expect(Gameboard().receiveAttack([3,5]))
    .toBe('MISS')
})

it ('Gamboard receiveAttack (miss 1)', () => {
    expect(Gameboard().receiveAttack([5,5]))
    .toEqual('MISS')
})

it ('Gamboard receiveAttack (miss 2)', () => {
    expect(Gameboard().receiveAttack([10,5]))
    .toEqual('MISS')
})

it ('Gamboard receiveAttack (miss 3)', () => {
    expect(Gameboard().receiveAttack([3,5]))
    .toEqual('MISS')
})

it ('Gameboard.move (row fail)', () => {
    expect(Gameboard().move('ship1', [[1,7],[1,8]]))
    .toEqual('MOVE FAILURE')
})

it ('Gamboard.move (column fail)', () => {
    expect(Gameboard().move('ship5', [[8,4], [8,8]]))
    .toBe('MOVE FAILURE')
})

it ('Gamboard.move (FAILURE move)', () => {
    expect(Gameboard().move('ship1', [[2,2], [3,3]]))
    .toBe('MOVE FAILURE')
})

it ('Gameboard.move (MOVE SUCCESS)', () => {
    expect(Gameboard().move(`ship3`, [[5,7],[8,7]]))
    .toBe('MOVE SUCCESSFUL')
})

it ('Checkend method (GAME ON)', () => {
    expect(Gameboard().checkEnd())
    .toBe(false)
})

it ('Checkend method (GAME OVER)', () => {
    function check() {
        const shipArr = [
            Ship(2,1), Ship(3,2), 
            Ship(3,2), Ship(4,3), 
            Ship(5,4)]
        shipArr.forEach(ship => ship.hit())
        let count = 0
        let end = 0
        while (count < shipArr.length) {
            if (shipArr[count].sunk == true) {
                end += 1
            }
            count++
        }
    return end
    }
    expect(check()).toBe(5)
})