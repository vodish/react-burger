import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { sendRegisterThunk } from "../../services/appSlice"


/*
@kruglovand
4) Когда сделаете авторизацию, не забудьте добавить в запрос создания заказа 
в поле Authorization в заголовках токен доступа (с Bearer). Заказ будет готовиться 15 сек, 
поэтому стоит еще предусмотреть прелоадер для модалки заказа, чтобы пользователь понимал, 
что происходит в это время. Без этой модификации, у вас не будут появляться заказа 
в ленте заказов пользователя в профиле.
*/


export default function Register()
{
  const apiError  = useSelector( state => state.apiError )
  const dispatch  = useDispatch()

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(sendRegisterThunk({name, email, password}))
  }

  return(

    <form className="form center" onSubmit={handleSubmit}>
      <h1>Регистрация</h1>

      {apiError == "User already exists"
        ? <div className="apiError">
            Сервер узнал вас, но почему-то хочет чтобы вы обязательно прошли форму входа...
            <p style={{marginTop: '0.5em', fontSize: '1.2em'}}><Link to="/login">Войти</Link></p>
          </div>
        : apiError 
          ? <pre className="apiError">{apiError}</pre>
          : null
      }

      <div className="row">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
        />
      </div>
      <div className="row">
        <EmailInput
          onChange={e => setEmail(e.target.value)}
          value={email}
          name="email"
          isIcon={false}
        />
      </div>
      <div className="row">
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
        />
      </div>
      
      <div className="row submit">
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >Зарегистрироваться</Button>
      </div>
      

      <p className="note">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
    </form>
  )
}