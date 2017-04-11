import {h} from 'preact';
import OfferUnitLi from '../Component/OfferUnitLi';
import SectionX from   '../Component/SectionX';
import InnerCardSectionXWrap from '../Component/InnerCardSectionXWrap';
import CaptionWrapper from '../Component/CaptionWrapper';

import OfferUnitListBannerX from '../Banner_Component/OfferUnitListBannerX';
import OfferContainerWrapperDoD from '../Component/OfferContainerWrapperDoD';
import OfferContainerWrapperNormal from '../Component/OfferContainerWrapperNormal';

const OfferContainer = ({eventIds, data, captions}) => {
  console.log('eventIds: ', eventIds);
  return (
    <div className="OfferContainer">
        {eventIds.map(eventId=>{
          if(eventId.indexOf('BannerX99') > -1){
            return (
              <SectionX id={eventId}>
                <InnerCardSectionXWrap>
                  <ul className=" footerBannerX99_Wrapper">
                    {data.filter(offer=>(
                      offer.eventId === eventId))
                      .map((thisOffer, i) => (<OfferUnitListBannerX item={thisOffer} i={i}/>))
                    }
                  </ul>
                </InnerCardSectionXWrap>
              </SectionX>
            )
          }
          if(eventId.indexOf('superDod') > -1){
            return (
              <SectionX id={eventId}>
                <InnerCardSectionXWrap>
                <CaptionWrapper caption={captions[eventId]} eventId={eventId} stylingClass="bg--gradient-orange-to-red"/>
                <OfferContainerWrapperDoD>
                  <ul className="  ">
                    {data.filter(offer=>(
                      offer.eventId === eventId))
                      .map((thisOffer, i) => (<OfferUnitLi item={thisOffer} i={i}/>))
                    }
                  </ul>
                </OfferContainerWrapperDoD>
                </InnerCardSectionXWrap>
              </SectionX>
            )
          }
          else {
            return (
              <SectionX id={eventId}>
                <InnerCardSectionXWrap>
                <CaptionWrapper caption={captions[eventId]} eventId={eventId} stylingClass="bg--gradient-green-to-blue"/>
                <OfferContainerWrapperNormal>
                  <ul className="  ">
                    {data.filter(offer=>(
                      offer.eventId === eventId))
                      .map((thisOffer, i) => (<OfferUnitLi item={thisOffer} i={i}/>))
                    }
                  </ul>
                </OfferContainerWrapperNormal>
                </InnerCardSectionXWrap>
              </SectionX>
            )
          }
        }

          )}
      </div>
  )
}

export default OfferContainer;
