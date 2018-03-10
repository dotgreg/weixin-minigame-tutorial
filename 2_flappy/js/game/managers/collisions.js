import objects from '../objects'
import state from '../state'

export const collisionWithPipe = (sprite1, sprite2) => {
  // console.log('collisionWithPipe', sprite1, sprite2)
  sprite1.kill()
  state.gameState = 'ended'
}

export const collisionWithFloor = (sprite1) => {
  sprite1.kill()
  state.gameState = 'ended'
}
