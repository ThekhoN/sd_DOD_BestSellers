import {h} from 'preact';

const OfferContainerWrapperNormal = ({children}) => {
  return (<div className="offset--desktop-padding-top-bottom bg--white offset--margin-bottom">
        <div className="responsive-font-size--reset-0 responsive-layout--centered">
          {children}
        </div>
  </div>)
}

export default OfferContainerWrapperNormal;
