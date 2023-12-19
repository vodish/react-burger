import { useRef, useEffect } from 'react';
import cm from './modal-overlay.module.css'


// ProductTile.propTypes = {
//   item:   ingredientListObject.isRequired,
//   count:  PropTypes.number,
// }



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