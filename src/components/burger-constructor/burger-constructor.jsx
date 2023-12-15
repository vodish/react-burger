import React from "react";
import cm from './burger-constructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";



class BurgerConstructor extends React.Component
{
  render(){

    const top = {...this.props.topList[0], name: `${this.props.topList[0].name} (верх)`}
    const bot = {...this.props.topList[1], name: `${this.props.topList[1].name} (низ)`}

    return(
      <>
        {/* верхняя булка */}
        <div className={cm.item}>
          <ConstructorElement type="top" extraClass={cm.elem} text={top.name} price={top.price} thumbnail={top.image_mobile} isLocked={true} />
        </div>

        {/* начинка */}
        <div className={cm.middle}>
          {this.props.addList.map(item => (

            <div className={cm.item} key={item._id}>
              <div className={cm.drag}><DragIcon type="primary"/></div>
              <ConstructorElement extraClass={cm.elem} text={item.name} price={item.price} thumbnail={item.image_mobile} />
            </div>
          ))}

        </div>
        
        {/* нижняя булка */}
        <div className={cm.item}>
          <ConstructorElement type="bottom" extraClass={cm.elem} text={bot.name} price={bot.price} thumbnail={bot.image_mobile} isLocked={true} />
        </div>
        

        {/* итого отправить */}
        <div className={cm.summary}>
          <div className={cm.cost}>
            <div className={cm.sum}>{this.props.total}</div>
            <CurrencyIcon type="primary" />
          </div>

          <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
        </div>
      </>
    );
  }
}

BurgerConstructor.propTypes = {
  topList: PropTypes.arrayOf(ingredientListObject).isRequired,
  addList: PropTypes.arrayOf(ingredientListObject),
  total: PropTypes.number.isRequired
};


export default BurgerConstructor;