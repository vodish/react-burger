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
      <div className="state">
      <div>
          Готовы:
        </div>
        <div>
          В работе:
        </div>
      </div>

      <div className="today">
        Выполнено за сегодня:
        <div className="score">28 752</div>
      </div>
      
      <div className="allday">
        Выполнено за все время:
        <div className="score">138</div>
      </div>
    </div>

  </>
}