import ModalOverlay from '../modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './modal.module.css'
import PropTypes from "prop-types"


Modal.propTypes = {
  handleClose:  PropTypes.func.isRequired,
}

// @ts-ignore
function Modal({handleClose, children})
{
  return createPortal(
    <>
      <ModalOverlay handleClose={handleClose} />
      
      <div className={cm.modal}>
        <div className={cm.close} onClick={handleClose}><CloseIcon type="primary" /></div>
        {children}
      </div>
    </>
    // @ts-ignore
    , document.getElementById('modal')
  )
  
}

export default Modal;