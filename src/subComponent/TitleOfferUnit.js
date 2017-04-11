import {h} from 'preact';
import {isLegit_pogId_item} from '../module/ValidateData';

const TitleOfferUnit = ({item}) => {
  let title;
  if(isLegit_pogId_item(item)){
      title = item.offerName?item.offerName:item.commonMinProductDetailsDTO.title;
  }
  else {
      title = item.offerName;
  }
  return (
    <div className="offer-unit__title text--two-line">
      {title}
    </div>
  )
}
export default TitleOfferUnit;
