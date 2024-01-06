import { useState} from "react"
import cm from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, ArrowUpIcon, ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";

import IngredientReorder from "../ingredient-reorder/ingredient-reorder";
import { sendOrder } from "../../services/appSlice";


function BurgerConstructor()
{
  const dispatch      =   useDispatch()
  const order         =   useSelector(state => state.order)
  const [ top, bot ]  =   useSelector(state => state.order.buns)

  const [ maxHeight,  setMaxHeight  ]   =   useState(null)



  async function handleOrderSubmit() {
    const ingredients =   [...order.buns, ...order.adds].map( item => item._id)
    dispatch( sendOrder(ingredients) )
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

    </>
  )
}


export default BurgerConstructor;