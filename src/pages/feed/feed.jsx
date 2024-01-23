import AppHeader from "../../components/app-header/app-header"



export default function Feed()
{
  
  return <>

    <div className="list double">
      <h1>Лента заказов</h1>
      <ul>
        <li>#987213</li>
        <li>#987213</li>
        <li>#987213</li>
        <li>#987213</li>
        <li>#987213</li>
      </ul>
    </div>

    <div className="tablo double">

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