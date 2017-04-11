class ScrollToX99 {
	constructor(opts) {
		if(!opts){
			opts = {};
		}
		this.navClass = opts.navClass? opts.navClass:'navX99';
    this.dataTarget = opts.dataTarget? opts.dataTarget: 'data-target';
		this.activeClass = opts.activeClass? opts.activeClass: 'activeX99';
		this.offset = opts.offset? opts.offset:'0';
		this.easing = opts.easing? opts.easing:'linear';
		this.duration = opts.duration? opts.duration: 700;
	}

	init(){
		console.log('ScrollToX99 is running. . .');

		const navClass = this.navClass;
    const dataTarget = this.dataTarget;
		const activeClass = this.activeClass;
		const offset = this.offset;
		const easing = this.easing;
		const duration = this.duration;

    // opts validation
    if(typeof offset !== 'string'){console.log('offset must be of type string'); return ;}

    const dom_navClass = document.getElementsByClassName(navClass);

    //inner vars
    let targetId,
        dom_targetId,
        target_topOffset;


    dom_navClass.forEach((nav, i) =>{
      nav.addEventListener('click', function (e) {
        let clicked_navClass = getClick_navClass_elem(e.target, navClass);
        if (!clicked_navClass || clicked_navClass === null) {
              console.log('clicked_navClass not found!');
              return;
            }
        //toggleClass
        dom_navClass.forEach((_nav, _i) => {
          _nav.classList.remove(activeClass);
        });
        clicked_navClass.classList.add(activeClass);

        //scrollTo
        if(!clicked_navClass.hasAttribute(dataTarget)){
          console.log('clicked_navClass does not have attribute', dataTarget);
          return;
        }
        e.preventDefault();
        e.stopPropagation();

        targetId = clicked_navClass.getAttribute(dataTarget);
        dom_targetId = document.getElementById(targetId);
        if(!dom_targetId){console.log('element with this id not found in dom'); return;}
        else {
          target_topOffset = dom_targetId.offsetTop;
          if(offset){
            if (offset.indexOf('-')) {
                target_topOffset = target_topOffset - Number(offset);
              } else {
                target_topOffset = target_topOffset + Number(offset);
              }
          }
          //run scrollTo
          scrollTo_Y({
              scrollTargetY:0,
              speed: duration,
              easing: easing
          });
        }

      }, false);
    });

	}


}

function getClick_navClass_elem(elem, navClass) {
    if (elem.classList.contains(navClass)) {
        return elem;
    } else {
        return findParentWithClass(elem, navClass);
    }
}

function findParentWithClass(el, className) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.className === className) return el;
    }
    return null;
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();


const scrollTo_Y = (opts = {}) => {
  //internal opts
    const scrollTargetY = opts.scrollTarget? opts.scrollTarget: 0 ;
    const speed = opts.speed? opts.speed: 2000 ;
    const easing = opts.easing? opts.easing: 'easeOutSine';

  //internal vars
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    let currentTime = 0;
    let time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const easingEquations = {
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

    const tick = () => {
        currentTime += 1 / 60;
        const p = currentTime / time;
        const t = easingEquations[easing](p);
        if (p < 1) {
            requestAnimFrame(tick);
            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            //console.log('scroll done');
            window.scrollTo(0, scrollTargetY);
        }
    };
    tick();
};
