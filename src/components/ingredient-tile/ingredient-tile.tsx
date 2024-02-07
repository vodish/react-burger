import cm from "./ingredient-tile.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useLocation } from "react-router-dom"
import { useDrag } from "react-dnd";
import { TIngredient } from "../../utils/types";



function IngredientTile({item}: any )
{
  const location = useLocation()

  // перетаскивание в конструктор
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
      ref={dragRef}
      style={{opacity}}
      >

        <div className={cm.count}>{item.count || ''}</div>
        <img className={cm.img} src={item.image} alt={item.name} ref={dragPrev} />
        <div className={cm.cost}>
          <div className={cm.price}>{item.price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className={cm.name}>{item.name}</div>

    </Link>
  )
}


export default IngredientTile;