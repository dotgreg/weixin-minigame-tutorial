import {throttle, random} from '../../libs/lodash'
import objects from '../objects'
import state from '../state'
import Pipe from '../objects/Pipe/Pipe'

// a function that generate a new pipe object every ${state.pipeGenerationTime} seconds
const generatePipe = (game) => {
  let pipe = new Pipe({game: game, position: random(state.pipePosMin, state.pipePosMax)})
  pipe.create()
  objects.pipes.push(pipe)
}

export const PipesGenerator = throttle(generatePipe, state.pipeGenerationTime)
