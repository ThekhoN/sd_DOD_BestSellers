import {h} from 'preact';
import {isLegit_pogId_item} from '../module/ValidateData';

const getRatingElemWidth = rating => {
  let widthFactor = 0;
  const maxWidth = 70;
  const val = rating.toString();
  if (val < 1 || val > 5) {
    return false;
  }
  widthFactor = ((((val / 5) * 100) / 100) * maxWidth);
  widthFactor = Math.round(widthFactor * 10) / 10;
  return widthFactor;
}

const NoOfReviews = ({noOfReviews}) => (
  <span className="offer-unit__review">
    {`(${noOfReviews})`}
  </span>
)
const OfferRating = ({ratingWidthFactor}) => (
  <div className="offer-unit__rating-container--rel">
    <div className="offer-unit__rating--disabled"></div>
      <div className="offer-unit__rating--enabled" style={{width: ratingWidthFactor}}>
      </div>
  </div>
)

const OfferRatingWrap = ({item}) => {
  if(!isLegit_pogId_item(item)){
    return (
      <div className="offer-unit__rating-review-container"></div>
    )
  }
  else {
    const {noOfreviews} = item.commonMinProductDetailsDTO;
    const avgRating = item.commonMinProductDetailsDTO.avgRating;
    const ratingWidthFactor = getRatingElemWidth(avgRating);
    if(!avgRating){
      return (
        <div className="offer-unit__rating-review-container">
        </div>
      )
    }
    if(noOfreviews && avgRating){
      return (
        <div className="offer-unit__rating-review-container">
          <OfferRating ratingWidthFactor={ratingWidthFactor}/>
          <NoOfReviews noOfReviews={noOfreviews}/>
        </div>
      )
    }
    else {
      return (
        <div className="offer-unit__rating-review-container">
          <OfferRating ratingWidthFactor={ratingWidthFactor}/>
        </div>
      )
    }
  }
}



export default OfferRatingWrap;
