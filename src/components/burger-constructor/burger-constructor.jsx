import { useContext, useState, useReducer, useMemo, useCallback, useEffect } from "react"
import cm from './burger-constructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { apiSendOrder } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { orderDelete } from "../../services/appSlice";



function BurgerConstructor()
{
  const dispatch      =   useDispatch()
  const order         =   useSelector(state => state.order)
  const [ top, bot ]  =   useSelector(state => state.order.buns)

  const [ modalOrder, setModalOrder ] =   useState(null)


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


  return(
    <>
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
      <div className={cm.middle}>
        {
        order.adds.map( (item, index) => 
          <div className={cm.item} key={index}>
            <div className={cm.drag}><DragIcon type="primary"/></div>
            <ConstructorElement
              extraClass={cm.elem}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              handleClose={()=>dispatch(orderDelete(index))}
            />
          </div>
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
        <div className={cm.cost}>
          <div className={cm.total}>{order.total}</div>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="medium" onClick={orderModalOpen}>Оформить заказ</Button>
      </div>

      {
      modalOrder  &&  <Modal handleClose={orderModalClose}><OrderDetails /></Modal>
      }
      
    </>
  )
}


export default BurgerConstructor;