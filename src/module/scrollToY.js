// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



//scrollToY
function scrollToY(valueTopOffset, speed, easing) {
  // original author: shunryu111
  // valueTopOffset: value of element's .topOffset()
  // speed: time in pixels per second
  // easing: easing equation to use
  var scrollY = window.scrollY || document.documentElement.scrollTop,
      valueTopOffset = valueTopOffset || 0,
      speed = speed || 2000,
      easing = easing || 'easeOutSine',
      currentTime = 0;
  var time = Math.max(.1, Math.min(Math.abs(scrollY - valueTopOffset) / speed, .8));
  var easingEquations = {
    linear: function(pos) {
      return pos;
    },
    easeOutSine: function(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function(pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },
    easeInOutQuint: function(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }
      return 0.5 * (Math.pow((pos - 2), 5) + 2);
    }
  };
  function tick() {
    currentTime += 1 / 60;
    var p = currentTime / time;
    var t = easingEquations[easing](p);
    if (p < 1) {
      requestAnimationFrame(tick);
      window.scrollTo(0, scrollY + ((valueTopOffset - scrollY) * t));
    } else {
      window.scrollTo(0, valueTopOffset);
    }
  }
  tick();
}

export default scrollToY
