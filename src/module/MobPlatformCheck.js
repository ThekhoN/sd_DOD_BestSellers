const MobPlatformCheck = () => {
  let currURLX = window.location;
  const mob_preURL_str = 'm.snapdeal.com';
  currURLX = String(currURLX);
  const mobileSite_running = (currURLX.indexOf(mob_preURL_str) > 0)? true: false;
  return mobileSite_running;
};

export default MobPlatformCheck;
