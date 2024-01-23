import { useLocation, useNavigate } from 'react-router-dom'
import cm from './ingredient-details.module.css'
import PropTypes from 'prop-types'
import { ingredientListObject } from '../../utils/data'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../services/appSlice';

const TTH = [
  {name: "calories",      title: "Калории",   ext: "ккал" },
  {name: "proteins",      title: "Белки",     ext: "г"    },
  {name: "fat",           title: "Жиры",      ext: "г"    },
  {name: "carbohydrates", title: "Углеводы",  ext: "г"    },
]


IngredientDetails.propTypes = {
  ingredient:   ingredientListObject.isRequired,
}



function IngredientDetails({ingredient})
{
  const navigate  = useNavigate();
  const location  = useLocation();
  const isModal   = location.state && location.state.background
  const dispath   = useDispatch()
  const orderBuns = useSelector(state => state.order.buns)


  // console.log( 'isModal' )
  // console.log( isModal )


  function handleupdateOrder() {
    dispath( updateOrder(ingredient) )
  }


  return (
    <>
      {isModal &&  <h2 className={cm.title}>Детали ингредиента</h2> }
      
      
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
      
      { isModal && (
        <div className={cm.add}>
          { ingredient.type != 'bun' && orderBuns.length == 0
                ? <div>Сначала выберите Булки</div>
                : <Button htmlType="button" type="primary" size="medium" onClick={handleupdateOrder}>Добавить в заказ</Button>
          }
        </div>
        )
       }
    </>
  )
}


export default IngredientDetails;