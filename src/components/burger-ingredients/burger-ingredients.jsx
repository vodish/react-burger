import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './burger-ingredients.module.css'
import ProductTile from "../product-tile/product-tile";

import PropTypes from 'prop-types';
import { ingredientListObject } from "../../utils/data";



class BurgerIngredients extends React.Component
{
  constructor(props) {
    super(props);
    // Не вызывайте здесь this.setState()!
    this.state = {
      current: 'bun',
    }

  }

  setType = (value) =>
  {
    this.setState({current: value})
  }



  // вывод группы ингридиентов одного типа
  printList = ({value, title, list}) =>
  {
    return (
      <>
        <h2 id={value}>{title}</h2>

        {list.map(product => (
          <ProductTile
            item={product}
            key={product._id}
            count={this.props.selectedList[product._id] || 0}
          />
        ) )}
        
      </>
    )
  }



  render(){

    const types = [
      { value: 'bun',     title: "Булки",     list: this.props.ingredientList.filter(item => item.type == 'bun')    },
      { value: 'sauce',   title: "Сосуы",     list: this.props.ingredientList.filter(item => item.type == 'sauce')  },
      { value: 'main',    title: "Начинки",   list: this.props.ingredientList.filter(item => item.type == 'main')   },
    ]
    

    return(
      <>
        <h1>Соберите бургер</h1>
        
        <div className={cm.tabs}>
          {types.map(type => (
            <Tab value={type.value} key={type.value} active={this.state.current === type.value} onClick={this.setType}>{type.title}</Tab>
          ))}
        </div>

        <div className={cm.list}>
          
          {types.map( (type, i) => {
            if ( type.list.length < 1 ) return;

            return <div className={cm.type} key={i}>{this.printList(type)}</div>
          } )}

        </div>
      </>
    );
  }
}


BurgerIngredients.propTypes = {
  selectedList: PropTypes.object,
  ingredientList: PropTypes.arrayOf(ingredientListObject),
};


export default BurgerIngredients;