import {throttle, random} from '../../libs/lodash'
import objects from '../objects'
import state from '../state'
import Pipe from '../objects/Pipe/Pipe'

const generatePipe = (game) => {
  let pipe = new Pipe({game: game, position: random(state.pipePosMin, state.pipePosMax)})
  pipe.create()
  objects.pipes.push(pipe)

  setTimeout(() => {
    pipe.kill()
  }, 20000)
}

export const PipesGenerator = throttle(generatePipe, state.pipeGenerationTime)
