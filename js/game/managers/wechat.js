import md5 from '../../libs/md5.min'

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
