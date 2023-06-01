import { Ship } from "./index.js";

it ('Ship.hit SINK', () => { 
    expect(Ship(5,4).hit()).toBe(undefined)
})

it ('Ship.hit + 1', () => {
    expect(Ship(5,3).hit()).toBe(4)
})
