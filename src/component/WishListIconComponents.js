import { h, Component } from 'preact';
import axios from 'axios';
// WISHLIST options
const ADD_WISHLIST_URL = 'https://www.snapdeal.com/wishlist/add?pog';
const REMOVE_WISHLIST_URL = 'https://www.snapdeal.com/wishlist/remove?pog';
const WISHLIST_URL = 'https://www.snapdeal.com/mywishlist';

export const ShortlistConfirm = ({visibilityClassName}) => (<div className={`shortlist-confirm ${visibilityClassName}`}>
  <p className='shortlist-confirm__info'>Your item has been added to Shortlist.</p>
  <span className='shortlist-confirm__button'>
    <span className='shortlist-confirm__link' onClick={()=>{
      window.open('https://www.snapdeal.com/mywishlist', '_blank');
    }}>View All</span>
  </span>
</div>)

export class WishlistIcon extends Component {
  render(){
    const { title, childPath, width, height } = this.props;
    return (
    <svg
      className='like-icon'
      xmlns="http://www.w3.org/2000/svg"
      width={ width }
      height={ height }
      viewBox="0 0 22 22"
      aria-labelledby="title">
      <title id='title'>{ title }</title>
      { childPath }
  </svg>
    )
  }
}

WishlistIcon.defaultProps = {
  title: 'shortlist',
  width: '22',
  height: '22',
}

export class WishlistIconAbsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      shortlisted: false
    }
    this.renderWishlistIconType = this.renderWishlistIconType.bind(this);
    this.toggleShortList = this.toggleShortList.bind(this);
  }
  toggleShortList(){
    const {shortlisted} = this.state;
    const {pogId} = this.props;
    // console.log('pogId in WishlistIcon: ', pogId);
    /* live */
    //   // if not on snapdeal platform return
    // if(!(window.location.href.indexOf('snapdeal.com') > -1)){
    //   console.log('not on snapdeal platform return. . .');
    //   return ;
    // }
    //   // if logged in
    // if(Snapdeal.Cookie.get('lu') === 'true'){
    //   if(!this.state.shortlisted){
    //     axios.get(`${ADD_WISHLIST_URL}=${pogId}`)
    //       .then( response => {
    //         this.setState({
    //           shortlisted: true
    //         }, ()=> {
    //           this.props.dispatchToMainShowingShortlistConfirm();
    //         });
    //       })
    //       .catch(err => {
    //         console.log('error in ADD_WISHLIST axios: ', err);
    //     });
    //   }
    //   else {
    //     axios.get(`${REMOVE_WISHLIST_URL}=${pogId}`)
    //       .then( response => {
    //         this.setState({
    //           shortlisted: false
    //         });
    //       })
    //       .catch(err => {
    //         console.log('error in REMOVE_WISHLIST axios: ', err);
    //     });
    //   }
    // }
    // else {
    //   if(window.location.href.indexOf('www.snapdeal.com') > 1){
    //     window.showRegister();
    //   }
    // }
    /* local */
    if(!this.state.shortlisted){
      this.setState({
        shortlisted: true
      }, ()=>{
        this.props.dispatchToMainShowingShortlistConfirm();
      })
    }
    else {
      this.setState({
        shortlisted: false
      })
    }
  }
  renderWishlistIconType(){
    const { shortlisted } = this.state;
    if(!shortlisted){
      return <HoveredWishlistPath fill='#666666'/>
    }
    if(shortlisted){
      return <ActiveWishlistPath fill='#e31b48'/>
    }
  }
  render(){
    const {children} = this.props;

    return (
      <div className='wishlist-icon-wrapper--abs'
        onClick={()=>{
          this.toggleShortList();
      }} >
        <WishlistIcon childPath={ this.renderWishlistIconType() } />
      </div>
    )
  }
}


const InactiveWishlistPath = ({ fill }) => (<path fill={ fill } d="M11 19.5l-1.6-1.6c-2.3-2-4-3.6-5.3-5.1C2.7 11 2 9.4 2 7.8 2 6.3 2.5 5 3.5 4s2.3-1.5 3.7-1.5c1.4 0 2.8.6 3.8 1.5 1-.9 2.4-1.5 3.8-1.5s2.7.5 3.7 1.5S20 6.3 20 7.8c0 1.6-.7 3.2-2.1 5-1.2 1.5-3 3.1-5.3 5.1L11 19.5zM7.2 3.8c-2.2 0-3.9 1.7-3.9 4 0 2.8 2.5 5.2 7 9.1l.7.7.7-.7c4.4-3.9 7-6.3 7-9.1 0-2.2-1.7-3.9-3.9-3.9-1.2 0-2.5.6-3.3 1.5L11 6l-.5-.6c-.8-1-2-1.6-3.3-1.6z"/>);

const HoveredWishlistPath = ({ fill }) => (<path fill={ fill } d="M11 19.5l-1.6-1.6c-2.3-2-4-3.6-5.3-5.1C2.7 11 2 9.4 2 7.8 2 6.3 2.5 5 3.5 4s2.3-1.5 3.7-1.5c1.4 0 2.8.6 3.8 1.5 1-.9 2.4-1.5 3.8-1.5s2.7.5 3.7 1.5S20 6.3 20 7.8c0 1.6-.7 3.2-2.1 5-1.2 1.5-3 3.1-5.3 5.1L11 19.5zM7.2 3.8c-2.2 0-3.9 1.7-3.9 4 0 2.8 2.5 5.2 7 9.1l.7.7.7-.7c4.4-3.9 7-6.3 7-9.1 0-2.2-1.7-3.9-3.9-3.9-1.2 0-2.5.6-3.3 1.5L11 6l-.5-.6c-.8-1-2-1.6-3.3-1.6z"/>);

const ActiveWishlistPath = ({ fill }) => (<path fill={ fill } d="M11 19.5l-1.6-1.6c-2.3-2-4-3.6-5.3-5.1C2.7 11 2 9.4 2 7.8 2 6.3 2.5 5 3.5 4s2.3-1.5 3.7-1.5c1.4 0 2.8.6 3.8 1.5 1-.9 2.4-1.5 3.8-1.5s2.7.5 3.7 1.5S20 6.3 20 7.8c0 1.6-.7 3.2-2.1 5-1.2 1.5-3 3.1-5.3 5.1L11 19.5z"/>);
