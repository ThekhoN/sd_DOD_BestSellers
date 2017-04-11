import classList from 'classlist-polyfill';

var _inactive = document.getElementsByClassName('inactive');

const fadeOut_inactive = () => {
  //console.log('addClass fadeOut...');
  for(var i=0; i<_inactive.length; i++){
    _inactive[i].classList.add('fadeOutx99');
  }
};

export default fadeOut_inactive;

export const preLoader_animation = () => {
  for(var i=0; i<_inactive.length; i++){
    _inactive[i].classList.add('preData_loading');
  }
};
