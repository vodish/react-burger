import { useState, useEffect } from "react";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientTile from "../ingredient-tile/ingredient-tile";
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";

import cm from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";



const TYPE_NAMES  =   {
  bun:    "Булки",
  main:   "Начинки",
  sauce:  "Соусы",
}


BurgerIngredients.propTypes = {
  ingredientList:   PropTypes.arrayOf(ingredientListObject),
  selectedList:     PropTypes.object,
};





function BurgerIngredients(props)
{
  const [ select, setSelect         ] =   useState("")
  const [ exists, setExists         ] =   useState([])
  const [ indexes, setIndexes       ] =   useState({})
  const [ ingredient, setIngredient ] =   useState(null);

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
  }



  function clickTab(value)
  {
    setSelect(value)
  }


  function getTypeName(type)
  {
    return TYPE_NAMES[type] ?  TYPE_NAMES[type] :  type;
  }


  function productModalOpen(e)
  {
    // console.log(e)
    setIngredient(e.item)
  }

  function productModalClose()
  {
    setIngredient(null)
  }
  

  
  return(
    <>
      {
      ingredient  &&  <Modal handleClose={productModalClose}><IngredientDetails ingredient={ingredient} /></Modal>
      }
      

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
                      <IngredientTile
                        item={product}
                        key={product._id}
                        count={props.selectedList[product._id] || 0}
                        productModalOpen={productModalOpen}
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
      
    </>
  );

}





export default BurgerIngredients;