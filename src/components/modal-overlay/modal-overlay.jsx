import { useRef, useEffect } from 'react';
import cm from './modal-overlay.module.css'
import PropTypes from "prop-types"


ModalOverlay.propTypes = {
  handleClose:   PropTypes.func,
}



function ModalOverlay(props)
{
  const ref = useRef();

  useEffect( ()=>{
    document.body.addEventListener('keydown', keyClose)

    return () =>{
      document.body.removeEventListener('keydown', keyClose)
    }
  }, [])


  function keyClose(e)
  {
    if (e.key != "Escape")  return;
    ref.current.click()
  }
  
  
  return(
    <div className={cm.overlay}  ref={ref}  onClick={props.handleClose}></div>
  )
}

export default ModalOverlay;