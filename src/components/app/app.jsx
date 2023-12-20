import React, { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import cm from "./app.module.css";
import { apiGetIngredients } from "../../utils/data";




function App()
{
  // состояния
  const [ isLoading,      setIsLoading      ] =   useState(true)
  const [ isError,        setIsError        ] =   useState('')
  const [ ingredientList, setIngredientList ] =   useState([])
  const [ topList,        setTopList        ] =   useState([])
  const [ addList,        setAddList        ] =   useState([])

  // монтирование компонента
  useEffect( ()=> {

    (async function() {
      const res = await apiGetIngredients();
      
      setIsLoading(false)

      if ( res.error ) {
        return setIsError(res.error)
      }

      setIngredientList(res.data)
      setTopList([res.data[0], res.data[0]])
      setAddList([res.data[4], res.data[2], res.data[7], res.data[5], res.data[5]])
      
    })()

  } , [] )


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
          {
          isError && <div className={cm.error}>{isError}</div>
          }

          {
          ingredientList.length > 0  &&  <BurgerIngredients  ingredientList={ingredientList}  selectedList={getSelectedList()} />
          }
        </div>
        
        <div className={cm.constructor}>
          {
          topList.length > 0  &&  <BurgerConstructor  topList={topList}  addList={addList}  total={getTotal()}  />
          }
        </div>
      </main>

    </div>
  )
}

export default App;