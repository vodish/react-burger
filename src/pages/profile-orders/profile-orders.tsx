import { useEffect } from "react"
import { useDispatch2, useSelector2 } from "../../services/redux"
import { TFeedData } from "../../utils/types"
import OrderTile from "../../components/order-tile/order-tile"
import { updateHystoryOrders } from "../../services/appSlice"


export default function ProfileOrders()
{
  const dispatch    = useDispatch2()
  const orders      = useSelector2( state => state.hystory.orders)
  
  useEffect( () => {
    
    const token   = localStorage.getItem('accessToken')?.substring(7)
    // const ws      = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`)
    const ws      = new WebSocket("wss://norma.nomoreparties.space/orders/all")
    ws.onmessage  = e => {
        const data: TFeedData = JSON.parse(e.data)
        console.log(data)
        dispatch( updateHystoryOrders(data) )
        
    }
  }, [])



  return (
    <div className="double">
      
      {orders.map( order =>
        <OrderTile key={order._id} order={order} status={true} />
      )}
      
    </div>
  )
}