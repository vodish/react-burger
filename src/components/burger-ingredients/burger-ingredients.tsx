import { useState, useRef } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientTile from "../ingredient-tile/ingredient-tile";
import cm from './burger-ingredients.module.css'
import { useSelector } from "react-redux";
import { TType } from "../../utils/types";




export default function BurgerIngredients()
{
  // @ts-ignore
  const { list, types }   =   useSelector(state => state.ingredients)

  const refList   =   useRef <HTMLDivElement> (null);
  const [ tabActive, setTabActive ] =   useState( types[0].type )
  

  
  function listScroll(e: React.BaseSyntheticEvent) {
    let tab  = ''
    let value = Infinity

    for ( let i=0; i < types.length; i++ ) {
      let offset  = Math.abs(e.target.children[i].getBoundingClientRect().top - e.target.offsetTop)
      
      if ( offset > value ) continue;

      tab   = types[i].type
      value = offset
    }

    setTabActive(tab)
  };

  
  
  return(
    <>
      <h1>Соберите бургер</h1>
      
      <div className={cm.tabs}>
        {
        types.map( ({type, name} : TType) => 
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
        types.map( ({type, name, entries}: TType) =>
          <div key={type} className={cm.type} id={type} >
            <h2>{name}</h2>
            {
            entries.map( i => <IngredientTile  key={i}  item={list[i]} /> )
            }
          </div>
        )
        }
      </div>
      
    </>
  )

}



let scroll1: NodeJS.Timer;


function tabClickScroll(id: string)
{
  let section =  document.getElementById(id)
  if ( !section )   return;

  let area    =  section.parentNode as HTMLElement;
  if ( !area )   return;


  // прокрутка до точки
  let pointTop  =   0;
  while( section = section.previousSibling as HTMLElement ) pointTop += section.scrollHeight;

  // смещение, // шаг, // duration
  const offset   =  pointTop - area.scrollTop;
  const step     =  area.scrollTop < offset ?  15 : -15;
  const duration =  4;

  //анимация
  if ( scroll1 ) {
    clearInterval(scroll1)
  }

  scroll1 = setInterval(function(){

    area.scrollTop += step;
    
    if (  (step > 0 && area.scrollTop >= pointTop)  || (step < 0 && area.scrollTop <= pointTop)  )
    {
        area.scrollTop = pointTop
        // console.log(`pointTop = ${pointTop}`)
        // console.log(`area.scrollTop = ${area.scrollTop}`)
        return clearInterval(scroll1)
    }
    
  }, duration);

}






