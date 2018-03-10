import objects, {initObjects} from '../objects'
import state, {initState} from '../state'
import GameButton from '../objects/Button/Button'

export const endGame = (game) => {
  game.paused = true

  objects.buttonRestart = new GameButton({game:game, onClick: () => restartGame(game), name:'restart' })
  objects.buttonRestart.create()
}

export const restartGame = (game) => {
  game.paused = false
  initObjects()
  initState()
  game.state.restart(true, true)
  state.gameState = 'started'
}
