
const BASE_URL = "https://norma.nomoreparties.space";


export async function fetchRequest(endPoint, headers={}) {

  const res = await fetch(`${BASE_URL}${endPoint}`, headers)
    .then(checkResponse)
    .then(checkJson)
    
  return res;
}

async function checkResponse(res) {
  if ( !res ) {
    return Promise.reject(`Server error...`)
  }
  if ( !res.ok ) {
    return await res.json().then(err=>Promise.reject(err))
  }

  return res
}


async function checkJson(res) {
  return await res.json().then(null, err=>Promise.reject(err))
}
