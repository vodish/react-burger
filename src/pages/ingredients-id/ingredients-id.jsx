import { useSelector } from "react-redux"
import AppHeader from "../../components/app-header/app-header"
import IngredientDetails from "../../components/ingredient-details/ingredient-details"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


export default function IngredientsId()
{
  const { id }  = useParams()  
  const ingredientList  = useSelector(state => state.ingredients.list)
  const [ ingredient, setIngredient ]  = useState(null)
  

  useEffect(()=>{

    ingredientList.map(it => {
      if ( it._id != id )  return;
      setIngredient(it)
    })

  }, [])


  
  return <AppHeader>
    <div style={{margin: 'auto'}}>
      { ingredient
        ? <IngredientDetails ingredient={ingredient} />
        : 'Ингредиент не загружен'
      }
    </div>
  </AppHeader>
}