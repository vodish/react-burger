import MyImageSvg  from "../../utils/status1.svg"
import cm from "./order-details.module.css"
import { useSelector2 } from "../../services/redux"


function OrderDetails()
{
  const number = useSelector2( state => state.order.number)
  
  
  return(
    <div className={cm.center}>
      <div className={cm.number}>{number}</div>
      <div className={cm.descr}>идентификатор заказа</div>

      <img className={cm.status} src={MyImageSvg} alt="Ok" />

      <div className={cm.info}>
        <div className={cm.bold}>Ваш заказ начали готовить</div>
        <div>Дождитесь готовности на орбитальной станции</div>
      </div>
    </div>
  )
}

export default OrderDetails;