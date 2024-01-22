

export function setToken({accessToken, refreshToken})
{
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}


export function removeToken()
{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

