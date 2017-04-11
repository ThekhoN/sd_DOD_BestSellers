import {h} from 'preact';

const img_placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const ratingActiveStyle = {
  width: '50px'
}

const OfferUnitLi_placeholder = () => (<li className="inactive paddingWrapX99 preData_loading">
                        <div className="offer-unit__img-container--rel">
                          <img className="offerUnit_img OfferImg b-lazy b-loaded" src={img_placeholder} alt="placeholder image"/>
                        </div>
                        <div className="offer-unit__discount-container">
                          <div className="offer-unit__discount"></div>
                        </div>
                        <div className="placeholder__loader--order1 offer-unit__title">&nbsp;</div>
                        <div className="placeholder__loader--order2 offer-unit__rating-review-container ">
                          &nbsp;
                          <div className=" offer-unit__rating-container--rel">
                            <div className="offer-unit__rating--disabled"></div>
                            <div className="offer-unit__rating--enabled" style={ratingActiveStyle}></div>
                          </div><span className="offer-unit__review"></span>
                        </div>
                        <div className="placeholder__loader--order3 offer-unit__price-tagline-discount-container">
                          <div className="offer-unit__price-container">
                          </div>
                        </div>
                      </li>)

export const OfferUnitLiPlaceholderGroup2x1 = () => (<span className='span-container--block'>
    <OfferUnitLi_placeholder/><OfferUnitLi_placeholder/>
  </span>)

export const OfferUnitLiPlaceholderGroup2x2 = () => (<span className="span-container--block">
    <OfferUnitLi_placeholder/><OfferUnitLi_placeholder/><OfferUnitLi_placeholder/><OfferUnitLi_placeholder/>
  </span>)
