import { useSelector } from "react-redux"
import MyImageSvg  from "../../utils/status1.svg"
import cm from "./order-details.module.css"
import PropTypes from 'prop-types'


OrderDetails.propTypes = {
  handleClose:  PropTypes.func,
  order:        PropTypes.shape({
                  number: PropTypes.number,
                })
}

function OrderDetails()
{
  const number = useSelector(state => state.order.number)
  
  
  return(
    <div className={cm.center}>
      <div className={cm.number}>{number}</div>
      <div className={cm.descr}>идентификатор заказа</div>

      <img className={cm.status} src={MyImageSvg} />

      <div className={cm.info}>
        <div className={cm.bold}>Ваш заказ начали готовить</div>
        <div>Дождитесь готовности на орбитальной станции</div>
      </div>
    </div>
  )
}

export default OrderDetails;