import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './app-header.module.css'


class AppHeader extends React.Component
{

  onClick = (e) => e.preventDefault();

  render() {
    return(
      <div className={cm.content}>

        <div className={cm.nav}>
          
          <a href="" onClick={this.onClick} className={cm.btn}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </a>

          <a href="" onClick={this.onClick} className={cm.btn}>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </a>

        </div>
        
        <div className={cm.logo}>
          <Logo />
        </div>
        
        <div className={cm.user}>
          <a href="" onClick={this.onClick} className={cm.btn}>
            <ProfileIcon type="secondary" />
            <span>Личный кабинет</span>
          </a>
        </div>
      </div>
    );
  }
}

export default AppHeader;