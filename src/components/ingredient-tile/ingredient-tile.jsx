import cm from "./ingredient-tile.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";
import { useDrag } from "react-dnd";


ProductTile.propTypes = {
  item:   ingredientListObject.isRequired,
  count:  PropTypes.number,
}


function ProductTile({item, productModalOpen})
{
  const [{opacity}, dragRef, dragPrev] = useDrag({
    type: 'orderInsert',
    item: {item},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ?  0.4 : 1
    })
  })
  

  return(
    <div
      className={cm.tile}
      onClick={e=>productModalOpen(item)}
      ref={dragRef}
      style={{opacity}}
      >
      <div className={cm.count}>{item.count || ''}</div>
      <img className={cm.img} src={item.image} alt={item.name} ref={dragPrev} />
      <div className={cm.cost}>
        <div className={cm.price}>{item.price}</div>
        <CurrencyIcon />
      </div>
      <div className={cm.name}>{item.name}</div>
    </div>
  )
}


export default ProductTile;