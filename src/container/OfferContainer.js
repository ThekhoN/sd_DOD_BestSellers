const url = 'http://codepen.io/TheEnd/pen/QGojMQ.js';
import { h, Component, render } from 'preact';
import LazyLoad from 'react-lazyload'
/** @jsx h */
//utils
const MobPlatformCheck = () => {
  let currURLX = window.location;
  const mob_preURL_str = 'm.snapdeal.com';
  currURLX = String(currURLX);
  const mobileSite_running = (currURLX.indexOf(mob_preURL_str) > 0)? true: false;
  return mobileSite_running;
};
const isISObject = (obj) => {
  return obj && obj !== 'null' && obj !== 'undefined';
};
const isLegit_pogId_item = item => {
  if(isISObject(item.commonMinProductDetailsDTO) && isISObject(item.commonMinProductDetailsDTO.priceInfo)){
    return true;
  }
  else {
    return false;
  }
};
const isLegit_vendorDTO_item = item => {
  if(isLegit_pogId_item(item) && isISObject(item.commonMinProductDetailsDTO.vendorDTO)){
      return true;
  }
  else {
    return false;
  }
};

const ImgUnit = ({offerImageUrl, offerName}) => (<img
    className="offerUnit_img"
    src={offerImageUrl}
    alt={offerName} />)

const ImgOfferUnit = ({item}) => {
  let offerImageUrl, userDefined_offerImageUrl, sdgold, offerName;
      offerName = item.offerName? item.offerName: '';
      if(isLegit_pogId_item(item)){
          offerImageUrl = userDefined_offerImageUrl?userDefined_offerImageUrl:item.commonMinProductDetailsDTO.imgs[0];
          sdgold = item.commonMinProductDetailsDTO.vendorDTO.sdgold;
      }
      else {
          offerImageUrl = userDefined_offerImageUrl;
      }
    return (
      <div className="offer-unit__img-container--rel">
        <ImgUnit offerImageUrl={offerImageUrl} offerName={offerName}/>
      </div>
    );
}

/*
const OfferUnitLi = ({item}) => (<li>
    <LazyLoad height={200} offset={200} once>
      <ImgOfferUnit item={item}/>
      <br  />
      <p>An OfferUnitLi</p>
    </LazyLoad></li>)
*/

const imgPlaceholderStyle = {
  'width': '200px',
  'height': '200px',
  'background':'red',
  'color': 'black',
  'fontWeight': 'bold'
}

const ImgPlaceholder2 = () => (<div style={imgPlaceholderStyle}><h2>image placeholder</h2></div>)

class ImgPlaceholderComponent extends Component {
  render(){
    return (<img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        alt='image placeholder' />)
  }
}

const LazyLoadedOfferUnitLi = ({item}) => (<li>
    <LazyLoad height={200} offset={200} once placeholder={<ImgPlaceholder2/>}>
      <ImgOfferUnit item={item}/>
    </LazyLoad>
    <br  />
    <p>{item.offerName || 'offerName Placeholder999'}</p>
  </li>)

class OfferContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[]
    };
  }
  componentDidMount(){
    console.log('component did mount. . .');
    fetch(url)
    .then((response) => {
      return response.json();
    }).then((data) => {
      const _data = data.genericOfferItems;
      console.log('consume data: ', _data);
      this.setState({data: _data});
    }).catch((err) => {
      console.log('fetch error', err);
    });
  }
  renderListItemUnit(item){
    return (<li><ImgOfferUnit item={item}/></li>)
  }
  render(){
    return (
      <ul className="OfferContainer">
        {this.state.data.map((item, i) => {
          return (
              <LazyLoadedOfferUnitLi item={item} key={i}/>
          );
        })}
      </ul>
    )
  }
}

export default OfferContainer
