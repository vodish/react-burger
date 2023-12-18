import React, { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import cm from "./app.module.css";


const INGRIDIENT_DATA_URL = "https://norma.nomoreparties.space/api/ingredients"


function App()
{
  // состояния
  const [ isLoading,      setIsLoading      ] =   useState(true)
  const [ isError,        setIsError        ] =   useState(false)
  const [ ingredientList, setIngredientList ] =   useState([])
  const [ topList,        setTopList        ] =   useState([])
  const [ addList,        setAddList        ] =   useState([])

  // монтирование компонента
  useEffect(()=> {

    fetch(INGRIDIENT_DATA_URL)
      .then(res =>  res.json())
      .then(({data}) => {

        setIngredientList(data)
        setIsLoading(false)

        setTopList([data[0], data[0]])
        setAddList([data[4], data[2], data[7], data[5]])

      })
      .catch(e => setIsError(true))
      
    }
    ,[]
  )


  // вычислить сумму заказа
  const getTotal = () => {

    return  [...topList, ...addList].reduce((total, item) => total + item.price , 0)
  }


  // выбранные товары с количеством
  const getSelectedList = () => {
    
    return [...topList, ...addList].reduce(
      (count, item) => {
        count[item._id] = count[item._id] === undefined ?   1 :   count[item._id] + 1;
        return count;
      }
      ,{}
    )
  }
  


  return(
    <div className={cm.app}>

      <header className={cm.header}>
        <AppHeader />
      </header>

      <main className={cm.main}>
        <div className={cm.ingredients}>

          { ingredientList.length > 0  &&  <BurgerIngredients  ingredientList={ingredientList}  selectedList={getSelectedList()} /> }

        </div>
        
        <div className={cm.constructor}>

          { topList.length &&  <BurgerConstructor  topList={topList}  addList={addList}  total={getTotal()}  /> }

        </div> 
        
      </main>

    </div>
  )
}

export default App;