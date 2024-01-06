const API_SERVER_NAME    =  "https://norma.nomoreparties.space";


async function requestApi(endPoint, headers={})
{
    try {
        const response = await fetch(`${API_SERVER_NAME}${endPoint}`, headers )
        

        if ( !response.ok ) {
            return { error: "Сервер не ответил..." }
        }

        const data = await response.json();

        if ( data.success !== true ) {
            return { error: "Сервер вернул ошибку success..." }
        }

        
        return data;
    
    }
    catch (error) {
        return {error: `Проблема c запросом на серввер ${error.message}`}
    }
}



export async function requestApiIngredients()
{
    const res = await requestApi('/api/ingredients')

    if ( res.error ) {
        return res
    }
    
    const typeNname = {
        bun: "Булки",
        main: "Начинки",
        sauce: "Соусы",
    }

    const types = res.data.reduce((acc, el, index)=>{
        acc[ el.type ]  =   acc[ el.type ]  ||  {
            type:   el.type,
            name:   typeNname[el.type] || el.type,
            entries: [],
        }
        acc[ el.type ].entries.push(index);

        return acc
    }, {})

    
    return {
        list: res.data,
        types: Object.values(types),
    }
}



export async function requestApiSubmitOrder(bodyData)
{
    const res = await requestApi('/api/orders', {
        method: "POST",
        headers: {
           'Content-Type': 'application/json',
         },
        body: JSON.stringify(bodyData),
     })

    if ( res.error ) {
        return res
    }

    return { ...res }
}
