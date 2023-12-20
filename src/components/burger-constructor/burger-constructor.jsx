import { useState } from "react"
import cm from './burger-constructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";


BurgerConstructor.propTypes = {
  topList: PropTypes.arrayOf(ingredientListObject).isRequired,
  addList: PropTypes.arrayOf(ingredientListObject),
  total: PropTypes.number.isRequired
};


function BurgerConstructor(props)
{
  const [ order, setOrder ] = useState(null)
  

  const topName         =   `${props.topList[0].name} (верх)`
  const topPrice        =   props.topList[0].price
  const topImageMobile  =   props.topList[0].image_mobile

  const botName         =   `${props.topList[1].name} (верх)`
  const botPrice        =   props.topList[1].price
  const botImageMobile  =   props.topList[1].image_mobile



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
      order  &&  <Modal handleClose={orderModalClose}><OrderDetails  order={order} /></Modal>
      }


      {/* верхняя булка */}
      <div className={cm.item}>
        <ConstructorElement type="top" extraClass={cm.elem} isLocked={true}   text={topName} price={topPrice} thumbnail={topImageMobile} />
      </div>

      {/* начинка */}
      <div className={cm.middle}>
        {props.addList.map( (item, index) => (

          <div className={cm.item} key={index}>
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