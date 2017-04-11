import {h} from 'preact'

/*
const ButtonModalTrigger = ({text, handleOpen, handleClose, modalOpen}) => {
    return null
}
*/


const ButtonModalTrigger = ({text, handleModalOpen, visibility}) => {
    return (<span
      className='buttonModalTrigger'
      onClick={()=>{
        handleModalOpen()
    }}
      >{text}</span>)
}


export default ButtonModalTrigger
