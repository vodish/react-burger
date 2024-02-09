import { useEffect } from 'react';
import cm from './modal-overlay.module.css'
import PropTypes from "prop-types"


ModalOverlay.propTypes = {
  handleClose:   PropTypes.func,
}


// @ts-ignore
function ModalOverlay({handleClose})
{
  useEffect(()=>{
    
    function closeByKey(e: React.KeyboardEvent): void {
      if (e.key != "Escape")  return;
      handleClose()
    }
    
    // @ts-ignore
    document.body.addEventListener('keydown', closeByKey)

    return () =>{
      // @ts-ignore
      document.body.removeEventListener('keydown', closeByKey)
    }
  }, [])


  
  return(
    <div className={cm.overlay} onClick={handleClose}></div>
  )
}

export default ModalOverlay;