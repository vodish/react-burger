import ModalOverlay from '../modal-overlay/modal-overlay';
import cm from './modal.module.css'


function Modal(props)
{
  return(
    <ModalOverlay>
      <div className={cm.modal}>
          {props.children}
      </div>
    </ModalOverlay>
  )
}

export default Modal;