import { useState} from "react"
import cm from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, ArrowUpIcon, ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { apiSendOrder } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";

import IngredientReorder from "../ingredient-reorder/ingredient-reorder";
import { useDrop } from "react-dnd";
import { orderInsert } from "../../services/appSlice";


function BurgerConstructor()
{
  const dispatch      =   useDispatch()
  const order         =   useSelector(state => state.order)
  const [ top, bot ]  =   useSelector(state => state.order.buns)
  const [ modalOrder, setModalOrder ] =   useState(null)
  const [ maxHeight, setMaxHeight ]   =   useState(null)


  async function orderModalOpen() {
    alert('Отправить заказ!')
    return ;

    const ingredients   =   [...order.buns, ...order.adds].map( item => item._id)
    const sendOrder     =   await apiSendOrder({ingredients})

    if ( sendOrder.error ) {
      alert(sendOrder.error)
    }
    else if ( sendOrder.order ) {
      // setOrder({number: sendOrder.order.number})
    }
  }

  function orderModalClose() {
    setModalOrder(null)
  }


  const [ , dropRef ] = useDrop({
    accept: 'orderInsert',
    drop(item) {
      dispatch( orderInsert(item.item) )
    }
  })

  return(
    <div ref={dropRef}>
      <div className={cm.item}>
        <ConstructorElement
          type="top"
          extraClass={cm.elemClose}
          isLocked={true}
          text={top.name}
          price={top.price}
          thumbnail={top.image_mobile}
        />
      </div>
      <div className={cm.middle} style={{maxHeight}}>
        {
        order.adds.map( (item, index) => 
          <IngredientReorder
            key={index}
            item={item}
            index={index}
          />
        )
        }
      </div>
      <div className={cm.item}>
        <ConstructorElement
          type="bottom"
          extraClass={cm.elemClose}
          isLocked={true}
          text={bot.name}
          price={bot.price}
          thumbnail={bot.image_mobile}
        />
      </div>
      
      
      <div className={cm.summary}>
        <div className={cm.collapse} onClick={e=>setMaxHeight(maxHeight? null:'none')}>
          {maxHeight ?  <ArrowUpIcon type="primary" /> : <ArrowDownIcon type="secondary" />}
        </div>

        <div className={cm.cost}>
          <div className={cm.total}>{order.total}</div> <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={orderModalOpen}
          >Оформить заказ</Button>
      </div>

      
      {modalOrder  &&  <Modal handleClose={orderModalClose}><OrderDetails /></Modal>}
    </div>
  )
}


export default BurgerConstructor;