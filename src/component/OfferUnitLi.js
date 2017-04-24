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
import { WishlistIconAbsContainer} from './WishlistIconComponents';

// OfferUnitLi Component
export default class OfferUnitLi extends Component {
  constructor(props){
    super(props);
    this.state = {
      pogId:''
    };
    this.handleRenderWishlistIcon = this.handleRenderWishlistIcon.bind(this);
  }
  handleRenderWishlistIcon(){
    const { mobileSite, dispatchToMainShowingShortlistConfirm } = this.props;
    if(!mobileSite) {
      // render WishlistIconAbsContainer
      return (
        <WishlistIconAbsContainer pogId={this.state.pogId} dispatchToMainShowingShortlistConfirm={dispatchToMainShowingShortlistConfirm}/>
      )
    }
  }
  componentDidMount(){
    const { item } = this.props;
    if(isISObject(item.commonMinProductDetailsDTO) || item.pogId){
      this.setState({
        pogId: item.pogId
      }, ()=>{
        // console.log('pogId on mount: ', this.state.pogId);
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    // return nextProps.item !== this.props.item;
    const shouldUpdate = nextState.offerState !== this.state.offerState || nextProps.item !== this.props.item || this.state.pogId !== nextState.pogId;
    return shouldUpdate;
  }
  render(){
    const {item, mobileSite, i} = this.props
    // console.log('this.props.mobileSite at OfferUnitLi: ', mobileSite);
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
            <div className="offerUnit_innerContWrap container--rel">
              { !mobileSite && this.state.pogId && this.handleRenderWishlistIcon() }
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
      return (<li className={_classNames} key={i}
        data-filter={item.filters}>
              { !mobileSite && this.state.pogId && this.handleRenderWishlistIcon() }
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
