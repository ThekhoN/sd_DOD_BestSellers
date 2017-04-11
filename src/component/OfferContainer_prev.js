import {h} from 'preact';
import OfferUnitLi from '../Component/OfferUnitLi';
import SectionX from   '../Component/SectionX';
import InnerCardSectionXWrap from '../Component/InnerCardSectionXWrap';
import CaptionWrapper from '../Component/CaptionWrapper';

const OfferContainer = ({eventIds, data}) => {
  return (
    <div>
      <h2>Main OfferContainer</h2>
      <div>
        {eventIds.map(eventId=>(
          <SectionX>
          <InnerCardSectionXWrap>
          <CaptionWrapper caption={eventId} eventId={eventId}/>
            <ul id={eventId} className="ListOfferContainer">
              {data.filter(offer=>(
                offer.eventId == eventId))
                .map((thisOffer, i) => (
                <OfferUnitLi item={thisOffer} i={i}/>
              ))}
            </ul>
          </InnerCardSectionXWrap>
          </SectionX>
        ))}
      </div>
    </div>
  )
}

export default OfferContainer;
