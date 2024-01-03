import { useEffect } from "react";
import cm from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { apiGetIngredients, ingredientsSetup, orderDelete, orderInsert, orderReset } from "../../services/appSlice";
import { useDrop } from "react-dnd";



function App()
{
  const dispatch        =   useDispatch()
  const { list, error } =   useSelector(state => state.ingredients )
  const order           =   useSelector(state => state.order )

  
  useEffect(()=>{

    (async function() {
      const res = await apiGetIngredients();
      dispatch( ingredientsSetup(res) )

      if ( res.error ) return;
      
      // // по-умолчанию булка
      // dispatch( orderInsert(res.list[0]) )
      // // по-умолчанию начинка
      // dispatch( orderInsert(res.list[4]) )
      // dispatch( orderInsert(res.list[2]) )
      // dispatch( orderInsert(res.list[5]) )
      // dispatch( orderInsert(res.list[2]) )
      
    })()

  }, [])


  const [ , dropIngredients ] = useDrop({
    accept: 'reorder',
    drop(item) {
      dispatch( orderDelete(item.index) )
    }
  })

  const [ , dropConstructor ] = useDrop({
    accept: 'orderInsert',
    drop(item) {
      dispatch( orderInsert(item.item) )
    }
  })

  
  function handleOrderReset() {
    dispatch( orderReset() )
  }


  return(
    <div className={cm.app}>

      <header className={cm.header}>
        <AppHeader />
      </header>

      <main className={cm.main}>
        <div className={cm.ingredients} ref={dropIngredients}>
          {error &&
            <div className={cm.error}>{error}</div>
          }
          {list.length &&
            <BurgerIngredients />
          }
        </div>
        
        <div className={cm.constructor} ref={dropConstructor}>
          {order.total > 0
            ?
            <BurgerConstructor />
            :
            <div className={cm.empty}>
              <h1>Выберите булки</h1>
              <div>чтобы сделать новый заказ</div>
            </div>
          }
        </div>
      </main>

      {order.number  &&
        <Modal handleClose={handleOrderReset}>
          <OrderDetails />
        </Modal>
      }

    </div>
  )
}

export default App;