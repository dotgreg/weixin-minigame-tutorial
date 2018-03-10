import {each, isArray} from '../libs/lodash'

const state = {}

//
// INIT LOGIC
//

export const initState = () => {
  each(init, (value, prop) => {
    if (isArray(value)) objects[prop] = []
    else state[prop] = value
  })
}

var init = {
  gravity: 800,
  gravityJump: 400,
  pipePosMax: 150,
  pipePosMin: -150,
  score: 0,
  speed: 5,
  pipeGenerationTime: 1500,
  gameState: 'started'
}

initState()


window.state = state

export default state
