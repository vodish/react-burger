import AppHeader from "../../components/app-header/app-header"
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { sendRegisterThunk } from "../../services/appSlice"




export default function Register()
{
  const apiError  = useSelector( state => state.apiError )
  const user      = useSelector( state => state.user )
  const dispatch  = useDispatch()

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  

  function handleSubmit(e) {
    e.preventDefault()

    dispatch(sendRegisterThunk({name, email, password}))

    // alert("Отправить форму")
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Регистрация</h1>

      {apiError == "User already exists"
        ? <div className="apiError">
            Сервер узнал вас, но почему-то хочет чтобы вы обязательно прошли форму входа...
            <p style={{marginTop: '0.5em', fontSize: '1.2em'}}><Link to="/login">Войти</Link></p>
          </div>
        : apiError 
          ? <pre className="error apiError">{apiError}</pre>
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