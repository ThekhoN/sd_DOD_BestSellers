import {h} from 'preact';

//<div className="offerUnit_Wrapper">

const OfferContainerWrapperDoD = ({children}) => {
  return (<div className="offset--desktop-padding-top-bottom bg--white ">
    <div className="wrap_InnerContentX  flex_width_contstraWrap_96_76_100">
      <div className="offerUnit_Wrapper">
        <div className=" container--rel ">
          {children}
        </div>
      </div>
    </div>
  </div>)
}

export default OfferContainerWrapperDoD;
