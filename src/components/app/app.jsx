import { useEffect } from "react";
import cm from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { apiGetIngredients } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { ingredientsSetup, orderInsert } from "../../services/appSlice";



function App()
{
  const dispatch        =   useDispatch()
  const { list, error } =   useSelector(state => state.ingredients )
  const orderTotal      =   useSelector(state => state.order.total )

  
  useEffect(()=>{

    (async function() {
      const res = await apiGetIngredients();
      dispatch( ingredientsSetup(res) )

      if ( res.error ) return;
      
      // по-умолчанию булка
      dispatch( orderInsert(res.list[0]) )
      // по-умолчанию начинка
      dispatch( orderInsert(res.list[4]) )
      dispatch( orderInsert(res.list[4]) )
      dispatch( orderInsert(res.list[2]) )
      dispatch( orderInsert(res.list[5]) )
      
    })()

  }, [])



  return(
    <div className={cm.app}>

      <header className={cm.header}>
        <AppHeader />
      </header>

      <main className={cm.main}>
        <div className={cm.ingredients}>
          {error && <div className={cm.error}>{error}</div>}

          {list.length > 0  &&  <BurgerIngredients />}
        </div>
        
        <div className={cm.constructor}>
          {orderTotal > 0 ?  <BurgerConstructor />: <div>Перетащите сюда ингредиенты</div>}
        </div>
      </main>

    </div>
  )
}

export default App;