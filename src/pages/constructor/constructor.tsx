import cm from "./constructor.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { deleteFromOrder, updateOrder, resetOrder } from "../../services/appSlice";
import { useDrop } from "react-dnd";
import bun_insert from '../../bun_insert.svg'
import { TIngredient } from "../../utils/types";
import { useDispatch2, useSelector2 } from "../../services/redux";
import OrderTimer from '../../components/order-timer/order-timer';


type TDrop = {
  index: number
  item: TIngredient
}



export default function Constructor()
{
  const dispatch        =   useDispatch2()
  const { list, error } =   useSelector2( state => state.ingredients )
  const order           =   useSelector2( state => state.order )
  


  const [ , dropIngredients ] = useDrop<TDrop>({
    accept: 'reorder',
    drop(item) {
      dispatch( deleteFromOrder(item.index) )
    }
  })
  
  const [ , dropConstructor ] = useDrop<TDrop>({
    accept: 'updateOrder',
    drop(item) {
      dispatch( updateOrder(item.item) )
    }
  })

  
  
  function handleOrderReset() {
    dispatch( resetOrder() )
  }



  return(
    <>
      <div className={cm.ingredients} ref={dropIngredients}>
        {error &&
          <div className={cm.error}>{error}</div>
        }
        {list.length > 0 &&
          <BurgerIngredients />
        }
      </div>
      
      <div className={cm.constructor1} ref={dropConstructor}>
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
      

      {order.send &&
        <Modal handleClose={handleOrderReset}>
          { order.number > 0 
            ? <OrderDetails />
            : <div className={cm.timer}>
                <div>Готовим</div>
                <div><OrderTimer /></div>
              </div>
          }
        </Modal>
      }
    </>
  )
}
