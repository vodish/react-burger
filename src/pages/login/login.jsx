import { Link, useNavigate } from 'react-router-dom'
import AppHeader from "../../components/app-header/app-header"
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeApiError } from '../../services/appSlice'

export default function Login()
{
  const apiError = useSelector( state => state.apiError )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')


  useEffect(()=>{
    dispatch(removeApiError())
  }, [])

  
  function handleSubmit(e) {
    e.preventDefault()
    // alert("Отправить форму")
    navigate('/')
  }

  return <AppHeader view="center">

    <form className="form" onSubmit={handleSubmit}>
      <h1>Вход</h1>
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

  </AppHeader>
}