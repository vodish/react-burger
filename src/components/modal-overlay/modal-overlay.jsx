import { useRef } from 'react';
import cm from './modal-overlay.module.css'


function ModalOverlay(props)
{
  const ref = useRef();

  function handleClose(e)
  {
    if ( e.target != ref.current )   return;

    props.handleClose();
  }


  return(
    <div className={cm.overlay}  ref={ref}  onClick={handleClose}>
      {props.children}
    </div>
  )
}

export default ModalOverlay;