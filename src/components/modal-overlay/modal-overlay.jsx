import cm from './modal-overlay.module.css'


function ModalOverlay(props)
{
  return(
    <div className={cm.overlay}>
      {props.children}
    </div>
  )
}

export default ModalOverlay;