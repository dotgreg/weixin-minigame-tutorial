# PRESENTATION (slide + git) - MINIGAME LeWagon

# Introduction

This repository contains a tutorial and a fully functional minigame demo of Flappy Bird using the web game engine phaser.
The purpose is as an advanced proof of concept for LeWagon Minigame Course in March 2018 in Shanghai
The current demo includes the following functionalities

- A fully working integration of phaser 2.9 + pixiJs + p5 gravity engine (from [littlee/wechat-small-game-phaser](https://github.com/littlee/wechat-small-game-phaser))
- An ES6-based scalable code structure (based on import/export feature)
- Game functionalities used
  - Animated Sprite based on JSON
  - Imported textures
  - Animations
  - Arcade Gravity system
  - Collision system based on arcade gravity
  - General leaderboard system based on leancloud
# Code Structure
    ├───game.js : main entry point, phaser.Game main function declared here
    ├───game.json : configuration of minigame
    ├───images : static assets repository
    └───js
        ├───game
        │   ├───managers : each manager is a set of functions
        │   │   ├───collisions.js : handle all collisions events
        │   │   ├───db.js : CRUD functions for backend for leaderboard (based on leancloud API)
        │   │   ├───events.js : main events of the game functions
        │   │   ├───generators.js : objects ge nerators functions
        │   │   ├───leaderboard.js : functions that handle leaderboard and ranking functionnalities
        │   │   ├───wechat.js : functions that handle wechat related api (getting user profile, user friends list etc...)
        │   └───objects : Each object is a Class, with its separated file
        │       ├───Background
        │       ├───Bird
        │       ├───Button
        │       ├───Floor
        │       ├───Pipe
        │       ├───objects.js : singleton namespace window.objects where all the game objects live
        │       ├───phases.js : different game phases (preload, created, update (called every frame), render (called every frame)
        │       └───state.js : singleton namespace window.state where all the game states and params live
        └───libs
            └───lodash-modules
# Tutorial
# Goals
1. How are wechat mini games working ?
2. Can I already code my own minigame ? When will it be released?
3. What are the limitations? What are the acceptable expectation in term of performances ?
4. Is Web → Minigame and Minigame → Web Possible?
5. IDE & Debugging tools presentation
6. Resources and links to get started
7. Some advices before starting
8. A Step by Step guide to start developing mini games
# 1) How are Wechat minigames working


## Overall Architecture : Almost like web games

Wechat Minigames are based on web technologies, the main language used is Javascript.
The system is similar than on the web : a canvas element is accessible and we can draw on it at every frame
We have access to the WebGL API, thus able to use the GPU for calculations using Shaders (GLSL language).


    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
![Example of code to draw a very basic shape, low level API almost the same than canvas API in JS](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520757747748_file.png)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520853746971_file.png)



## But implementation have some difference

However, the WebGL and Canvas API implementation differs from the native web implementation you can find on most web browsers
The running environment of the mini-game is [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore?t=201832) on iOS and [V8](https://developers.google.com/v8/index.html?t=201832) on Android. All of them are running environments without BOM and DOM. There is no global document and window object. So when you want to use the DOM API to create elements like Canvas and Image, it will throw an error.
More on [Official Minigame documentation (Chinese)](https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/base/adapter.html?t=201832)


## Web Libraries can get adapted to Minigame environment

To bridge the gap between web and minigame, wechat minigame team worked on a library ****[weapp-adapter](https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/weapp-adapter.zip?t=201832)
The goal is to make web libraries compatible with Minigames. That implementation however is still imperfect and incomplete, and you often need to work on the adaptation for each third party library you will work with.


# 2) Can I already code my own minigame ? When will it be released?

Yes you can already code your own minigame, everything from documentation to developer tools are publicly available
No you cannot publish it yet, but you can still preview it on your phone (More on IDE presentation)

# 3) What to expect & Limitations
## Games styles : both 2d and 3d is possible

Thanks to the access to WebGL, we can display 3d games, which will be GPU accelerated

## Performances : A slightly more optimized system than Web games

The system is still young and in beta, yet we can already see that performances are very comparable to what web games are capable of
So a good rule is for the moment, don’t expect more than what a web game can do in term of limitation.


![2D platform games](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520852193215_file.png)
![3D games however should remain low polygons games (simple shapes)](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520852085823_file.png)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520852125389_file.png)

## Size : Main limitation

One of the biggest limitation of a minigame is coming from its size. Wechat currently allows only up to 4mb packages games.
Your game will probably be able to download extra assets from the internet, but take in account those will need to be fetched everytime the game is starting.
So games should be rather low in term of assets, 3d games should use low poly 3d objects and low quality textures.

# 4) Is Web → Minigame and Minigame → Web Possible?


## Web → Minigame : could be very fast to very slow

It is possible to port web game to minigame. However, according to the libraries and game engine used, it could range from days to months of development. Prior audit to the game code source is required to understand how much time adaptation will take.

## Minigame → Web : Fast

If used a standard web gaming framework to develop minigame like phaser, you code will mostly be web compatible, so will work on a browseer


# 5) IDE & Debugging tools presentation

The IDE and debugging tools are the same than mini apps. Those are however purely in Chinese
The debugging experience is in overall very good, although accusing its youth, might be buggy.


![Main IDE is all in Chinese, well thought. Instant development feedback by hot reload system (no need to refresh the page to see your changes). It also includes a function to upload your minigame on the cloud to test it on real phone](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520853287801_file.png)



![You can export your game on your mobile using a qrcode generated on the IDE (see below)](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520853352863_WeChat+Image_20180312191536.png)
![The mobile preview includes a great debugging tool](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520853359553_WeChat+Image_20180312191527.png)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520853378258_file.png)


We have translated the whole interface in english here

# 6) Resources and links to get started
## Mini Game
  - Documentation
    - [Minigame Official Documentation](https://mp.weixin.qq.com/debug/wxagame/dev/index.html)
![Tencent already provides a good documentation in Chinese including everything needed to know to get started](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520850601138_file.png)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520850385036_file.png)



  - Code Repositories
    - [Phaser + Minigame template, ready to user littlee/wechat-small-game-phaser](https://github.com/littlee/wechat-small-game-phaser)
  - IDE
    - [Download link](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=2017119)


## Gaming Libraries
  - [Phaser website](http://phaser.io/)
  - [Phaser : Create your first game tutorial](https://phaser.io/tutorials/making-your-first-phaser-2-game)
![An excellent tutorial guiding your through the main concepts of Phaser from assets loading to gravity systems](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520850426943_file.png)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520850385036_file.png)



  - [Phaser examples](https://phaser.io/examples)
![100+ examples with code](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520850364529_file.png)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520850385036_file.png)

  - Phaser 2.9 documentation
  - [Phaser 2.6 documentation](https://phaser.io/docs/2.6.2/index)


# 7) Some advices before starting
## Don’t believe the preview, Always test on real devices

example of a code working on emulator but not on real device

      static preload(game) {
        game.load.image('bg', 'js/game/objects/Background/bg.jpg') => working on both emulator + phone
        // game.load.image('bg', './js/game/objects/Background/bg.jpg') => working only on emulator
      }


## Limit Third Parties Libraries, As adaptation is often needed

Including libraries like lodash are not working out of the box. You often need to go into the source code and modify the part depending on DOM/BOM Apis.
On Lodash, I solve the problem by including module per module and not the whole library.


    npm install --save lodash.forEach
    NOT
    npm install --save lodash


## Chunk you code in smaller files to ease debug

The current IDE debugging system is working differently from their counterparts on chromium and firefox. One of the biggest problems I have seen is many problems will end up showing a very vague error message without indicating where the problem is coming from, except the file it is failing into.
Chunking your code in smaller parts is then really important, **as finding a typo mistake on a 1000 lines file without a hint is much more difficult** than on a 50 lines file.

![inputing a “,” after the {} as an error will result in ….](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520913935221_file.png)
![a very vague error message on the file. “module js/game/objects.js is not defined”. Meaning the problem is inside that file](https://d2mxuefqeaa7sj.cloudfront.net/s_536890ED260BD52EF9D2F5C9B7BBDBE78141D68963AB701231EB08E07E0D47A6_1520913779723_file.png)
