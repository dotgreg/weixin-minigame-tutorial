# Preview

<img src="https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520918011451_record_180313_130658.gif" width="200">

# Introduction
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520937778203_file.png)


This repository contains a tutorial and a fully functional minigame demo of Flappy Bird using the web game engine Phaser.
The purpose is as an advanced proof of concept for LeWagon Minigame Course which will be held in March 2018 in Shanghai.
The current demo includes the following functionalities:

- A fully working integration of phaser 2.9 + pixiJs + p5 gravity engine (source: [littlee/wechat-small-game-phaser](https://github.com/littlee/wechat-small-game-phaser));
- An ES6-based scalable code structure (based on import/export features);
- Game functionalities used:
  - Animated Sprite based on JSON;
  - Imported textures;
  - Animations;
  - Arcade Gravity system;
  - Collision system, based on Arcade Gravity;
  - General leaderboard system based on Leancloud;
# Code Structure
    ├───game.js : main entry point, Phaser. Game main function declared here
    ├───game.json : minigame configuration
    ├───images : static assets repository
    └───js
        ├───game
        │   ├───managers : each manager is a set of functions
        │   │   ├───collisions.js : handles all collision events 
        │   │   ├───db.js : backend CRUD functions for leaderboard (based on Leancloud API)
        │   │   ├───events.js : main events of the game functions
        │   │   ├───generators.js : objects generators functions
        │   │   ├───leaderboard.js : functions that handle leaderboard and ranking algorithms
        │   │   ├───wechat.js : functions that handle WeChat-related API (getting user profile, user friends list etc...)
        │   └───objects : Each object is a Class, with its separated file
        │       ├───Background
        │       ├───Bird
        │       ├───Button
        │       ├───Floor
        │       ├───Pipe
        │       ├───objects.js : singleton namespace window.objects where all the game objects live
        │       ├───phases.js : different game phases (preload, create, update (called every frame), render (called every frame))
        │       └───state.js : singleton namespace window.state where all the game states and parameters live
        └───libs
            └───lodash-modules
# Tutorial
## Goals
1. How do WeChat minigames work?
2. Can I already code my own minigame? When will it be released?
3. What are the limitations? What are the acceptable expectations in terms of performance?
4. Are Web → Minigame and Minigame → Web conversions possible?
5. Getting started 
6. IDE & Debugging tools presentation
7. Making your Minigame Social: available APIs
8. Resources and links to get started
9. Some advice before you start
## 1) How do WeChat minigames work?

**Overall Architecture : Almost like web games**

Wechat Minigames are based on web technologies, the main language used is Javascript.
The system is similar to the one on the web: a canvas element is accessible and we can draw on it at every frame.
We have access to the WebGL API, and thus able to use the GPU for calculations using Shaders (GLSL language).


    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520915901001_file.png)


**But implementation ha****s** **some difference****s**

However, the WebGL and Canvas API implementation differ from the native web implementation you can find on most web browsers.
The running environment of the minigame is [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore?t=201832) on iOS, and [V8](https://developers.google.com/v8/index.html?t=201832) on Android. All of them are running environments without both BOM and DOM. There is no global document ad no window object. So, if you want to use the DOM API to create elements like Canvas and Image, it will throw an error.
More on [Official Minigame documentation (Chinese)](https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/base/adapter.html?t=201832).

**Web Libraries can get adapted to** **the** **Minigame environment**

To bridge the gap between web and minigame, the WeChat minigame team has been working on a special library**,** ****[weapp-adapter](https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/weapp-adapter.zip?t=201832).
The goal is to make web libraries compatible with Minigames. The current implementation of the library, however, is still imperfect and incomplete, and extra work it’s often needed to fix each third-party library you intend to work with.

**Many web gam****ing** **engines have already been ported (Officially and unofficially)**

…

## 2) Can I already code my own minigame ? When will it be released?

**Can I already code my own minigame****?** Yes, you can already code your own minigame! Everything you will need, from documentation to developer tools, are publicly available.

**Can it be released yet?** No, it can’t be published yet, but you can still preview it on your phone. (More on IDE presentation following)

**When will it be released?** We don’t know yet.

## 3) What are the limitations? What are the acceptable expectations in terms of performance?

**Games** **graphics** **styles: both 2****D** **and 3****D are** **possible****.**
Thanks to the access to WebGL, we can also display 3D games, which will be GPU accelerated.

**Performance: A slightly** **better-****optimized system than Web games**

The system is still young and in beta-testing phase, but we can already see that performance is very similar to what web games are capable of.
A good rule of thumb, for the moment, is not to expect more than what a web game can do, in terms of limitations. 


![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520915931967_file.png)



**Size is still the main** **constraint.**

One of the biggest limitations of a minigame is coming from its size. Wechat currently allows only up to 4MB-packages games. 
Your game will probably be able to download extra assets from the Internet, but take into account that those will have to be fetched for every time the game is started.
So, games should be rather poor in terms of assets, and 3D games should use low-poly 3D objects and low quality textures.

## 4) is Web game→ WeChat Minigame conversion possible? What about WeChat Minigame → Web game conversion?

**Web → Minigame** **conversion****:** **depends heavily upon the underlying** **codebase**

It is possible to convert web games to minigames. However, according to the specific libraries and game engine used, the process could take from days to months of development. Prior audit of the game source code is required to estimate how much time the particular adaptation will take.

**Minigame → Web** **conversion****:** **it’s f****ast****!**

If using a standard web gaming framework for minigame development, like Phaser, your code will mostly be already web compatible, so it will work on a browser without much tweaking.


## 5) Getting Started with an Official Minigame Example


1. Download Wechat Miniapp&Minigame IDE 
    - [Download link](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=2017119)
2. Follow the steps to get the Tencent sample code working


![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520919000521_ezgif.com-gif-maker.gif)



3. You can now preview the sample minigame on your phone by clicking on the Eye button and scanning the QRcode.
## 6) IDE & Debugging tools presentation

The IDE and debugging tools are the same as mini-apps. Those are, however, purely in Chinese.
The debugging experience is overall very good, although it might be somewhat buggy due to its youth.


![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520915948300_file.png)

![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520915973707_file.png)


The whole interface has been translated into English here, for clarity.


## 7) Making your Minigame Social: available WeChat APIs

One of the core points of interest of minigames is the seamless access to social features embedded inside the WeChat platform, which increase their vitality and engagement rates. Here is a presentation of the main mechanisms and how to use them.

**Get current User information**


    wx.login({
      success: function () {
        wx.getUserInfo(userInfos)
      }
    })
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520935394247_file.png)



- What you get:
  - userName;
  - City;
  - Language;
  - Gender;
  - Picture URL;
- What you can’t get (yet):
  - openID (but this is probably due to the fact that minigames are not bound to an official account yet, although it looks like openID will be accessible soon https://mp.weixin.qq.com/debug/wxagame/dev/document/open-api/data/UserGameData.html?t=201832)
- What you will never get:
  - Phone number;
  - Real name;
  - Any other personal data information;

**Other personal information** **you can get:**


    wx.getLocation() => user location
    wx.getWeRunData() => get podometer data from werun 

https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/authorize.html?t=201832

**Get Friend****s-****who****-****played****-****the****-****game** **data list**


    wx.getFriendCloudStorage()


- Gets the data for each user from the user’s friend list;
- Those data can be modified and written on; 
- Good for friend leader board, and in-game friend status indications;
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520935428271_file.png)


**Get Group****-****who****-****played****-****the****-****game data** **list**


    wx.getGroupCloudStorage()


- Gets the data from each user within a group where the minigame has been shared;
- Those data can be modified and written on; 
- Good for group-based game;


## 8) Resources and links to get started

**Mini Games**


  - Documentation
    - [Minigame Official Documentation](https://mp.weixin.qq.com/debug/wxagame/dev/index.html)
  - Code Repositories
    - [Phaser + Minigame template, ready to user littlee/wechat-small-game-phaser](https://github.com/littlee/wechat-small-game-phaser)
  - IDE
    - [Download link](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=2017119)

**Gaming Libraries**


- [**Phaser website**](http://phaser.io/)
- [**Phaser : Create your first game tutorial**](https://phaser.io/tutorials/making-your-first-phaser-2-game)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520916020758_file.png)




- [**Phaser examples**](https://phaser.io/examples)


![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520916061306_file.png)

-  [**Phaser 2.6 documentation**](https://phaser.io/docs/2.6.2/index)


## 9) Some advice before you start

**Don’t** **trust** **the preview,** **a****lways test on real devices****.**

This is an example of a piece of code working on an emulator, but not on a real device:


      static preload(game) {
        game.load.image('bg', 'js/game/objects/Background/bg.jpg') => working on both emulator + phone
        // game.load.image('bg', './js/game/objects/Background/bg.jpg') => working only on emulator
      }

**Limit** **usage of t****hird****-p****art****y** **Libraries,** **a****s** **extra work** **is often needed**

Libraries like lodash are not working out of the box. You often need to go into the source code and modify the part depending on DOM/BOM APIs to actually achieving loading them.
On Lodash, you could solve the problem by adding the specific modules one by one, and not the whole library in one go. But it’s not always so easy!


    npm install --save lodash.forEach
    NOT
    npm install --save lodash

**Chunk you****r** **code in smaller files to** **make** **debug****ging easier**

The current IDE debugging system is working differently from their counterparts on Chrome and Firefox. One of the biggest sources of frustration I have encountered, is that many problems will end up throwing a very vague, non-specific error message, without any information on where the problem is coming from, except for the file it is failing onto.
Dividing your code in smaller chunks is therefore very important, **as finding a typo** **i****n a** **thousand** **lines** **worth of** **file****,** **without a** **single** **hint**, is much more difficult than finding a typo on a 50-lines file.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520916086906_file.png)





![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520917246741_file.png)



