import objects from '../objects'
import state from '../state'

// when bird collision with pipe
export const collisionWithPipe = (sprite1, sprite2) => {
  // end the game and kill our bird :(
  sprite1.kill()
  state.gameState = 'ended'
}

// when bird collision with screen border, kill it too :(((
export const collisionWithBorders = (sprite1) => {
  sprite1.kill()
  state.gameState = 'ended'
}
