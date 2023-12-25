import { useContext, useState, useReducer, useMemo, useCallback, useEffect } from "react"
import cm from './burger-constructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

// import PropTypes from 'prop-types';
// import { ingredientListObject } from "../../utils/data";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { BConstructorContext } from "./burger-constructor-context";
import { apiSendOrder } from "../../utils/data";


// BurgerConstructor.propTypes = {
//   topList: PropTypes.arrayOf(ingredientListObject).isRequired,
//   addList: PropTypes.arrayOf(ingredientListObject),
//   total: PropTypes.number.isRequired
// };



function totalReducer(state, action)
{
  if ( action.type=='sum'  && action.payload )
  {
    return  action.payload.reduce((total, item) => total + item.price , 0)
  }

  throw  Error('Unknown action: ' + action.type);
}


function BurgerConstructor()
{
  const [ order,    setOrder      ] =   useState(null)
  const { topList,  addList       } =   useContext(BConstructorContext)
  const [ total,    dispachTotal  ] =   useReducer(totalReducer, 0)


  const topName         =   `${topList[0].name} (верх)`
  const topPrice        =   topList[0].price
  const topImageMobile  =   topList[0].image_mobile

  const botName         =   `${topList[1].name} (верх)`
  const botPrice        =   topList[1].price
  const botImageMobile  =   topList[1].image_mobile




  useEffect(()=>{

    dispachTotal({type: 'sum', payload: [...topList, ...addList]})

  }, [
    dispachTotal,
    topList,
    addList,
  ])
  

  async function orderModalOpen()
  {
    const ingredients   =   [...topList, ...addList].map( item => item._id)
    const sendOrder     =   await apiSendOrder({ingredients})

    if ( sendOrder.error ) {
      alert(sendOrder.error)
    }
    else if ( sendOrder.order ) {
      setOrder({number: sendOrder.order.number})
    }
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
        {addList.map( (item, index) => (

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
          <div className={cm.total}>{total}</div>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="medium" onClick={orderModalOpen}>Оформить заказ</Button>
      </div>

    </>
  )
}


export default BurgerConstructor;