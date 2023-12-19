import { useState } from "react"
import { createPortal } from "react-dom"
import cm from './burger-constructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";
import OrderDetails from "../order-details/order-details";


BurgerConstructor.propTypes = {
  topList: PropTypes.arrayOf(ingredientListObject).isRequired,
  addList: PropTypes.arrayOf(ingredientListObject),
  total: PropTypes.number.isRequired
};


function BurgerConstructor(props)
{
  // console.log(props);
  const [ order, setOrder ] = useState(null)
  
  const { name: topName,  price: topPrice, image_mobile: topImageMobile } =   {...props.topList[0], name: `${props.topList[0].name} (верх)`}
  const { name: botName,  price: botPrice, image_mobile: botImageMobile } =   {...props.topList[1], name: `${props.topList[1].name} (низ)`}


  function orderModalOpen(e)
  {
    // console.log(e)
    setOrder({number: `0345${10 + new Date().getSeconds()}`})
  }

  function orderModalClose()
  {
    setOrder(null)
  }



  return(
    <>
      {
        order  &&  createPortal(<OrderDetails  order={order}  handleClose={orderModalClose} /> ,  document.getElementById("modal")) 
      }


      {/* верхняя булка */}
      <div className={cm.item}>
        <ConstructorElement type="top" extraClass={cm.elem} isLocked={true}   text={topName} price={topPrice} thumbnail={topImageMobile} />
      </div>

      {/* начинка */}
      <div className={cm.middle}>
        {props.addList.map( (item, index) => (

          <div className={cm.item} key={`${item._id}${index}`}>
            <div className={cm.drag}><DragIcon type="primary"/></div>
            <ConstructorElement extraClass={cm.elem}   text={item.name} price={item.price} thumbnail={item.image_mobile} />
          </div>
          
        ))}
      </div>
      
      {/* нижняя булка */}
      <div className={cm.item}>
        <ConstructorElement type="bottom" extraClass={cm.elem} isLocked={true}   text={botName} price={botPrice} thumbnail={botImageMobile} />
      </div>
      

      {/* итого отправить */}
      <div className={cm.summary}>
        <div className={cm.cost}>
          <div className={cm.total}>{props.total}</div>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="medium" onClick={orderModalOpen}>Оформить заказ</Button>
      </div>

    </>
  )
}


export default BurgerConstructor;