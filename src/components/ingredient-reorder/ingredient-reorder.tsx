import { useDispatch } from "react-redux";
import { resortOrder, deleteFromOrder } from "../../services/appSlice";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from '../burger-constructor/burger-constructor.module.css'
import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { TIngredient } from "../../utils/types";



// export default function IngredientReorder({item, index}: {item: TIngredient, index: number})
// @ts-ignore
export default function IngredientReorder({item, index})
{
  const dispatch  =   useDispatch()
  const ref       =   useRef(null)

  
  const [{ handlerId }, drop] = useDrop({
    accept: 'reorder',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current)   return;

      // @ts-ignore
      const dragIndex = item.index
      const hoverIndex = index
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex)   return;

      // Determine rectangle on screen
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY  = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset  = monitor.getClientOffset()
      // Get pixels to the top
      // @ts-ignore
      const hoverClientY  = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex)
      dispatch( resortOrder([dragIndex, hoverIndex]) )

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // @ts-ignore
      item.index = hoverIndex
    }
  })






  const [ , drag] = useDrag({
    type: 'reorder',
    item: {index}
  })



  drag(drop(ref))

  return(
    <div
      ref={ref}
      
      className={cm.item}
      data-handler-id={handlerId}
      > 
      <div className={cm.drag}><DragIcon type="secondary"/></div>
      
      <ConstructorElement
        extraClass={cm.elem}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        // @ts-ignore
        handleClose={e=>{
          e.preventDefault()
          dispatch(deleteFromOrder(index))
        }}
      />
    </div>
  )
}