import {each, isArray} from '../libs/lodash'

// singleton namespace window.objects where all the game objects live
const objects = {}

// INIT LOGIC
// when calling initState(), window.objects object will come back to its initial state (important when restarting the game)
export const initObjects = () => {
  each(init, (value, prop) => {
    if (isArray(value)) objects[prop] = []
    else objects[prop] = value
  })
}

const init = {
  bg: null,
}

initObjects()

// making it available on the developer tool console
window.objects = objects

// exporting a variable that way ensure us the variable to be a singleton
export default objects
