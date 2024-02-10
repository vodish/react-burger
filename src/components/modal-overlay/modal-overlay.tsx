import { useEffect } from 'react';
import cm from './modal-overlay.module.css'



function ModalOverlay({handleClose}: {handleClose: ()=>void})
{
  useEffect(()=>{
    
    function closeByKey(e: KeyboardEvent): void {
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