import {getCurrentTime} from './time'
import {throttle} from '../../libs/lodash'

export const updateDifficulty = () => {
  state.difficulty = (getCurrentTime() * state.difficultySpeed) / 100
}
