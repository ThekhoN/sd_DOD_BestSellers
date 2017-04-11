import {h} from 'preact';

const CaptionWrapper = ({caption, eventId, stylingClass}) => {
  if(eventId.indexOf('BannerX99') > -1){
    return null;
  }
  else {
    let _className = 'caption__container';
    if(stylingClass){_className = stylingClass + ' caption__container' }
  return(<div className={_className}>
    <h3>{caption}</h3>
  </div>)
  }
};

export default CaptionWrapper;
