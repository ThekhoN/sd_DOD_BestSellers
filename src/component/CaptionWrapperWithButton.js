import {h} from 'preact';
import ButtonModalTrigger from './ButtonModalTrigger'

/*
const CaptionWrapperWithButton = ({caption, eventId, stylingClass}) => {
  if(eventId.indexOf('BannerX99') > -1){
    return null;
  }
  else {
    let _className = 'caption__container';
    if(stylingClass){_className = stylingClass + ' caption__container' }
  return(<div className={_className}>
    <h3>{caption}</h3> <ButtonModalTrigger
      text='filter'
      modalOpen={true}
      handleClose={
        ()=>{
          console.log('close modal');
        }
      }
      handleOpen={
        ()=>{
        console.log('open modal');
    }
  }/>
  </div>)
  }
};
*/

const CaptionWrapperWithButton = ({caption, eventId, stylingClass, children}) => {
  if(eventId.indexOf('BannerX99') > -1){
    return null;
  }
  else {
    let _className = 'caption__container';
    if(stylingClass){_className = stylingClass + ' caption__container' }
  return(<div className={_className}>
    <h3><span className='captionSpan'>{caption}</span>{children}</h3> 
  </div>)
  }
};

export default CaptionWrapperWithButton;
