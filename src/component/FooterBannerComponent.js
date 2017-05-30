import {h} from 'preact';
import ImgOfferUnit from '../subComponent/ImgOfferUnit';
import ImgNonPogIdBannerUnit from '../subComponent/ImgNonPogIdBannerUnit';
import OfferLink from '../subComponent/OfferLink';

const FooterBannerComponent = ({item}) => (
  <div className='dod-footer-banner-component'>
    <OfferLink item={item}>
      <ImgNonPogIdBannerUnit item={item} />
    </OfferLink>
  </div>
);

// const FooterBannerComponent = () => (
//   <div>FooterBannerComponent test</div>
// );

export default FooterBannerComponent;
