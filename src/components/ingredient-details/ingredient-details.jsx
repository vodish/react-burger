
import Modal from '../modal/modal';
import cm from './ingredient-details.module.css'

const TTH = [
  {name: "calories",      title: "Калории",   ext: "ккал" },
  {name: "proteins",      title: "Белки",     ext: "г"    },
  {name: "fat",           title: "Жиры",      ext: "г"    },
  {name: "carbohydrates", title: "Углеводы",  ext: "г"    },
]



// ProductTile.propTypes = {
//   item:   ingredientListObject.isRequired,
//   count:  PropTypes.number,
// }



function IngredientDetails(props)
{
  const product = props.product;


  return (
    <Modal handleClose={props.handleClose}>
      <h2 className={cm.title}>Детали ингредиента</h2>
      <img className={cm.img} src={product.image_large} alt={product.name} />

      <h3 className={cm.name}>{product.name}</h3>

      <div className={cm.tth}>
        {
          TTH.map( ({name, title, ext}, key) => (
            <div key={key}>
              <div className={cm.tname}>{title}</div>
              <div className={cm.tsum}>
                <span className={cm.tval}>{product[name]}</span>
                <span className={cm.text}>{ext}</span>

              </div>
            </div>
            )
          )
        }
        
      </div>
    </Modal>
  )
}


export default IngredientDetails;