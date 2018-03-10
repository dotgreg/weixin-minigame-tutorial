import objects, {initObjects} from '../objects'
import state, {initState} from '../state'
import GameButton from '../objects/Button/Button'

export const endGame = (game) => {
  game.paused = true

  objects.buttonRestart = new GameButton({game:game, position:{x:0, y: -50}, onClick: () => restartGame(game), name:'restart' })
  objects.buttonRestart.create()

  objects.buttonLeaderboard = new GameButton({game:game, position:{x:0, y: 50}, onClick: () => openLeaderboard(game), name:'leaderboard' })
  objects.buttonLeaderboard.create()
}

export const restartGame = (game) => {
  game.paused = false
  initObjects()
  initState()
  game.state.restart(true, true)
  state.gameState = 'started'
}

export const openLeaderboard = (game) => {
  console.log('openLeaderBoard')
}
