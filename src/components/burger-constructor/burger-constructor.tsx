import { useState} from "react"
import { useNavigate } from "react-router-dom"
import cm from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, ArrowUpIcon, ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";

import IngredientReorder from "../ingredient-reorder/ingredient-reorder";
import { sendOrderThunk, closeOrderError } from "../../services/appSlice";
import Modal from "../modal/modal";
import { TIngredient } from "../../utils/types";
import { useDispatch2, useSelector2 } from "../../services/redux";



export default function BurgerConstructor()
{
  const dispatch      =   useDispatch2()
  const navigate      =   useNavigate()
  
  const userName      =   useSelector2( state => state.user.name )
  const order         =   useSelector2( state => state.order)
  const [ top, bot ]  =   useSelector2( state => state.order.buns)


  const [ maxHeight,  setMaxHeight  ]   =   useState(true)



  async function handleOrderSubmit() {
    if ( ! userName ) {
      navigate('/login')
      return;
    }

    const ingredients =   [...order.buns, ...order.adds].map( (item: TIngredient) => item._id)
    
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
      <div className={`${cm.middle} ${!maxHeight && cm.midMH}`}>
        {
        order.adds.map( (item: TIngredient, index: number) => 
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
        {order.adds.length > 3 &&
          <div className={cm.collapse} onClick={ ()=> setMaxHeight(!maxHeight) }>
            {!maxHeight ?  <ArrowUpIcon type="secondary" /> : <ArrowDownIcon type="success" />}
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

