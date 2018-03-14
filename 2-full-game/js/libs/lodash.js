// importing the lodash.js directly would result in a crash on minigame real devices
// to solve it, I import each module I need separately and potentially adapt it for making it compatible with minigame environment and its lack of DOM/BOM api

import forEach  from './lodash-modules/lodash.foreach'
import throttle  from './lodash-modules/lodash.throttle'
import random  from './lodash-modules/lodash.random'
import clamp  from './lodash-modules/lodash.clamp'
import map  from './lodash-modules/lodash.map'
import isArray  from './lodash-modules/lodash.isarray'
import once from './lodash-modules/lodash.once'
import isObject from './lodash-modules/lodash.isobject'
import orderBy from './lodash-modules/lodash.orderby'

export {forEach as each}
export {throttle}
export {random}
export {clamp}
export {map}
export {isArray}
export {once}
export {isObject}
export {orderBy}
