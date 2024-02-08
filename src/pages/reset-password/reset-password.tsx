import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { fetchRequest } from "../../utils/api"
import { useForm } from '../../hooks/useForm'


/*
@kruglovand
3) 
На странице reset-password у вас перед return должна 
быть проверка, что если в localStorage нет флага с таким именем, то проиcходит редирект 
на главную страницу (<Navigate>).
Запрос для сброса пароля тоже не нужно оформлять в виде экшена. 
После успешного завершения запроса нужно удалить этот флаг из localStorage и сделать редирект 
на страницу авторизации (это единственное место в проекте кроме ProtectedRoute 
где может потребоваться такой редирект).

запрос {
  "password": "",
  "token": ""
}
ответ {
  "success": true,
  "message": "Password successfully reset"
} 
*/



export default function Register()
{
  const navigate  = useNavigate()

  const [ apiError, setApiError ] =   useState("")
  const {values, handleChange}    =   useForm({
    password: '',
    token:    '',
  })


  if ( ! sessionStorage.getItem('forgot-password') ) {
    return <Navigate to="/login" replace />
  }
  
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const res = await fetchRequest('/api/password-reset/reset', {
      method: "POST",
      headers: {'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({...values}),
    }).catch( (err: Error) => {
      console.log(err)
      setApiError(err.message)
    })
    
    // @ts-ignore
    if ( res && res.success ) {
      sessionStorage.removeItem('forgot-password');
      navigate('/login', {replace:true, state: {redirect: "Пароль изменён. Войдите с новым паролем"}})
    }
  }
  
  return(
    <form className="form center" onSubmit={handleSubmit}>

      <h1>Замена пароля</h1>
      
      { apiError &&
        <pre className="error apiError">{apiError}</pre>
      }

      <div className="row">
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <Input
          type="text"
          placeholder="Код из письма"
          name="token"
          value={values.token}
          onChange={handleChange}
        />
      </div>
      
      <div className="row submit">
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >Сохранить</Button>
      </div>
      
      
      <p className="note">Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </form>
  )
}