import MobPlatformCheck from './MobPlatformCheck';


function initSocialShareModule() {
  (function() {
      const mainWrapperX99 = document.getElementsByClassName('shareX99_wrapper')[0];
      if(!mainWrapperX99){console.log('.shareX99_wrapper not found'); return ;}
      const ele = mainWrapperX99.querySelectorAll('.shareIconX_icoWrapper li');
      if(!ele){console.log('.shareIconX_icoWrapper not found'); return ;}
      var whatsappX = mainWrapperX99.querySelector('li.whatsappX');
      //check if mobile and show/hide whatsapp
      var mobileSite_TrueX999_var = MobPlatformCheck();
      //console.log('mobileSite_running: ' + mobileSite_TrueX999_var);
      if (mobileSite_TrueX999_var) {
          //console.log('mobile site running, show whatsapp');
          if (whatsappX) {
              whatsappX.style.display = 'block';
          }
      } else {
          if (whatsappX) {
              whatsappX.style.display = 'none';
          }
      }
      //var links
      var currURLX = window.location.href;
      var preURLs = {
          'facebookX': 'https://www.facebook.com/sharer.php?u=',
          'twitterX': 'https://twitter.com/intent/tweet?url=',
          'googleplusX': 'https://plus.google.com/share?url=',
          'pinterestX': 'https://pinterest.com/pin/create/bookmarklet/?url=',
          'whatsappX': 'whatsapp://send?text='
      };
      var finalURL = '';
      var data_hashtag = 'data-hashtag';
      var class_unit_socialX99 = 'unit_socialX99';
      //click events
      for (var i = 0; i < ele.length; i++) {
          ele[i].addEventListener('click', function(e) {
              e.preventDefault();
              var finalURL = '',
                  ele = e.target;
              ele = getClick_targetClass_elem(e.target, class_unit_socialX99);
              if (!ele || ele === null) {
                  console.log('clicked_targetClass_elem not found!');
                  return;
              }
              var twHastag = ele.getAttribute(data_hashtag);
              if (ele.classList.contains('facebookX')) {
                  finalURL = preURLs.facebookX + currURLX;
              } else if (ele.classList.contains('twitterX')) {
                  if (twHastag) {
                      finalURL = preURLs.twitterX + currURLX + '&hashtags=' + twHastag;
                  } else {
                      finalURL = preURLs.twitterX + currURLX;
                  }
              } else if (ele.classList.contains('googleplusX')) {
                  finalURL = preURLs.googleplusX + currURLX;
              } else if (ele.classList.contains('pinterestX')) {
                  finalURL = preURLs.pinterestX + currURLX;
              } else if (ele.classList.contains('whatsappX')) {
                  finalURL = preURLs.whatsappX + currURLX;
              }
              //console.log('finalURL: ', finalURL);
              var W_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
              var W_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
              window.open(finalURL, 'shareWindow', 'height=450, width=550, top=' + (W_height / 2 - 275) + ', left=' + (W_width / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
              //end of click event
          });
          //end of for loop
          //utils
      }

      function getClick_targetClass_elem(elem, targetClass) {
          if (elem.classList.contains(targetClass)) {
              return elem;
          } else {
              return findParentWithClassX99(elem, targetClass);
          }
      }

      function findParentWithClassX99(el, cls) {
          while ((el = el.parentElement) && !el.classList.contains(cls));
          return el;
      }

  })();
}



export default initSocialShareModule;
