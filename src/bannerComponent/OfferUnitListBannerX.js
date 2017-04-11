import {h} from 'preact';
import MobPlatformCheck from '../module/MobPlatformCheck';
import BlazyBannerXImg from '../bannerComponent/BlazyBannerXImg';


const OfferUnitListBannerX = ({item}) => {
  let ImgUrl;
  if(MobPlatformCheck()){
    ImgUrl = item.mobileOfferImageUrl;
  }
  else {
    ImgUrl = item.webOfferImageUrl;
  }
  return (
    <li className="OfferUnitX99 BannerX99_unit responsiveFontSizeX99 pad06_vertical">
      <BlazyBannerXImg offerImageUrl={ImgUrl} offerName={item.offerName}/>
    </li>
  )
}

export default OfferUnitListBannerX;
