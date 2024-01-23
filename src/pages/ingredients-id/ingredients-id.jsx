import { useMemo } from "react"
import { useSelector } from "react-redux"
import AppHeader from "../../components/app-header/app-header"
import IngredientDetails from "../../components/ingredient-details/ingredient-details"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import Modal from "../../components/modal/modal"


export default function IngredientsId()
{
  const { id }    = useParams()
  const location  = useLocation()
  const navigate  = useNavigate()
  const ingredientList  = useSelector(state => state.ingredients.list)
  const [ ingredient, setIngredient ]  = useState(null)


  
  useMemo(
    ()=>{
      const sel = ingredientList.filter(it => it._id == id)
      if ( !sel[0] )  return;

      setIngredient(sel[0])
    }
    , [ingredientList]
  )
  

  // меню еще не загружено
  if ( ! ingredientList ) {
    return null;
  }



  // карточка товара в модалке
  if ( location.state && location.state.background && ingredient) {
    return (
      <Modal handleClose={()=>{navigate(-1)}}>
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    )
  }


  // карточка товара на отдельной странице
  return (
    <div className="center">
      { ingredient
        ? <IngredientDetails ingredient={ingredient} />
        : 'Ингредиент не найден'
      }
    </div>
  )
}