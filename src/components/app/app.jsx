import { useEffect } from "react";
import cm from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, getIngredientsThunk, deleteFromOrder, updateOrder, resetOrder } from "../../services/appSlice";
import { useDrop } from "react-dnd";
import bun_insert from '../../bun_insert.svg'



function App()
{
  const dispatch        =   useDispatch()
  const { list, error } =   useSelector(state => state.ingredients )
  const order           =   useSelector(state => state.order )

  
  useEffect(()=>{
    dispatch( getIngredientsThunk() )
  }, [])


  const [ , dropIngredients ] = useDrop({
    accept: 'reorder',
    drop(item) {
      dispatch( deleteFromOrder(item.index) )
    }
  })

  const [ , dropConstructor ] = useDrop({
    accept: 'updateOrder',
    drop(item) {
      dispatch( updateOrder(item.item) )
    }
  })

  
  function handleOrderReset() {
    dispatch( resetOrder() )
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
          {list.length > 0 &&
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
              <img src={bun_insert} className={cm.bun_insert} alt="Выберите булки" />
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