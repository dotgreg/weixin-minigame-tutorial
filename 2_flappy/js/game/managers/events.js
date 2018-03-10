import objects, {initObjects} from '../objects'
import state from '../state'
import GameButton from '../objects/Button/Button'

export const endGame = (game) => {
  game.paused = true

  objects.restart = new GameButton({game:game, onClick: () => restartGame(game), name:'restart' })
  objects.restart.create()
}

export const restartGame = (game) => {
  game.paused = false
  initObjects()
  game.state.restart(true, true)
  state.gameState = 'started'
}
