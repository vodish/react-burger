import React from "react";
import cm from "./product-tile.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";


function ProductTile(props) {

  const item = props.item;

  return(
    <div className={cm.tile}>
      <div className={cm.count}>{props.count || ''}</div>
      <img className={cm.img} src={item.image} alt={item.name} />
      <div className={cm.cost}>
        <div className={cm.price}>{item.price}</div>
        <CurrencyIcon />
      </div>
      <div className={cm.name}>{item.name}</div>
    </div>
  )
}

ProductTile.propTypes = {
  item: ingredientListObject.isRequired,
  count: PropTypes.number,
}

export default ProductTile;