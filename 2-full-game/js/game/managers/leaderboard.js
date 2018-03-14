import {random, orderBy, each} from '../../libs/lodash'

import state from '../state'
import objects from '../objects'

import {getUser, getAllUsers, createNewUser, setUserScore, saveUserScore} from './db'
import {getUserInfos} from './wechat'

// to display the leaderboard
export const displayLeaderboard = (game, callback) => {
  // get wechat user infos
  getUserInfos(infos => {
    // save score/create user if needed
    saveUserScore(infos, state.score, () => {
      // get best scores overall (that's where we should call wx.getFriendCloudStorage () instead if available to get our friends list that played the game)
      getBestScores(scores => {

        each(scores, (score, i) => {
          if (i > 5) return false
          console.log('each', i)
          let position = {x: (game.world.width / 2), y: (game.world.height / 2) + (35 * i) - 100}
          let text = game.add.text(position.x, position.y, `${score.name} - ${score.score}`, { fontSize: '25px', fill: '#fff' });
          text.anchor.setTo(0.5, 0.5);
        })
        callback()
      })
    })
  })
}

export const getBestScores = callback => {
  getAllUsers(users => {
    let res = orderBy(users, ['score'], ['desc'])
    callback(res)
  })
}
