import { Ship, Gameboard } from "./index.js";

it ('Ship.hit SINK', () => { 
    expect(Ship(5,4).hit()).toBe(undefined)
})

it ('Ship.hit + 1', () => {
    expect(Ship(5,3).hit()).toBe(4)
})

it ('Gamboard receiveAttack (hit 1)', () => {
    expect(Gameboard().receiveAttack([5,3]))
    .toBe('HIT')
})

it ('Gamboard receiveAttack (hit 2)', () => {
    expect(Gameboard().receiveAttack([1,10]))
    .toBe('HIT')
})

it ('Gamboard receiveAttack (miss 1)', () => {
    expect(Gameboard().receiveAttack([5,5]))
    .toEqual([[5,5]])
})

it ('Gamboard receiveAttack (miss 1)', () => {
    expect(Gameboard().receiveAttack([10,5]))
    .toEqual([[10,5]])
})

// it ('Gameboard.move', () => {
//     expect(Gameboard().move('ship1', [[1,1],[1,2]]))
//     .toBe('MOVE COMPLETE')
// })