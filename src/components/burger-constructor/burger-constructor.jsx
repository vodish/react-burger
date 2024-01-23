import { useState} from "react"
import { useNavigate } from "react-router-dom"
import cm from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, ArrowUpIcon, ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";

import IngredientReorder from "../ingredient-reorder/ingredient-reorder";
import { sendOrderThunk, closeOrderError } from "../../services/appSlice";
import Modal from "../modal/modal";



function BurgerConstructor()
{
  const dispatch      =   useDispatch()
  const navigate      =   useNavigate()
  const userName      =   useSelector(state => state.user.name )
  const order         =   useSelector(state => state.order)
  const [ top, bot ]  =   useSelector(state => state.order.buns)

  const [ maxHeight,  setMaxHeight  ]   =   useState(null)



  async function handleOrderSubmit() {
    if ( ! userName ) {
      navigate('/login')
      return;
    }

    const ingredients =   [...order.buns, ...order.adds].map( item => item._id)
    dispatch( sendOrderThunk(ingredients) )
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
      <div className={cm.middle} style={{maxHeight}}>
        {
        order.adds.map( (item, index) => 
          <IngredientReorder
            key={item.uuid}
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
        {
          order.adds.length > 3 &&
          <div className={cm.collapse} onClick={ ()=> setMaxHeight(maxHeight? null:'none') }>
            {maxHeight ?  <ArrowUpIcon type="secondary" /> : <ArrowDownIcon type="success" />}
          </div>
        }

        <div className={cm.cost}>
          <div className={cm.total}>{order.total}</div> <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderSubmit}
          >Оформить заказ</Button>
      </div>
      

      {order.error && (
        <Modal handleClose={ ()=> dispatch(closeOrderError()) }>
            <div className="error" dangerouslySetInnerHTML={{__html:order.error}}></div>
        </Modal>
      )}

    </>
  )
}


export default BurgerConstructor;