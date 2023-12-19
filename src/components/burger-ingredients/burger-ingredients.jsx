import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './burger-ingredients.module.css'

import Modal from "../modal/modal";
import ProductTile from "../product-tile/product-tile";

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";



const TYPE_NAMES  =   {
  bun:    "Булки",
  main:   "Начинки",
  sauce:  "Соусы",
}


BurgerIngredients.propTypes = {
  selectedList:     PropTypes.object,
  ingredientList:   PropTypes.arrayOf(ingredientListObject),
};





function BurgerIngredients(props)
{
  const [ select, setSelect ]     =   useState("")
  const [ exists, setExists ]     =   useState([])
  const [ indexes, setIndexes ]   =   useState({})
  
  const [showModal, setShowModal] =   useState(false);

  useEffect(()=> {
    initType()
  }, [])
  
  
  async function initType()
  {
    let exists  = []
    let indexes = await props.ingredientList.reduce( (ret, {type}, index) =>
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

    // console.log(select)
    // console.log(exists)
    // console.log(indexes)
  }



  function clickTab(value)
  {
    setSelect(value)
  }


  function getTypeName(type)
  {
    return TYPE_NAMES[type] ?  TYPE_NAMES[type] :  type;
  }


  function productClick(e)
  {
    console.dir(e)
    setShowModal(true)
  }


  
  return(
    <>
      
      
      

      <h1>Соберите бургер</h1>
      
      <div className={cm.tabs}>

        {
          exists.map( type => (
              <Tab  value={type}  key={type}  active={select == type}  onClick={clickTab} >
                {getTypeName(type)}
              </Tab>
            )
          )
        }

      </div>

      <div className={cm.list}>

        {
          exists.map( type => (
            <div  className={cm.type}  key={type}>

              <h2 id={type}>{getTypeName(type)}</h2>

              {
                indexes[type].map( index => {
                    const product = props.ingredientList[index]
                    return (
                      <ProductTile
                        item={product}
                        key={product._id}
                        count={props.selectedList[product._id] || 0}
                        productClick={productClick}
                      />
                    )
                  }
                )
              }

            </div>
            )
          )
        }

      </div>


      {
        showModal  &&  createPortal(<Modal>sdvbsdfv</Modal>,  document.getElementById("modal"))
      }
    </>
  );

}





export default BurgerIngredients;