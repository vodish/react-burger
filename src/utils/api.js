
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
    console.log(res)
    return Promise.reject( new Error() {...res, res: res})
  }  

  return res
}


async function checkJson(res) {
  console.log(`checkJson`)
  console.dir(res)
  return await res.json().then(null, err=>Promise.reject(err))
}
