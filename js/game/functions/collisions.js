import objects from '../objects'
import state from '../state'
import Enemy from '../objects/Enemy/Enemy'

export const collisionWithPlane = (sprite1, sprite2) => {
  // console.log('collisionWithPlane', sprite1, sprite2)
  sprite1.kill()

  state.lifes -= 1
  if (state.lifes < 1) objects.text.lifes.text = 'GAME OVER'
}

export const collisionWithBullet = (sprite1, sprite2) => {
  // console.log('collisionWithBullet', sprite1, sprite2)
  sprite2.kill()
  sprite1.kill()

  state.score += 1
  objects.text.score.text = `score: ${state.score}`
}
