import cm from "./feed.module.css"
import OrderTile from "../../components/order-tile/order-tile"
import { useDispatch2, useSelector2 } from "../../services/redux"
import { wsFeedConnect } from "../../services/appSlice"
import { useEffect } from "react"



export default function Feed()
{
  const dispatch    = useDispatch2()
  const orders      = useSelector2( state => state.feed.orders)
  const total       = useSelector2( state => state.feed.total)
  const totalToday  = useSelector2( state => state.feed.totalToday)
  const statuses    = useSelector2( state => state.feed.statuses)



  useEffect( () => {
    dispatch( wsFeedConnect("wss://norma.nomoreparties.space/orders/all") )
  }, [])


  

  return <>
    <div className={`double ${cm.list}`}>
      <h1 className={cm.title}>Лента заказов</h1>

      <div className={cm.tiles}> 
        {orders.map( order => <OrderTile key={order._id} order={order} /> )}
      </div>

    </div>

    
    <div className={`double ${cm.tablo}`}>
      <div className={cm.monitor}>
      <div>
          <div className={cm.monitorName}>Готовы:</div> 
          <div className={`${cm.monitorList} ${cm.monitorListDone}`} style={{height: statuses.done? (statuses.done/10)*230: 230}}>
            {orders.map( order => {
              if ( order.status !== 'done' )  return;
              return <div key={order._id}>{order.number}</div>
              })
            }
          </div>
        </div>
        <div>
          <div className={cm.monitorName}>В работе:</div>
          <div className={cm.monitorList}>
            {orders.map( order => {
                if ( order.status !== 'pending' )  return;
                return <div key={order._id}>{order.number}</div>
              })
            }
          </div>
        </div>
      </div>

      <div className={cm.count}>
        <div>Выполнено за сегодня:</div>
        <div>{totalToday}</div>
      </div>
      
      <div className={cm.count}>
        <div>Выполнено за все время:</div>
        <div>{total}</div>
      </div>
    </div>

  </>
}