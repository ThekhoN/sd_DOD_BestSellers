import {h} from 'preact';
import MobPlatformCheck from '../module/MobPlatformCheck';

const OfferLink = ({item, children}) => {
  let OfferURL;
  const {mobileLandingUrl, webLandingUrl} = item;
  if(MobPlatformCheck()){
      OfferURL = mobileLandingUrl ? mobileLandingUrl : webLandingUrl;
  }
  else {
      OfferURL = webLandingUrl;
  }
  return (
    <a href={OfferURL} target="_blank" className="offer-unit__href">
    {children}
    </a>
  )
}

export default OfferLink;
