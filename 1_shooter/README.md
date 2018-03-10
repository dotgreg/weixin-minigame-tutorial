# Wechat Small Game with Phaser.js

## Main Idea

"Thanks to" the WeChat Small Game runtime environment, directly importing 'phaser' will get lots of errors.

## Solution

stub some global variables which phaser take in use, that's what 'js/libs/stub/js' do

```js
import './js/libs/stub'
```

use phaser's split custom build instead of the standard version, which can expose PIXI, p2 and Phaser to global

```js
window.PIXI = require('./js/libs/pixi')
window.p2 = require('./js/libs/p2')
window.Phaser = require('./js/libs/phaser-split')
```

create the game instance with a config object, specify the `canvas` option

```js
var game = new Phaser.Game({
  width: gameWidth,
  height: gameHeight,
  renderer: Phaser.CANVAS,
  canvas: canvas,
  state: {}
})
```

### Caveat

if the game size is not the same as the canvas', remember to set scale mode to make phaser calculate input pointer normally

```js
this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
this.scale.pageAlignHorizontally = true
this.scale.pageAlignVertically = true
```
