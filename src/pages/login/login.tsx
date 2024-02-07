import { Link, Navigate, useLocation } from 'react-router-dom'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeApiError, sendLoginThunk } from '../../services/appSlice'
import { useForm } from '../../hooks/useForm'

export default function Login()
{
  const location  =   useLocation()
  // @ts-ignore
  const apiError  =   useSelector( state => state.apiError )
  const dispatch  =   useDispatch()

  const { values, handleChange } = useForm({
    email:    '',
    password: '',
  })

  useEffect(()=>{
    if ( apiError ) {
      dispatch(removeApiError())
    }
  }, [])

  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // @ts-ignore
    dispatch( sendLoginThunk(values) );
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
          isIcon={false}
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
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