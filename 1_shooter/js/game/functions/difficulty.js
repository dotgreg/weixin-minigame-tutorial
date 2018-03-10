import {getCurrentTime} from './time'
import {throttle, clamp} from '../../libs/lodash'

export const updateDifficulty = () => {
  state.difficulty.value = (getCurrentTime() * state.difficulty.speed) / 100
  state.difficulty.value = clamp(state.difficulty.value, 0, 20)
  state.difficulty.value = Math.round(state.difficulty.value)
}
