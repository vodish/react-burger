
const baseUrl = "https://norma.nomoreparties.space";


export async function fetchRequest(endPoint, headers={}) {
  const res = await fetch(`${baseUrl}${endPoint}`, headers)
  let data;
  
  try { data = await res.json() }
  catch(err) { data = {error: `Сервер ${res.status}...`} }

  if ( !res.ok && !data.error ) {
      data.error = 'Ошибка c серверa... ' + (data.message || 'не ответил')
  }

  return data;
}

