import Modal from "../modal/modal";
import MyImageSvg  from "../../utils/status1.svg"
import cm from "./order-details.module.css"


// ProductTile.propTypes = {
//   item:   ingredientListObject.isRequired,
//   count:  PropTypes.number,
// }

function OrderDetails(props)
{
  const { number } = props.order;
  

  return(
    <Modal handleClose={props.handleClose}>
      <div className={cm.center}>
        <div className={cm.number}>{number}</div>
        <div className={cm.descr}>идентификатор заказа</div>

        <img className={cm.status} src={MyImageSvg} />

        <div className={cm.info}>
          <div className={cm.bold}>Ваш заказ начали готовить</div>
          <div>Дождитесь готовности на орбитальной станции</div>
        </div>
      </div>
    </Modal>
  )
}

export default OrderDetails;