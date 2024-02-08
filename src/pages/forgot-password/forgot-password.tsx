import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchRequest } from "../../utils/api"
import { useForm } from '../../hooks/useForm'

/*
@kruglovand
3)
Реализовать проверку того, что на страницу reset-password можно попасть только с forgot-paassword,
можно следующим образом: после сабмита формы на странице forgot-password
отправляете запрос на сервер (не надо делать для этого экшен, просто обычная функция)
и когда запрос завершится успешно (в then) записываете в localStorage флаг
и делаете редирект на reset-password.

ответ успеха {
  "success": true,
  "message": "Reset email sent"
} 
*/

export default function Register()
{
  const navigate = useNavigate()
  const [ apiError, setApiError ] = useState(null)
  const {values, handleChange} = useForm({email: ''})

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    let res = await fetchRequest('/api/password-reset', {
      method: "POST",
      headers: {'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({...values}),
    })

    // @ts-ignore
    if ( res.success ) {
      sessionStorage.setItem('forgot-password', "1");
      navigate('/reset-password')
    }
    else {
      console.log(res)
      // @ts-ignore
      setApiError(res)
    }
  }

  
  return(
    <form className="form center" onSubmit={handleSubmit}>

      <h1>Восстановление пароля</h1>
      
      {apiError 
        ? <pre className="error apiError">{apiError}</pre>
        : null
      }

      <div className="row">
        <EmailInput
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="row submit">
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >Восстановить</Button>
      </div>
      
      
      <p className="note">Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </form>
  )
}