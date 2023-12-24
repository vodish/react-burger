
import cm from './ingredient-details.module.css'
import PropTypes from 'prop-types'
import { ingredientListObject } from '../../utils/data'


const TTH = [
  {name: "calories",      title: "Калории",   ext: "ккал" },
  {name: "proteins",      title: "Белки",     ext: "г"    },
  {name: "fat",           title: "Жиры",      ext: "г"    },
  {name: "carbohydrates", title: "Углеводы",  ext: "г"    },
]


IngredientDetails.propTypes = {
  ingredient:   ingredientListObject,
}



function IngredientDetails(props)
{
  const ingredient = props.ingredient;


  return (
    <>
      <h2 className={cm.title}>Детали ингредиента</h2>
      
      <img className={cm.img} src={ingredient.image_large} alt={ingredient.name} />

      <h3 className={cm.name}>{ingredient.name}</h3>

      <div className={cm.tth}>
        {
          TTH.map( ({name, title, ext}, key) => (
            <div key={key}>
              <div className={cm.tname}>{title}</div>
              <div className={cm.tsum}>
                <span className={cm.tval}>{ingredient[name]}</span>
                <span className={cm.text}>{ext}</span>

              </div>
            </div>
            )
          )
        }
      </div>
    </>
  )
}


export default IngredientDetails;