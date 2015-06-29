var timer = require('..');
require('should');

var THR = 0.2;

describe('Timer', function () {
  it('should fire callback periodically with constant intervals', function (done) {
    var count = 10;
    var delay = 50, prev = Date.now();
    var t = timer.run(function () {
      var now = Date.now();
      var actualDelay = now - prev;
      prev = now;

      if (Math.abs(actualDelay - delay)/delay > THR) {
        timer.clear(t);
        return done('Expected delay ' + delay + ' actual delay ' + actualDelay);
      }

      if(count-- === 0) {
        timer.clear(t);
        return done();
      }

      //console.log('Tick %d %s actualDelay=%d', count, new Date(), actualDelay);

    }, delay);
  });


  it('should fire callback with intervals given in a list', function (done) {
    var ivals = [100, 200, 150, 100, 80];
    var prev = Date.now(), count = 0, maxcount = 10;

    var t = timer.run(function () {
      var now = Date.now();
      var actualDelay = now - prev;
      var delay = count < ivals.length ? ivals[count] : ivals[ivals.length-1];
      prev = now;

      if (Math.abs(actualDelay - delay)/delay > THR) {
        timer.clear(t);
        return done('Expected delay ' + delay + ' actual delay ' + actualDelay);
      }

      if (count++ >= maxcount) {
        timer.clear(t);
        return done();
      }

      //console.log('Tick %d %s expected/actual delay: %d/%d', count, new Date(), delay, actualDelay);
    }, ivals);

  });

  it('should pass arguments to callback', function (done) {
    X = 'hi';
    Y = [1,2,3];
    var t = timer.run(function (x, y) {
      x.should.eql(X);
      y.should.eql(Y);
      timer.clear(t);
      return done();
    }, 100, X, Y);
  });

  it('should generate delay using provided function', function (done) {
    var count = 10, prev = Date.now(), delay;
    var delays = [];
    var t = timer.run(function () {
      var now = Date.now();
      var actualDelay = now - prev;
      prev = now;

      delay = delays.shift();

      //console.log('Tick %d %d/%d', count, delay, actualDelay, delays);

      if (Math.abs(actualDelay - delay)/delay > THR) {
        timer.clear(t);
        return done('Expected delay ' + delay + ' actual delay ' + actualDelay);
      }
      if (count-- === 0) {
        timer.clear(t);
        return done();
      }

    }, function gen() {
      delay = 100 + Math.floor(Math.random()*80);
      delays.push(delay);
      return delay;
    });
  });
});
