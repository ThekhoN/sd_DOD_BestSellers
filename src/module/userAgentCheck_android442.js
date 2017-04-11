// +++++ Android 4.4.2 detection +++++ //

const getAndroidVersionX99 = (ua) => {
  ua = (ua || navigator.userAgent).toLowerCase();
  const match = ua.match(/android\s([0-9\.]*)/);
  return match ? match[1] : false;
};

const userAgentCheck_android442 = (ua) => {
  const _getAndroidVersionX99 = getAndroidVersionX99(ua);
  let version0;
  //if android
  if(_getAndroidVersionX99){
   version0 = parseInt(_getAndroidVersionX99, 10);
   if(version0 < 5){
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
//ua string for android442
//var AndroidV4_ua = 'Mozilla/5.0 (Linux; Android 4.4; Nexus 4 Build/KRT16E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.105 Mobile Safari';

export default userAgentCheck_android442;
