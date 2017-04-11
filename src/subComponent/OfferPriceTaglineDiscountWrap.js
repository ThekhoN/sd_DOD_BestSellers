import {h} from 'preact';
import {isLegit_pogId_item} from '../module/ValidateData';

//mainWrapper
const OfferPriceTaglineDiscountWrap = ({item}) => {
  if (isLegit_pogId_item(item)) {
    const {finalPrice, mrp, discount} = item.commonMinProductDetailsDTO.priceInfo;
    //price & discount
    return (
      <div className="offer-unit__price-tagline-discount-container">
        <GetOfferPriceMRP price={finalPrice} mrp={mrp}/>
        <GetOfferDiscountUnit discount={discount} />
      </div>
    )
  } else {
    //tagLine
    return (
      <div className="offer-unit__price-tagline-discount-container">
        <GetTagLineUnit item={item} />
      </div>
    )
  }
}

//sub
// +++++ PRICE
const GetOfferPriceMRP = ({price, mrp}) => {
  if(price === mrp){
    return (
      <OfferPriceOnly price={price}/>
    )
  }
  else {
    return (
      <OfferPriceMRP price={price} mrp={mrp}/>
    )
  }
}
const OfferPriceOnly = ({price}) => {
  return (
    <div className="offer-unit__price-container">
      <div className="offer-unit__price-container--inner">
        <span className="offer-unit__display-price">{`Rs. ${price}`}</span>
      </div>
    </div>
  )
}
const OfferPriceMRP = ({mrp, price}) => {
  return (
    <div className="offer-unit__price-container">
      <div className="offer-unit__price-container--inner">
        <span className="offer-unit__price">{`Rs. ${mrp}`}</span>
        <span className="offer-unit__display-price">{`Rs. ${price}`}</span>
      </div>
    </div>
  )
}


// +++++ DISCOUNT
const OfferDiscountUnit = ({discount}) => (<div className="offer-unit__discount-container"><div className="offer-unit__discount">{`${discount}% Off`}</div></div>);
const GetOfferDiscountUnit = ({discount}) => {
  if (!discount || discount === null || discount === 0) {
    return null;
  } else {
    if (discount > 10) {
      return OfferDiscountUnit({discount});
    } else {
      return null;
    }
  }

}

// +++++ TAGLINE
const TagLineUnit = ({tagline}) => (<div className="offerUnit_taglineWrap"><div className="offerUnit_tagline">{tagline}</div></div>);
const GetTagLineUnit = ({item}) => {
  const tagline = item.extraField1;
  return TagLineUnit({tagline});
}


export default OfferPriceTaglineDiscountWrap;
