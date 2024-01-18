import AppHeader from "../../components/app-header/app-header"



export default function Feed()
{
  
  return <AppHeader view="double">

    <div className="list">
      <h1>Лента заказов</h1>
      <ul>
        <li>#987213</li>
        <li>#987213</li>
        <li>#987213</li>
        <li>#987213</li>
        <li>#987213</li>
      </ul>
    </div>

    <div className="tablo">

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

  </AppHeader>
}