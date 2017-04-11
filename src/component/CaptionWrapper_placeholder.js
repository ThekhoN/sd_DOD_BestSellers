import {h} from 'preact';

const CaptionWrapper_placeholder = ({stylingClass}) => {
    let _className = 'caption__container';
    if(stylingClass){_className = stylingClass + ' caption__container' }
    return(<div className={_className}>
    <h3>{`&nbsp;`}</h3>
  </div>)
};

export default CaptionWrapper_placeholder;
