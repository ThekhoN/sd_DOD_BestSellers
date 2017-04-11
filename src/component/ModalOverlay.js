import {h} from 'preact'

/*
if(active){
  className += 'active'
}
else {
  className = className
}

*/

const ModalOverlay = ({active, handleModalClose}) => {

  let eleClass;
  if(active === false){
    eleClass = 'modal-overlay'
    //eleClass = 'active modal-overlay'
  }
  else {
    eleClass = 'active modal-overlay'
    //eleClass = 'modal-overlay'
  }
  return (<div className={eleClass} onClick={()=>{handleModalClose()}}></div>)
}

export default ModalOverlay
