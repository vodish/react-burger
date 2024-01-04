import { useState, useEffect, useRef } from "react";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientTile from "../ingredient-tile/ingredient-tile";
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";

import cm from './burger-ingredients.module.css'
import { useSelector } from "react-redux";




export default function BurgerIngredients()
{
  const { list, types }   =   useSelector(state => state.ingredients)

  const refList   =   useRef();
  const [ tabActive, setTabActive ]             =   useState( types[0].type )
  const [ ingredientModal, setIngredientModal ] =   useState(null);


  
  function listScroll(e) {
    let tab  = ''
    let value = Infinity

    for ( let i=0; i < types.length; i++ ) {
      let offset  = Math.abs(e.target.children[i].getBoundingClientRect().top - e.target.offsetTop)
      
      if ( offset > value ) continue;

      tab   = types[i].type
      value = offset
    }

    // console.log({tab, value})
    setTabActive(tab)
  };

  
  function modalClose() {
    setIngredientModal(null)
  }

  
  return(
    <>
      <h1>Соберите бургер</h1>
      
      <div className={cm.tabs}>
        {
        types.map( ({type, name}) => 
          <Tab
            key={type}
            value={type}
            active={tabActive == type}
            onClick={()=>tabClickScroll(type)}
            >{name}</Tab>
        )
        }
      </div>
      

      <div
        ref={refList}
        className={cm.list}
        onScroll={listScroll}
        >
        {
        types.map( ({type, name, entries}) =>
          <div key={type} className={cm.type} id={type} >
            <h2>{name}</h2>
            {
            entries.map( i =>
              <IngredientTile
                key={i}
                item={list[i]}
                productModalOpen={setIngredientModal}
              />
            )
            }
          </div>
        )
        }
      </div>
      

      {
      ingredientModal  && 
        <Modal handleClose={modalClose}>
          <IngredientDetails
            ingredient={ingredientModal}
            handleClose={modalClose}
          />
        </Modal>
      }
      
    </>
  )

}







export function tabClickScroll(id)
{
   let section    =  document.getElementById(id)
   let area       =  section.parentNode;
   
   // прокрутка до точки
   let pointTop   =   0;
   while( section = section.previousSibling ) pointTop += section.scrollHeight;
   
   // смещение, // шаг, // duration
   const offset   =  pointTop - area.scrollTop;
   const step     =  area.scrollTop < offset ?  15 : -15;
   const duration =  4;

   //анимация
   if ( window.loop1 ) clearInterval(window.loop)

   window.loop1 = setInterval(function(){

      area.scrollTop += step;
      
      if (  (step > 0 && area.scrollTop >= pointTop)
         || (step < 0 && area.scrollTop <= pointTop)
      )
      {
         area.scrollTop = pointTop
         // console.log(`pointTop = ${pointTop}`)
         // console.log(`area.scrollTop = ${area.scrollTop}`)
         return clearInterval(window.loop1)
      }
      
   }, duration);

}






