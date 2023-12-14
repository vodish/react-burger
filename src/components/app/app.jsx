import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import cm from "./app.module.css";
import { ingredientList } from "../../utils/data";



class App extends React.Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      // список доступных ингридиентов
      ingredientList,
      
      // бургер - список булок
      topList: [
        ingredientList[0],
        ingredientList[0],
      ],

      // бургер - список начинок
      addList: [
        // ingredientList[3],
        ingredientList[4],
        ingredientList[2],
        ingredientList[7],
        ingredientList[5],
      ],
    }
  }


  // вычислить сумму заказа
  getTotal = () => {
    const sum = [...this.state.topList, ...this.state.addList].reduce((total, item) => total + item.price , 0 )

    return sum;
  }

  // выбранные товары с количеством
  getSelectedList = () => {

    const arr = [...this.state.topList, ...this.state.addList].reduce((count, item) => {

        count[item._id] = count[item._id] === undefined ?  1 :  count[item._id] + 1;
        return count;

      } , {} )

      return arr;
  }


  render() {

    return(
      <div className={cm.app}>

        <header className={cm.header}>
          <AppHeader />
        </header>

        <main className={cm.main}>
          
          <div className={cm.ingredients}>
            <BurgerIngredients
              ingredientList={this.state.ingredientList}
              selectedList={this.getSelectedList()}
            /> 
          </div>
          
          <div className={cm.constructor}>
            <BurgerConstructor
              topList={this.state.topList}
              addList={this.state.addList}
              total={this.getTotal()}
            />
          </div>

        </main>

      </div>
    );
  }
}

export default App;