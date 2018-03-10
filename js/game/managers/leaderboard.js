import {random, orderBy, each} from '../../libs/lodash'

import state from '../state'
import objects from '../objects'

import {getUser, getAllUsers, createNewUser, setUserScore, saveUserScore} from './db'
import {getUserInfos} from './wechat'

export const displayLeaderboard = (game, callback) => {
  getUserInfos(infos => {
    saveUserScore(infos, state.score, () => {
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

//
// HYDRATING WITH FAKE DATAS
//
setTimeout(() => {
  saveUserScore({
    name: 'Jack Ma',
    picture: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTInShcaY9KZ8ISG7pt9Pgt8rUuHlFMNAaBichHq3vFMGLwEmNLYlxNibNRC2n8I9xGbVSMOSaBuTGFA/0",
    openid: 'AAAAAA32321cahsadkfjhadgfa123133123',
  }, 3)

  saveUserScore({
    name: 'Ma Huateng',
    picture: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTInShcaY9KZ8ISG7pt9Pgt8rUuHlFMNAaBichHq3vFMGLwEmNLYlxNibNRC2n8I9xGbVSMOSaBuTGFA/0",
    openid: '2SSSSS3223dsaffsadkfjhadgfa123133123',
  }, 5)
}, 1000)
