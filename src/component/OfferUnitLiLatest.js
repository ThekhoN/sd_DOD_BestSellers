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
// import { WishlistIcon, WishlistIconAbsWrapper, InactiveWishlistPath, HoveredWishlistPath, ActiveWishlistPath } from './WishlistIconComponents';
import axios from 'axios';

// WISHLIST options
const ADD_WISHLIST_URL = 'https://www.snapdeal.com/wishlist/add?pog';
const REMOVE_WISHLIST_URL = 'https://www.snapdeal.com/wishlist/remove?pog';
const WISHLIST_URL = 'https://www.snapdeal.com/mywishlist';

// forgive me manipulating the dom
function toggleShortlistConfirm() {
  /* live */
  if(window.location.href.indexOf('snapdeal.com') > -1){
    const sdHeaderShortlist = document.getElementsByClassName('header-shortlist')[0];
    if(sdHeaderShortlist == null){
      console.log('header-shortlist not found return');
      return ;
    }
      // if has class 'hidden' then remove
    if(sdHeaderShortlist.classList.contains('hidden')){
      sdHeaderShortlist.classList.remove('hidden');
      setTimeout(()=>{
        sdHeaderShortlist.classList.add('hidden');
      }, 3000);
    }
    else {
      sdHeaderShortlist.style.display = 'block';
      setTimeout(()=>{
        sdHeaderShortlist.style.display = 'none';
      }, 3000);
    }
  }
  /* local */
  // const sdHeaderShortlist = document.getElementsByClassName('header-shortlist')[0];
  // if(sdHeaderShortlist == null){
  //   console.log('header-shortlist not found return');
  //   return ;
  // }
  //   // if has class 'hidden' then remove
  // if(sdHeaderShortlist.classList.contains('hidden')){
  //   sdHeaderShortlist.classList.remove('hidden');
  //   setTimeout(()=>{
  //     sdHeaderShortlist.classList.add('hidden');
  //   }, 3000);
  // }
  // else {
  //   sdHeaderShortlist.style.display = 'block';
  //   setTimeout(()=>{
  //     sdHeaderShortlist.style.display = 'none';
  //   }, 3000);
  // }
}

class ShortlistComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      shortlist: false
    }
    this.toggleShortlisted = this.toggleShortlisted.bind(this);
  }
  componentDidMount(){
    const { shortlisted } = this.props;
    if(shortlisted){
      this.setState({
        shortlist: true
      })
    }
    else {
      this.setState({
        shortlist: false
      })
    }
  }
  toggleShortlisted(){
    const {shortlisted, pogId} = this.state;
    /* live */
       // if not on snapdeal platform return
      if(!(window.location.href.indexOf('snapdeal.com') > -1)){
        console.log('not on snapdeal platform. . .');
        return ;
      }

        // if logged in
     if(Snapdeal.Cookie.get('lu') === 'true'){
       // toggle wishlist state
       if(!shortlisted){
         axios.get(`${ADD_WISHLIST_URL}=${pogId}`)
           .then( response => {
             this.setState({
               shortlisted: true
             });
             toggleShortlistConfirm();
           })
           .catch(err => {
             console.log('error in ADD_WISHLIST axios: ', err);
         });
       }
       else {
         axios.get(`${REMOVE_WISHLIST_URL}=${pogId}`)
           .then( response => {
             this.setState({
               shortlisted: false
             });
           })
           .catch(err => {
             console.log('error in REMOVE_WISHLIST axios: ', err);
         });
       }
     }
     // not logged in, showRegister to log in
    else {
      if(window.location.href.indexOf('www.snapdeal.com') > 1){
        window.showRegister();
      }
    }

    /* local */
    // if(!shortlisted){
    //   this.setState({
    //     shortlisted: true
    //   });
    //   toggleShortlistConfirm();
    // }
    // else {
    //   this.setState({
    //     shortlisted: false
    //   });
    // }
  }
  render(){
    // const { shortlisted } = this.props;
    const {shortlisted} = this.state;
    const spanClass = 'comp-animated-icon toggle-short-list-visibility';
    const spanActiveClass = 'animated-icon animated-icon-click animated-icon-active';
    const iClass = 'sd-icon heart-icon animated-font sd-icon-like-outline';
    const iActiveClass = 'sd-icon heart-icon sd-icon-like animated-font-active';

    let currentSpanClass = spanClass, currentiClass = iClass;
    if(shortlisted){
      currentSpanClass = spanActiveClass;
      currentiClass = iActiveClass;
    }
    return (<div className="shortlist-products" onClick={()=>{
      this.toggleShortlisted();

    }}>
    			<div className='comp-animated-icon' >
    				<span className={currentSpanClass} >
    					<i className={currentiClass}></i>
    				</span>
    			</div>
    		</div>);
  }
}


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
    const { mobileSite } = this.props;
    if(!mobileSite) {
      return (<ShortlistComponent />)
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
    const shouldUpdate = nextState.shortlisted !== this.state.shortlisted || nextProps.item !== this.props.item || this.state.pogId !== nextState.pogId;
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
              { this.state.pogId && this.handleRenderWishlistIcon() }
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
              { this.state.pogId && this.handleRenderWishlistIcon() }
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
