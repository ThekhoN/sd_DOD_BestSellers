//Internet Explorer & Windows Phone
var isIE_mobileBrowser = navigator.userAgent.indexOf('Windows Phone 8.1') > 0;
var isIE_Browser = isIE_Browser_fn();
function isIE_Browser_fn() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    // If IE, return version number.
    if (Idx > 0) return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./)) return 11;
    else return 0; //It is not IE
}

const isIE10orLess = function(){
  const _isIE_Browser_fn = isIE_Browser_fn();
  if(_isIE_Browser_fn){
    if(_isIE_Browser_fn < 11){
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};

export default isIE10orLess;
