import {h} from 'preact';
import MobPlatformCheck from '../module/MobPlatformCheck';
import {isLegit_pogId_item} from '../module/ValidateData';

import SdPlusLogo from '../subComponent/SdPlusLogo';
//import LazyLoadedImgUnit from '../component/LazyLoadedImgUnit'


const ImgOfferUnit = ({item}) => {
  let offerImageUrl, userDefined_offerImageUrl, sdgold, offerName;
      offerName = item.offerName? item.offerName: '';
      if(MobPlatformCheck()){
        userDefined_offerImageUrl = item.mobileOfferImageUrl;
      }
      else {
        userDefined_offerImageUrl = item.webOfferImageUrl;
      }
      if(isLegit_pogId_item(item)){
          offerImageUrl = userDefined_offerImageUrl?userDefined_offerImageUrl:item.commonMinProductDetailsDTO.imgs[0];
          sdgold = item.commonMinProductDetailsDTO.vendorDTO.sdgold;
      }
      else {
          offerImageUrl = userDefined_offerImageUrl;
      }
      return (
        <div className="offer-unit__img-container--rel">
          {sdgold && <SdPlusLogo/>}
          <span className='img--constrain-size offer-unit__img-preload'>
            <img src={offerImageUrl} alt={offerName} className='img--constrain-size offer-unit__img--dp'/>
          </span>
        </div>
      );
}

/*
<LazyLoadedImgUnit offerImageUrl={offerImageUrl} offerName={offerName} />
*/


/*
<img src={offerImageUrl} alt={offerName} className='offerImg--img--constrain-size'/>
*/

export default ImgOfferUnit;
