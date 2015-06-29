# vartimer
Simple setInterval() function allowing a list of intervals.

## Installation
```
npm install --save vartimer
```

## Usage
```
var timer = require('vartimer');

var t = timer.run(function (x, y, z, ..) {
  // Code to be executed
}, delay, arg1, arg2, arg3, ..)
```
where `delay` may be one of
* delay in milliseconds,
* a list of delays,
* a function returning whole number.

To stop the timer use `timer.clear(t)`.

## Motivation
Sometimes you want `setInterval(cb, delay)` to call `cb` immediately and then start repeating:
```
timer.run(cb, [0, delay]);
```
Sometimes you want to use different delay for a first call (if you continue a schedule after restart or something):
```
timer.run(cb, [delay1, delay2]);
```
First time `cb` will be called after `delay1` milliseconds and then repeatedly with `delay2` ms interval.
