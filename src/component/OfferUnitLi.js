import {h, Component} from 'preact';
import TitleOfferUnit from '../SubComponent/TitleOfferUnit';
import ImgOfferUnit from '../SubComponent/ImgOfferUnit';
import OfferLink from '../SubComponent/OfferLink';
import OfferLinkAfterWrap from '../SubComponent/OfferLinkAfterWrap';
import OfferNonImgWrap from '../SubComponent/OfferNonImgWrap';
import OfferPriceTaglineDiscountWrap from '../SubComponent/OfferPriceTaglineDiscountWrap';
import OfferRatingWrap from '../SubComponent/OfferRatingWrap';
import CenterContentWrapper from '../SubComponent/CenterContentWrapper';
import querySdPlusPriceSlab from '../module/querySdPlusPriceSlab';
import {isISObject} from '../module/ValidateData';

export default class OfferUnitLi extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.item !== this.props.item;
  }
  render(){
    const {item, i} = this.props
    if(querySdPlusPriceSlab(item)){
        return null;
      }
    if(isISObject(item.commonMinProductDetailsDTO) || item.pogId){
      if(item.commonMinProductDetailsDTO.priceInfo == null){
          return null;
      }
    }
    const eventId = item.eventId;
    let _classNames = '';
    if(eventId.indexOf('superDod') > -1){
      _classNames = 'dodSuperDeal_unit offerUnits_2_2 dodSuperDealUnit_ev';
      return (
        <li className={_classNames} key={i}>
            <div className="offerUnit_innerContWrap">
              <OfferLink item={item}>
                <OfferLinkAfterWrap>
                  <ImgOfferUnit item={item}/>
                  <OfferNonImgWrap>
                    <CenterContentWrapper>
                      <TitleOfferUnit item={item}/>
                      <OfferPriceTaglineDiscountWrap item={item}/>
                      <OfferRatingWrap item={item}/>
                    </CenterContentWrapper>
                  </OfferNonImgWrap>
                </OfferLinkAfterWrap>
              </OfferLink>
            </div>
        </li>
      )
    }
    else {
      _classNames = 'offer-unit__li';
      return (<li className={_classNames} key={i} data-filter={item.filters}>
              <OfferLink item={item}>
                  <ImgOfferUnit item={item}/>
                  <OfferNonImgWrap>
                    <TitleOfferUnit item={item}/>
                    <OfferPriceTaglineDiscountWrap item={item}/>
                    <OfferRatingWrap item={item}/>
                  </OfferNonImgWrap>
              </OfferLink>
        </li>
      );
    }

  }
}
