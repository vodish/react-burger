import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getProfileThunk, updateProfileThunk } from '../../services/appSlice'



export default function ProfileUser()
{
  const dispatch    = useDispatch()  
  const user        = useSelector( state => state.user.name )
  
  const [ name, setName ]           = useState(user.name)
  const [ email, setEmail ]         = useState('')
  const [ password, setPassword ]   = useState('')
  
  useEffect(()=>{
    if ( user ) {
      console.log('const user = useSelector( state => state.user.name )')
      console.log(user)
    }
  }, [])

  


  function handleSubmit(e) {
    e.preventDefault()

    console.log({name, email, password})

    dispatch( updateProfileThunk({name, email, password}) )
    // alert("Сделать отправку данных на сервер")
  }

  return(
    <form className="form v2" onSubmit={handleSubmit}>
      <p style={{maxWidth: 450}}>В этом разделе вы можете изменить свои персональные данные.</p>

       
      <div className="row">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name? name: ''}
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
        >Обновить</Button>
      </div>
    </form>
  )
}