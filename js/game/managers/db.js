import AV from '../../libs/av-weapp'
import {each} from '../../libs/lodash'

AV.init({
 appId: 'QyNXyhk2rss5mu96NqgBMRSi-gzGzoHsz',
 appKey: 'vvxe9iLyeQcQOUMKdkWGG9Y9'
})

export const getUser = (openid, callback) => {
  console.log('=> getUser')
  let query = new AV.Query('Players');
  query.equalTo('openid', openid)
  query.first().then(user => {
      callback(user)
   })
}

export const getAllUsers = (callback) => {
  console.log('=> getAllUsers')
  let query = new AV.Query('Players');
  query.find().then(users => {
     let formattedUsers = []
     each(users, user => formattedUsers.push(user.attributes))
     callback(formattedUsers)
   })
}

export const createNewUser = (infos, callback) => {
  console.log('=> createNewUser')
  let Player = AV.Object.extend('Players')
  let player = new Player()
  player.set({
    'openid': infos.openid,
    'name': infos.name,
    'score': infos.score,
    'picture': infos.picture
  })
  player.save().then(e => {
    callback(e)
  })
}

export const setUserScore = (user, score, callback) => {
  // console.log('=> setUserScore', user)
  user.set('score', score)
  user.save().then(e => {
    console.log('=> setUserScore success',user.attributes.name, score)
    callback(e)
  })
}
