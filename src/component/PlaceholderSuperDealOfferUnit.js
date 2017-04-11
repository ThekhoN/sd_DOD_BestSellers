import {h} from 'preact';

const img_placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const ratingActiveStyle = {
  width: '50px'
}

const PlaceholderSuperDealOfferUnit = () => (<li className=" inactive preData_loading dodSuperDeal_unit offerUnits_2_2 dodSuperDealUnit_ev" id="">
                                    <div className="offer-unit__after-href-container">
                                        <div className="offer-unit__img-container--rel">
                                          <img className="offerUnit_img OfferImg b-lazy b-loaded" src={img_placeholder} alt="placeholder image"/></div>
                                        <div className="offer-unit__non-img-container">
                                            <div className="align-center__container--vertical">
                                                <div className="align-center__container-inner--vertical">
                                                      <div className="placeholder__loader--order1 offer-unit__title text--two-line"></div>
                                                      <div className="placeholder__loader--order2 offer-unit__price-tagline-discount-container">
                                                          <div className="offer-unit__price-container"><span className="offer-unit__price-container--inner"><span className="offer-unit__price"></span><span className="offer-unit__display-price"></span></span>
                                                          </div>
                                                          <div className="offer-unit__discount-container">
                                                              <div className="offer-unit__discount"></div>
                                                          </div>
                                                      </div>
                                                      <div className="placeholder__loader--order3 offer-unit__rating-review-container" data-pogid="639198810200">
                                                      </div>
                                                      <div className="wrap_saveAmt"><span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                          </li>)

export const  PlaceholderSuperDealOfferUnitGroup2x2 = () => (<span className='span-container--block'><PlaceholderSuperDealOfferUnit/><PlaceholderSuperDealOfferUnit/></span>)
