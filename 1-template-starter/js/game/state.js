import {each, isArray} from '../libs/lodash'

// singleton namespace window.state where all the game states and params live
const state = {}

// INIT LOGIC
// when calling initState(), window.state object will come back to its initial state (important when restarting the game)
export const initState = () => {
  each(init, (value, prop) => {
    if (isArray(value)) objects[prop] = []
    else state[prop] = value
  })
}

// initial state of the object
var init = {
  score: 0,
  speed: 5,
}

initState()

// making it available on the developer tool console
window.state = state

// exporting a variable that way ensure us the variable to be a singleton
export default state
