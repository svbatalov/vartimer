function run(fn, delay) {
  var timer = {}, ms;
  
  Array.isArray(delay) && (delay = delay.slice());
  var args = [].slice.call(arguments, 2);

  var cb = function () {
    if (typeof delay === 'function') {
      ms = delay();
    } else if ( Array.isArray(delay) && delay.length > 0) {
      ms = delay.shift();
    } else if (delay.length === 0) {
      // keep last delay value
    } else {
      ms = delay;
    }

    timer.handle = setTimeout(function () {
      cb();
      fn.apply(null, args);
    }, ms);
  };

  setImmediate(cb);
  return timer;
}

function clear(i) { i && i.handle && clearTimeout(i.handle); }

module.exports.run = run;
module.exports.clear = clear;
