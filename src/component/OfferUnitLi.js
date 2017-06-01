import {h, Component} from 'preact';
import TitleOfferUnit from '../subComponent/TitleOfferUnit';
import ImgOfferUnit from '../subComponent/ImgOfferUnit';
import OfferLink from '../subComponent/OfferLink';
import OfferLinkAfterWrap from '../subComponent/OfferLinkAfterWrap';
import OfferNonImgWrap from '../subComponent/OfferNonImgWrap';
import OfferPriceTaglineDiscountWrap from '../subComponent/OfferPriceTaglineDiscountWrap';
import OfferRatingWrap from '../subComponent/OfferRatingWrap';
import CenterContentWrapper from '../subComponent/CenterContentWrapper';
import querySdPlusPriceSlab from '../module/querySdPlusPriceSlab';
import {isISObject} from '../module/ValidateData';
import {WishlistIconAbsContainer} from './WishlistIconComponents';
import {ShowLimitedStock, ShowSpecialTxt, ShowMultipleUnitsLeft, ShowSingleUnitLeft} from './ShowSpecialTxtLimitedInventory';

// variables
const inventoryLimitMax = 20;
const inventoryLimitMin = 9;

// OfferUnitLi Component
export default class OfferUnitLi extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pogId: ''
    };
    this.handleRenderWishlistIcon = this.handleRenderWishlistIcon.bind(this);
    this.handleRenderShowSpecialTxtLimitedInventory = this.handleRenderShowSpecialTxtLimitedInventory.bind(this);
  }
  handleRenderWishlistIcon () {
    const { mobileSite, dispatchToMainShowingShortlistConfirm } = this.props;
    if (!mobileSite) {
      // render WishlistIconAbsContainer
      return (
        <WishlistIconAbsContainer pogId={this.state.pogId} dispatchToMainShowingShortlistConfirm={dispatchToMainShowingShortlistConfirm} />
      );
    }
  }
  componentDidMount () {
    const { item } = this.props;
    if (isISObject(item.commonMinProductDetailsDTO) || item.pogId) {
      this.setState({
        pogId: item.pogId
      });
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    // const shouldUpdate = nextState.offerState !== this.state.offerState || nextProps.item !== this.props.item || this.state.pogId !== nextState.pogId;
    const shouldUpdate = nextState.offerState !== this.state.offerState || nextProps.item !== this.props.item || this.state.pogId !== nextState.pogId;
    return shouldUpdate;
  }
  handleRenderShowSpecialTxtLimitedInventory () {
    const {item} = this.props;
    const specialTxt = item.extraField4;
    let buyableInventory = '';
    if (specialTxt) {
      return (<ShowSpecialTxt specialTxt={specialTxt} />);
    }
    if (!item || !item.pogId || !isISObject(item.commonMinProductDetailsDTO) || !item.commonMinProductDetailsDTO.vendorDTO) {
      return null;
    } else {
      buyableInventory = item.commonMinProductDetailsDTO.vendorDTO.buyableInventory;
      if (!buyableInventory) {
        return null;
      } else {
        if (buyableInventory <= inventoryLimitMax) {
          if (buyableInventory <= inventoryLimitMin) {
            if (buyableInventory === 1) {
              return (<ShowSingleUnitLeft />);
            } else {
              return (<ShowMultipleUnitsLeft buyableInventory={buyableInventory} />);
            }
          } else {
            return (<ShowLimitedStock />);
          }
        } else {
          return null;
        }
      }
    }
  }
  render () {
    const {item, mobileSite, i} = this.props;
    if (querySdPlusPriceSlab(item)) {
      return null;
    }
    let pogId = '';
    if (isISObject(item.commonMinProductDetailsDTO) || item.pogId) {
      pogId = item.pogId;
      if (item.commonMinProductDetailsDTO.priceInfo == null || item.commonMinProductDetailsDTO.soldOut === true) {
        return null;
      }
    }
    const eventId = item.eventId;
    let _classNames = '';
    if (eventId.indexOf('superDod') > -1) {
      _classNames = 'dodSuperDeal_unit offerUnits_2_2 dodSuperDealUnit_ev';
      return (
        <li className={_classNames} key={i}>
          <div className='offerUnit_innerContWrap container--rel'>
            { !mobileSite && pogId && this.handleRenderWishlistIcon() }
            <OfferLink item={item}>
              <OfferLinkAfterWrap>
                {this.handleRenderShowSpecialTxtLimitedInventory()}
                <ImgOfferUnit item={item} />
                <OfferNonImgWrap>
                  <CenterContentWrapper>
                    <TitleOfferUnit item={item} />
                    <OfferPriceTaglineDiscountWrap item={item} />
                    <OfferRatingWrap item={item} />
                  </CenterContentWrapper>
                </OfferNonImgWrap>
              </OfferLinkAfterWrap>
            </OfferLink>
          </div>
        </li>
      );
    } else {
      _classNames = 'offer-unit__li';
      return (<li className={_classNames} key={i}
        data-filter={item.filters}>
        {!mobileSite && pogId && this.handleRenderWishlistIcon()}
        <OfferLink item={item}>
          {this.handleRenderShowSpecialTxtLimitedInventory()}
          <ImgOfferUnit item={item} />
          <OfferNonImgWrap>
            <TitleOfferUnit item={item} />
            <OfferPriceTaglineDiscountWrap item={item} />
            <OfferRatingWrap item={item} />
          </OfferNonImgWrap>
        </OfferLink>
      </li>
      );
    }
    /*
    if (eventId.indexOf('superDod') > -1) {
      _classNames = 'dodSuperDeal_unit offerUnits_2_2 dodSuperDealUnit_ev';
      return (
        <li className={_classNames} key={i}>
          <div className='offerUnit_innerContWrap container--rel'>
            { !mobileSite && pogId && this.handleRenderWishlistIcon() }
            <OfferLink item={item}>
              <OfferLinkAfterWrap>
                <ImgOfferUnit item={item} />
                <ShowLimitedStock />
                <OfferNonImgWrap>
                  <CenterContentWrapper>
                    <TitleOfferUnit item={item} />
                    <OfferPriceTaglineDiscountWrap item={item} />
                    <OfferRatingWrap item={item} />
                  </CenterContentWrapper>
                </OfferNonImgWrap>
              </OfferLinkAfterWrap>
            </OfferLink>
          </div>
        </li>
      );
    } else {
      _classNames = 'offer-unit__li';
      return (<li className={_classNames} key={i}
        data-filter={item.filters}>
        {!mobileSite && pogId && this.handleRenderWishlistIcon()}
        <OfferLink item={item}>
          <ImgOfferUnit item={item} />
          <OfferNonImgWrap>
            <TitleOfferUnit item={item} />
            <OfferPriceTaglineDiscountWrap item={item} />
            <OfferRatingWrap item={item} />
          </OfferNonImgWrap>
        </OfferLink>
      </li>
      );
    }
    */

  }
}
