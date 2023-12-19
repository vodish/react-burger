import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './modal.module.css'


// ProductTile.propTypes = {
//   item:   ingredientListObject.isRequired,
//   count:  PropTypes.number,
// }


function Modal(props)
{
  return(
    <ModalOverlay handleClose={props.handleClose}>
      <div className={cm.modal}>
        <div className={cm.close} onClick={props.handleClose}><CloseIcon type="primary" /></div>
        {props.children}
      </div>
    </ModalOverlay>
  )
}

export default Modal;