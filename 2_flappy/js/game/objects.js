import {each, isArray} from '../libs/lodash'

const objects = {}

//
// INIT AND REINIT LOGIC
//

export const initObjects = () => {
  each(init, (value, prop) => {
    if (isArray(value)) objects[prop] = []
    else objects[prop] = value
  })
}

const init = {
  bird: null,
  bg: null,
  floor: null,
  pipes: [],
  buttonRestart: null,
  buttonLeaderboard: null,
  textScore: null
}

initObjects()

//
// exporting singleton object
//

window.objects = objects

export default objects
