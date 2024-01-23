import { Link, Navigate, useLocation } from 'react-router-dom'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeApiError, sendLoginThunk } from '../../services/appSlice'

export default function Login()
{
  const location  =   useLocation()
  const apiError  =   useSelector( state => state.apiError )
  const dispatch  =   useDispatch()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')


  useEffect(()=>{
    if ( apiError ) {
      dispatch(removeApiError())
    }
  }, [])

  
  function handleSubmit(e) {
    e.preventDefault()
    dispatch( sendLoginThunk({email, password}) );
  }



  return <>

    <form className="form center" onSubmit={handleSubmit}>
      
      <h1>Вход</h1>

      {apiError 
          ? <pre className="apiError">{apiError}</pre>
          : location.state && location.state.redirect
            ? <div className="apiError redirect">{location.state.redirect}</div>
            : null
      }

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
        >Войти</Button>
      </div>

      <p className="note">Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
      
      <p className="note list">Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
    </form>

  </>
}