import cm from "./feed.module.css"
import OrderTile from "../../components/order-tile/order-tile"

export default function Feed()
{
  
  return <>
    <div className={`double ${cm.list}`}>
      <h1 className={cm.title}>Лента заказов</h1>

      <div className="tiles">
        <OrderTile />
        <OrderTile />
      </div>

    </div>

    
    <div className={`double ${cm.tablo}`}>
      <div className={cm.monitor}>
      <div>
          <div className={cm.monitorName}>Готовы:</div> 
          <div className={`${cm.monitorList} ${cm.monitorListDone}`}>
            {[1,2,3,4,3,4,5,8,9,1].map( el => (
              <div>034538{el}</div>
            ) )}
          </div>
        </div>
        <div>
          <div className={cm.monitorName}>В работе:</div>
          <div className={cm.monitorList}>
            <div>034538</div>
            <div>034538</div>
            <div>034538</div>
          </div>
        </div>
      </div>

      <div className={cm.count}>
        <div>Выполнено за сегодня:</div>
        <div>138</div>
      </div>
      
      <div className={cm.count}>
        <div>Выполнено за все время:</div>
        <div>28 752</div>
      </div>
    </div>

  </>
}