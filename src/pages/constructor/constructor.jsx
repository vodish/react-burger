import { useEffect } from "react";
import cm from "./constructor.module.css";
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsThunk, deleteFromOrder, updateOrder, resetOrder } from "../../services/appSlice";
import { useDrop } from "react-dnd";
import bun_insert from '../../bun_insert.svg'



export default function Constructor()
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
    <AppHeader>
      
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

      {order.number  &&
        <Modal handleClose={handleOrderReset}>
          <OrderDetails />
        </Modal>
      }
    </AppHeader>
  )
}
