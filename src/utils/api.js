// import { setToken } from "./storage";

const BURGER_API_URL = "https://norma.nomoreparties.space";


export async function fetchRequest(endPoint, options={}) {

  let res   = await fetch(`${BURGER_API_URL}${endPoint}`, options)
  if ( !res ) {
    return Promise.reject(`Server error...`)
  }

  
  const json  = await res.json()
  options     = await checkTokenRefresh(options, json)
  
  if ( options.checkRefresh ) {
    return fetchRequest(endPoint, options)
  }
  
  if ( ! json.success ) {
    return Promise.reject(json)
  }

  // console.log(res)
  // console.log('--------------------')

  return json;
}




async function checkTokenRefresh(options, err)
{
  if (   err.message !== "jwt expired"          )   return options;
  if ( ! localStorage.getItem("refreshToken")   )   return options;
  if (   options.checkRefresh                   )   return options;
  if ( ! options.headers                        )   return options;
  if ( ! options.headers.authorization          )   return options;

  
  const res = await fetch(`${BURGER_API_URL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }
  );
  
  
  if ( !res ) {
    return Promise.reject(`Server refresh...`)
  }
  
  // console.log(err)
  // console.log(res)


  const json = await res.json();
  if ( ! json.success ) {
    return Promise.reject(json);
  }


  localStorage.setItem("refreshToken", json.refreshToken);
  localStorage.setItem("accessToken", json.accessToken);
  options.headers.authorization = json.accessToken
  options.checkRefresh  = true
  
  return options;
}






/*
@kruglovand
Можно взять из документа https://app.pachca.com/chats/7733709?message=120860890
*/

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
  return await fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    console.log('fetchWithRefresh')
    console.log(res)
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      // setToken(refreshData)
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);

    } else {
      return Promise.reject(err);
    }
  }
};