import { useState, useEffect, useRef } from "react";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientTile from "../ingredient-tile/ingredient-tile";
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";

import cm from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";
import { useSelector } from "react-redux";



const TYPE_NAMES  =   {
  bun:    "Булки",
  main:   "Начинки",
  sauce:  "Соусы",
}


BurgerIngredients.propTypes = {
  ingredientList:   PropTypes.arrayOf(ingredientListObject),
  selectedList:     PropTypes.object,
};




export function tabClickScroll(id)
{
   let section    =  document.getElementById(id)
   let area       =  section.parentNode;
   
   // прокрутка до точки
   let pointTop   =   0;
   while( section = section.previousSibling ) pointTop += section.scrollHeight;
   pointTop    =  pointTop === 0 ? pointTop: pointTop + 40;
   
   // смещение
   // шаг
   // duration
   const offset   =  pointTop - area.scrollTop;
   const step     =  area.scrollTop < offset ?  15 : -15;
   const duration =  8;

   //анимация
   if ( window.loop ) clearInterval(window.loop)

   window.loop = setInterval(function(){

      // console.log(area.scrollTop)
      area.scrollTop += step;
      
      if (  (step > 0 && area.scrollTop >= pointTop)
         || (step < 0 && area.scrollTop <= pointTop)
      )
      {
         area.scrollTop = pointTop
         // console.log(`pointTop = ${pointTop}`)
         // console.log(`area.scrollTop = ${area.scrollTop}`)
         return clearInterval(window.loop)
      }
      
   }, duration);
   
   
}













function BurgerIngredients()
{
  const list = useSelector(state => state.ingredients.list)

  const [ select, setSelect         ] =   useState("")
  const [ exists, setExists         ] =   useState([])
  const [ indexes, setIndexes       ] =   useState({})
  const [ ingredientModal, setIngredientModal ] =   useState(null);

  const refList   =   useRef();

  useEffect(()=> {

    let exists  = []
    let indexes = list.reduce( (ret, {type}, index) =>
      {
        if ( ! exists.includes(type) )   exists = [...exists, type]
        
        ret[type] =   ret[type] === undefined ?  [index] :  [...ret[type], index];
        
        return ret
      }
      ,{}
    )
    
    setSelect(exists[0])
    setExists(exists)
    setIndexes(indexes)
    

  }, [])
  
  


  function clickTab(value)
  {
    tabClickScroll(value)
    setSelect(value)
  }


  function getTypeName(type)
  {
    return TYPE_NAMES[type] ?  TYPE_NAMES[type] :  type;
  }


  function productModalOpen(e)
  {
    // console.log(e)
    setIngredientModal(e.item)
  }

  function productModalClose()
  {
    setIngredientModal(null)
  }
  

  
  return(
    <>
      <h1>Соберите бургер</h1>
      
      <div className={cm.tabs}>
        {
        exists.map( type => 
          <Tab  value={type}  key={type}  active={select == type}  onClick={clickTab} >
            {getTypeName(type)}
          </Tab>
        )
        }
      </div>

      <div className={cm.list}  ref={refList}>
        {
        exists.map( type =>
          <div id={type}  className={cm.type}  key={type}>

            <h2>{getTypeName(type)}</h2>
            {
            indexes[type].map( i =>
              <IngredientTile
                item={list[i]}
                key={list[i]._id}
                count={list[i].count}
                productModalOpen={productModalOpen}
              />
            )
            }

          </div>
        )
        }
      </div>
      

      {
      ingredientModal  &&  <Modal handleClose={productModalClose}><IngredientDetails ingredient={ingredientModal} /></Modal>
      }
      
    </>
  );

}





export default BurgerIngredients;