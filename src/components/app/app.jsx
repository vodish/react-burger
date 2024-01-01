import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import cm from "./app.module.css";
import { apiGetIngredients } from "../../utils/data";
import { BConstructorContext } from "../burger-constructor/burger-constructor-context";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "../../services/ingredientsSlice";


function App()
{
  // состояния
  // const [ isLoading,      setIsLoading      ] =   useState(true)
  const [ isError,        setIsError        ] =   useState('')
  const [ ingredientList, setIngredientList ] =   useState([])
  const [ topList,        setTopList        ] =   useState([])
  const [ addList,        setAddList        ] =   useState([])

  // const count = useSelector( state => state)
  const dispatch = useDispatch()
  
  // монтирование компонента
  useEffect(()=>{

    (async function() {
      const res = await apiGetIngredients();
      
      dispatch( setIngredients(res) )

      if ( res.error ) {
        return setIsError(res.error)
      }




      setIngredientList(res.list)

      setTopList([res.list[0], res.list[0]])
      setAddList([res.list[4], res.list[2], res.list[7], res.list[5], res.list[5]])
      
    })()

  }, [])



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
        
        <BConstructorContext.Provider  value={{topList, addList, setAddList}} >
          <div className={cm.constructor}>
            {
            topList.length > 0  &&  <BurgerConstructor />
            }
          </div>
        </BConstructorContext.Provider>
      </main>

    </div>
  )
}

export default App;