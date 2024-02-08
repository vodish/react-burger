
type TSetToken = {
    accessToken: string
    refreshToken: string
}


export function setToken({accessToken, refreshToken}: TSetToken): void
{
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}


export function removeToken(): void
{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

