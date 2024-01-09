
const baseUrl = "https://norma.nomoreparties.space";


export async function fetchRequest(endPoint, headers={}) {

  const res = await fetch(`${baseUrl}${endPoint}`, headers)
    .then(checkResponse)
    .then(checkJson)
    
  return res;
}

async function checkResponse(res) {
  // console.log(res)
  if ( !res )     return Promise.reject(`Ошибка сервера...`)
  if ( !res.ok ) {
    res = await res.json()
    console.log(res)
    console.log('== res.ok')
  }  

  return res
}


async function checkJson(res) {
  console.log(`checkJson`)
  console.log(res)
  return await res.json().then(null, err=>Promise.reject(err))
}
