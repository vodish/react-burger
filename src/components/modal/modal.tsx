import ModalOverlay from '../modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './modal.module.css'



function Modal({handleClose, children}: {handleClose:()=>void, children: JSX.Element})
{
  return createPortal(
    <>
      <ModalOverlay handleClose={handleClose} />
      
      <div className={cm.modal}>
        <div className={cm.close} onClick={handleClose}><CloseIcon type="primary" /></div>
        {children}
      </div>
    </>
    
    , document.getElementById('modal') as Element
  )
  
}

export default Modal;