import {h} from 'preact';
import MobPlatformCheck from '../module/MobPlatformCheck';

const ImgNonPogIdBannerUnit = ({item}) => {
  let offerImageUrl, userDefined_offerImageUrl, offerName;
      offerName = item.offerName? item.offerName: '';
      if(MobPlatformCheck()){
        userDefined_offerImageUrl = item.mobileOfferImageUrl;
      } else {
        userDefined_offerImageUrl = item.webOfferImageUrl;
      }
      offerImageUrl = userDefined_offerImageUrl;
      return (
            <img src={offerImageUrl} alt={offerName} />
      );
}

export default ImgNonPogIdBannerUnit;
