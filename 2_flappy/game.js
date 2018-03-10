import './js/libs/weapp-adapter'
import './js/libs/symbol'
import './js/libs/stub'
import {ajax} from './js/libs/nanoajax'
import AV from './js/libs/av-weapp'

// import the states
import * as phases from './js/game/phases'

// Initialize the Game object
window.PIXI = require('./js/libs/pixi.min')
window.p2 = require('./js/libs/p2')
window.Phaser = require('./js/libs/phaser-split.min')

var aspect = window.innerWidth / window.innerHeight
var gameWidth = 640
var gameHeight = gameWidth / aspect

var game = new Phaser.Game({
  width: gameWidth,
  height: gameHeight,
  renderer: Phaser.CANVAS,
  canvas: canvas,
  state: {
    preload: phases.preload.bind(this),
    create: phases.create.bind(this),
    update: phases.update.bind(this),
    render: phases.render.bind(this),
    shutdown: phases.shutdown.bind(this),
    restart: phases.restart.bind(this),
  }
})

console.log(AV)

AV.init({
 appId: 'QyNXyhk2rss5mu96NqgBMRSi-gzGzoHsz',
 appKey: 'vvxe9iLyeQcQOUMKdkWGG9Y9',
});

// var TestObject = AV.Object.extend('Players');
//
//  var number = 2014;
//  var string = 'famous film name is ' + number;
//  var date = new Date();
//  var array = [string, number];
//  var object = { number: number, string: string };
 //
 // var testObject = new TestObject();
 // testObject.set('testNumber', number);
 // testObject.set('testString', string);
 // testObject.set('testDate', date);
 // testObject.set('testArray', array);
 // testObject.set('testObject', object);
 // testObject.set('testNull', null);
 // testObject.save().then(function(testObject) {
 //   console.log(testObject)
 // }, function(error) {
 //   console.log(error)
 // });

 var query = new AV.Query('Players');
 query.include('testNumber');
 query.include('testString');
 query.descending('createdAt');
 query.find().then(function (products) {
      // 查询到商品后，在前端展示到相应的位置中。
      console.log(products)
 }).catch(function(error) {
   alert(JSON.stringify(error));
 });

// Phaser.Game.pause()
// https://jsonplaceholder.typicode.com/posts/1
ajax({url:'https://jsonplaceholder.typicode.com/posts/1'}, function (code, responseText) { console.log(code, JSON.parse(responseText)) })

// console.log(wx)
wx.login({
  success: function () {
    wx.getUserInfo({
      success: function (i) {
        console.log(i)
      }
    })
  }
})

// wx.getSetting({
//   success: function (res) {
//     var authSetting = res.authSetting
//     if (authSetting['scope.userInfo'] === true) {
//       // 用户已授权，可以直接调用相关 API
//     } else if (authSetting['scope.userInfo'] === false){
//       // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
//     } else {
//       // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
//     }
//   }
// })
