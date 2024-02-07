import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './app-header.module.css'
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function AppHeader()
{
  // @ts-ignore
  const userName = useSelector( state => state.user.name )
  

  return (
    <header className={cm.header}>
      <div className={cm.wrap}>
        <div className={cm.nav}>
          <NavLink to="/" className={cm.link}>
            { it => it.isActive
              ? <><BurgerIcon type="secondary" /><span className={cm.active1}>Конструктор</span></>
              : <><BurgerIcon type="primary" /><span>Конструктор</span></>
            }
          </NavLink>
          <NavLink to="/feed" className={cm.link}>
            { it => it.isActive
              ? <><ListIcon type="secondary" /><span className={cm.active1}>Лента заказов</span></>
              : <><ListIcon type="primary" /><span>Лента заказов</span></>
            }
          </NavLink>
        </div>
        <NavLink to="/"  className={cm.logo}><Logo /></NavLink>
        <div className={cm.user}>

          {userName === null
            ? <NavLink to="/login" className={cm.link}>
                { it => it.isActive
                  ? <><ProfileIcon type="secondary" /><span className={cm.active1}>Личный кабинет</span></>
                  : <><ProfileIcon type="primary" /><span>Личный кабинет</span></>
                }
              </NavLink>
            : <NavLink to="/profile" className={cm.link}>
                { it => it.isActive
                  ? <><ProfileIcon type="secondary" /><span className={cm.active1}>{userName}</span></>
                  : <><ProfileIcon type="primary" /><span>{userName}</span></>
                }
              </NavLink>
          }
          
        </div>
      </div>
    </header>
  )
}
