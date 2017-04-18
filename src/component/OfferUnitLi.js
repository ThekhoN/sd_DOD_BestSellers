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
import { WishlistIcon, WishlistIconAbsWrapper, InactiveWishlistPath, HoveredWishlistPath, ActiveWishlistPath } from './WishlistIconComponents';
import axios from 'axios';

// WISHLIST options
const ADD_WISHLIST_URL = 'https://www.snapdeal.com/wishlist/add?pog';
const REMOVE_WISHLIST_URL = 'https://www.snapdeal.com/wishlist/remove?pog';
const WISHLIST_URL = 'https://www.snapdeal.com/mywishlist';
// const pogid = '347830397';

// OfferUnitLi Component
export default class OfferUnitLi extends Component {
  constructor(props){
    super(props);
    this.state = {
      offerState:'inactive',
      pogId:''
    };
    this.handleRenderWishlistIcon = this.handleRenderWishlistIcon.bind(this);
    this.renderWishlistIconType = this.renderWishlistIconType.bind(this);
    this.activateOfferState = this.activateOfferState.bind(this);
    this.hoverethOfferState = this.hoverethOfferState.bind(this);
    this.inactivateOfferState = this.inactivateOfferState.bind(this);
  }
  activateOfferState(){
    // console.log('was clicked. . .');
    const { showShortlistConfim } = this.props;
    const { offerState, pogId } = this.state;
    if(offerState !== 'active'){
      /* local test */
      // console.log('req pogId: ', pogId);
      // this.setState({
      //       offerState: 'active'
      //     }, ()=> {
      //       this.props.dispatchToMainShowingShortlistConfirm(true);
      //     });
      /* live */
      axios.get(`${ADD_WISHLIST_URL}=${pogId}`)
        .then( response => {
          this.setState({
            offerState: 'active'
          }, ()=> {
            this.props.dispatchToMainShowingShortlistConfirm(true);
          });
        })
        .catch(err => {
          console.log('error in ADD_WISHLIST axios: ', err);
      });
    }
    else {
      /* local test */
      // this.setState({
      //   offerState: 'hovered'
      // });
      /* live */
      axios.get(`${REMOVE_WISHLIST_URL}=${pogId}`)
        .then( response => {
          this.setState({
            offerState: 'hovered'
          });
        })
        .catch(err => {
          console.log('error in REMOVE_WISHLIST axios: ', err);
      });
    }
  }
  hoverethOfferState(){
    const { offerState } = this.state;
    if(offerState !== 'active'){
      this.setState({
        offerState: 'hovered'
      });
    }
  }
  inactivateOfferState(){
    const { offerState } = this.state;
    if(offerState !== 'active'){
      this.setState({
        offerState: 'inactive'
      });
    }
  }
  handleRenderWishlistIcon(){
    const { mobileSite } = this.props;
    if(!mobileSite) {
      // render WishlistIcon
      return (
        <WishlistIconAbsWrapper>
          <WishlistIcon
              childPath={ this.renderWishlistIconType() }
              handleOnClick={ this.activateOfferState }/>
        </WishlistIconAbsWrapper>
      )
    }
  }
  renderWishlistIconType(){
    const { offerState } = this.state;
    // console.log('offerState in renderWishlistIconType: ', offerState);
     if(offerState === 'inactive'){
       return <InactiveWishlistPath fill='#cccccc'/>
     }
    if(offerState === 'hovered'){
      return <HoveredWishlistPath fill='#666666'/>
    }
    if(offerState === 'active'){
      return <ActiveWishlistPath fill='#e31b48'/>
    }
  }
  componentDidMount(){
    const { item } = this.props;
    if(isISObject(item.commonMinProductDetailsDTO) || item.pogId){
      this.setState({
        pogId: item.pogId
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
        <li className={_classNames} key={i}
          onMouseEnter={ this.hoverethOfferState }
          onMouseLeave ={ this.inactivateOfferState }>
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
        data-filter={item.filters}
        onMouseEnter={ this.hoverethOfferState }
        onMouseLeave ={ this.inactivateOfferState }>
              { this.handleRenderWishlistIcon() }
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
