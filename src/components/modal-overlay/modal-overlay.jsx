import { useEffect } from 'react';
import cm from './modal-overlay.module.css'
import PropTypes from "prop-types"


ModalOverlay.propTypes = {
  handleClose:   PropTypes.func,
}



function ModalOverlay({handleClose})
{
  useEffect(()=>{
    
    function closeByKey(e) {
      if (e.key != "Escape")  return;
      handleClose()
    }
    
    document.body.addEventListener('keydown', closeByKey)

    return () =>{
      document.body.removeEventListener('keydown', closeByKey)
    }
  }, [])


  
  return(
    <div className={cm.overlay} onClick={handleClose}></div>
  )
}

export default ModalOverlay;