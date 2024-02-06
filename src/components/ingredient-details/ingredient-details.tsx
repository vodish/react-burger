import { useLocation, useNavigate } from 'react-router-dom'
import cm from './ingredient-details.module.css'


import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../services/appSlice';

const TTH = [
  {name: "calories",      title: "Калории",   ext: "ккал" },
  {name: "proteins",      title: "Белки",     ext: "г"    },
  {name: "fat",           title: "Жиры",      ext: "г"    },
  {name: "carbohydrates", title: "Углеводы",  ext: "г"    },
]


// import PropTypes from 'prop-types'
// import { ingredientListObject } from '../../utils/data'
// import { TIngredientListObject } from '../../utils/types'

// IngredientDetails.propTypes = {
//   ingredient:   ingredientListObject.isRequired,
// }



type TIngredient = {
  _id:            string
  name:           string
  type:           string
  proteins?:      number
  fat?:           number
  carbohydrates?: number
  calories?:      number
  price:          number
  image:          string
  image_mobile:   string
  image_large:    string
  __v?:           number
}

type TComp = {
  ingredient: TIngredient
}

// const IngredientDetails : React.FC<TIngredientDetails> = ({ingredient}) => {
function IngredientDetails ({ingredient} :TComp ) :JSX.Element {
  
  const navigate  = useNavigate();
  const location  = useLocation();
  const isModal   = location.state && location.state.background
  const dispath   = useDispatch()
  // @ts-ignore
  const orderBuns = useSelector(state => state.order.buns)
  

  console.log(ingredient)
  

  // const handleUpdateOrder = () => {
  function handleUpdateOrder() {
    // @@ts-ignore
    dispath( updateOrder(ingredient) )
    navigate(-1)
  }





  const getIngredientValue = (name: string) => {
  // function getIngredientValue(name: string) {
    // @ts-ignore
    return ingredient[name]
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
              
              {/* <span className={cm.tval}>{ingredient[name]}</span> */}
              <span className={cm.tval}>{getIngredientValue(name)}</span>
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
              : <Button htmlType="button" type="primary" size="medium" onClick={handleUpdateOrder}>Добавить в заказ</Button>
          }
        </div>
        )
       }
    </>
  )
}


export default IngredientDetails;