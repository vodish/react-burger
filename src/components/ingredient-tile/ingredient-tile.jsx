import cm from "./ingredient-tile.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";
import { useDrag } from "react-dnd";


ProductTile.propTypes = {
  item:   ingredientListObject.isRequired,
  productModalOpen:  PropTypes.func.isRequired,
}


function ProductTile({item, productModalOpen})
{
  const location = useLocation()


  const [{opacity}, dragRef, dragPrev] = useDrag({
    type: 'updateOrder',
    item: {item},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ?  0.4 : 1
    })
  })
  



  return(
    <Link
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
      className={cm.tile}
      // onClick={e=>productModalOpen(item)}
      ref={dragRef}
      style={{opacity}}
      >
      {/* <div
        className={cm.tile}
        onClick={e=>productModalOpen(item)}
        ref={dragRef}
        style={{opacity}}
        > */}
        <div className={cm.count}>{item.count || ''}</div>
        <img className={cm.img} src={item.image} alt={item.name} ref={dragPrev} />
        <div className={cm.cost}>
          <div className={cm.price}>{item.price}</div>
          <CurrencyIcon />
        </div>
        <div className={cm.name}>{item.name}</div>
      {/* </div> */}
    </Link>
  )
}


export default ProductTile;