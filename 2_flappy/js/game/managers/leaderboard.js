import {random, isObject, orderBy} from '../../libs/lodash'

import md5 from '../../libs/md5.min'

import state from '../state'
import objects from '../objects'

import {getUser, getAllUsers, createNewUser, setUserScore} from './db'


export const getUserInfos = callback => {
  console.log('getUserInfos')

  wx.login({
    success:() => {
      wx.getUserInfo({
        success: res => {
          callback({
            name: res.userInfo.nickName,
            picture: res.userInfo.avatarUrl,
            // no openid is provided here, so I created a unique id from md5 of some personal informations, its not perfect, but would do the trick
            openid: md5(`${res.userInfo.nickName}${res.userInfo.avatarUrl}${res.userInfo.city}${res.userInfo.country}${res.userInfo.province}${res.userInfo.gender}`)
          })
        }
      })
    }
  })
}

export const saveUserScore = (infos, score, callback) => {
  infos.score = score
  getUser(infos.openid, user => {
    if (!isObject(user)) createNewUser(infos, callback)
    else if (user.attributes.score < infos.score) setUserScore(user, infos.score, callback)
    else callback()
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
// console.log(2)
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
