import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

/*
только для прохожих
  /login
  /register
  /reset-password
  /forgot-password  -- только для посетивших /reset-password
*/


export default function ProtectedLogin({element})
{
  console.log('защитить авторизацию')
  
  return element;
}
