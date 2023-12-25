import ModalOverlay from '../modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './modal.module.css'
import PropTypes from "prop-types"


Modal.propTypes = {
  handleClose:  PropTypes.func,
}


function Modal(props)
{
  return(
    <>
      {
      createPortal(
        <ModalOverlay handleClose={props.handleClose} />
        , document.getElementById('overlay')
      )
      }
      {
      createPortal(
        <div className={cm.modal}>
          <div className={cm.close} onClick={props.handleClose}><CloseIcon type="primary" /></div>
          {props.children}
        </div>
        , document.getElementById('modal')
      )
      }
    </>
  )
}

export default Modal;