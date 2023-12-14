import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './app-header.module.css'


class AppHeader extends React.Component
{
  render() {
    return(
      <div className={cm.content}>

        <div className={cm.nav}>
          
          <div className={cm.btn}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </div>

          <div className={cm.btn}>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </div>

        </div>
        
        <div className={cm.logo}>
          <Logo />
        </div>
        
        <div className={cm.user}>
          <div className={cm.btn}>
            <ProfileIcon type="secondary" />
            <span>Личный кабинет</span>
          </div>
        </div>
      </div>
    );
  }
}

export default AppHeader;