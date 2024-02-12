import { resortOrder, deleteFromOrder } from "../../services/appSlice";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from '../burger-constructor/burger-constructor.module.css'
import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { TIngredient } from "../../utils/types";
import { Identifier, XYCoord } from "dnd-core";
import { useDispatch2 } from "../../services/redux";




export default function IngredientReorder({item, index}: {item: TIngredient, index: number})
{
  const dispatch  =   useDispatch2()
  const ref       =   useRef<HTMLDivElement | null>(null)


  const [{ handlerId }, drop] = useDrop<{index: number}, unknown, {handlerId: Identifier | null}>({
    accept: 'reorder',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current)   return;

      const dragIndex = item.index
      const hoverIndex = index
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex)   return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY  = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset  = monitor.getClientOffset() as XYCoord
      // Get pixels to the top
      
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
        handleClose={ () => dispatch(deleteFromOrder(index)) }
      />
    </div>
  )
}