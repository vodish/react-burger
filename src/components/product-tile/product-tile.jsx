import React from "react";
import style from "./product-tile.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";

class ProductTile extends React.Component
{
  constructor(props)
  {
    super(props)
  }

  render(){

    const item = this.props.item;

    return(
      <div className={style.tile}>
        <div className={style.count}>{this.props.count || ''}</div>
        <img className={style.img} src={item.image} alt={item.name} />
        <div className={style.cost}>
          <div className={style.price}>{item.price}</div>
          <CurrencyIcon />
        </div>
        <div className={style.name}>{item.name}</div>
      </div>
    )
  }
}


ProductTile.propTypes = {
  item: ingredientListObject.isRequired,
  count: PropTypes.number,
}

export default ProductTile;