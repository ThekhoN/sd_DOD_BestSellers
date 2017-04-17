import { h, Component } from 'preact';

export const ShortlistConfirm = () => (<div className='shortlist-confirm'>
  <p className='shortlist-confirm__info'>Your item has been added to Shortlist.</p>
  <span className='shortlist-confirm__button'>
    <span className='shortlist-confirm__link' onClick={()=>{
      window.open('https://www.snapdeal.com/mywishlist', '_blank');
    }}>View All</span>
  </span>
</div>)

export class WishlistIcon extends Component {
  render(){
    const { title, childPath, width, height, handleOnClick } = this.props;
    return (
    <svg
      className='like-icon'
      onClick={ handleOnClick }
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

export const WishlistIconAbsWrapper = ({ children }) => (
  <div className='wishlist-icon-wrapper--abs' >
    { children }
  </div>
);


export const InactiveWishlistPath = ({ fill }) => (<path fill={ fill } d="M11 19.5l-1.6-1.6c-2.3-2-4-3.6-5.3-5.1C2.7 11 2 9.4 2 7.8 2 6.3 2.5 5 3.5 4s2.3-1.5 3.7-1.5c1.4 0 2.8.6 3.8 1.5 1-.9 2.4-1.5 3.8-1.5s2.7.5 3.7 1.5S20 6.3 20 7.8c0 1.6-.7 3.2-2.1 5-1.2 1.5-3 3.1-5.3 5.1L11 19.5zM7.2 3.8c-2.2 0-3.9 1.7-3.9 4 0 2.8 2.5 5.2 7 9.1l.7.7.7-.7c4.4-3.9 7-6.3 7-9.1 0-2.2-1.7-3.9-3.9-3.9-1.2 0-2.5.6-3.3 1.5L11 6l-.5-.6c-.8-1-2-1.6-3.3-1.6z"/>);

export const HoveredWishlistPath = ({ fill }) => (<path fill={ fill } d="M11 19.5l-1.6-1.6c-2.3-2-4-3.6-5.3-5.1C2.7 11 2 9.4 2 7.8 2 6.3 2.5 5 3.5 4s2.3-1.5 3.7-1.5c1.4 0 2.8.6 3.8 1.5 1-.9 2.4-1.5 3.8-1.5s2.7.5 3.7 1.5S20 6.3 20 7.8c0 1.6-.7 3.2-2.1 5-1.2 1.5-3 3.1-5.3 5.1L11 19.5zM7.2 3.8c-2.2 0-3.9 1.7-3.9 4 0 2.8 2.5 5.2 7 9.1l.7.7.7-.7c4.4-3.9 7-6.3 7-9.1 0-2.2-1.7-3.9-3.9-3.9-1.2 0-2.5.6-3.3 1.5L11 6l-.5-.6c-.8-1-2-1.6-3.3-1.6z"/>);

export const ActiveWishlistPath = ({ fill }) => (<path fill={ fill } d="M11 19.5l-1.6-1.6c-2.3-2-4-3.6-5.3-5.1C2.7 11 2 9.4 2 7.8 2 6.3 2.5 5 3.5 4s2.3-1.5 3.7-1.5c1.4 0 2.8.6 3.8 1.5 1-.9 2.4-1.5 3.8-1.5s2.7.5 3.7 1.5S20 6.3 20 7.8c0 1.6-.7 3.2-2.1 5-1.2 1.5-3 3.1-5.3 5.1L11 19.5z"/>);
