import cm from "./profile-orders.module.css"
import { useEffect } from "react"
import { useDispatch2, useSelector2 } from "../../services/redux"
import OrderTile from "../../components/order-tile/order-tile"
import { wsHistoryConnect } from "../../services/appSlice"




export default function ProfileOrders()
{
  const dispatch    = useDispatch2()
  const orders      = useSelector2( state => state.history.orders)
  
  useEffect( () => {
    
    const token   = localStorage.getItem('accessToken')?.substring(7)

    // для пользователя сервер возвращаетс пустой список заказов, почему-то....
    dispatch( wsHistoryConnect(`wss://norma.nomoreparties.space/orders?token=${token}`) )
    

  }, [])



  return (
    <div className={cm.double}>
      
      {orders.map( order =>
        <OrderTile key={order._id} order={order} status={true} />
      )}
      
    </div>
  )
}