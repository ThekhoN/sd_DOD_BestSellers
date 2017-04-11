import {h} from 'preact';

const ImgUnit = ({offerImageUrl, offerName}) => {
  return (
  <img
    className="offerUnit_img OfferImg"
    src={offerImageUrl}
    alt={offerName} />
)}

export default ImgUnit;
