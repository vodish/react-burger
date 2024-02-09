import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { fetchRequest } from "../utils/api";
import { removeToken, setToken } from "../utils/storage";
import { TIngredient, TStore, TType, Ttoken } from "../utils/types"

const createSliceWhitThunks = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator }
})



const appSlice = createSliceWhitThunks({
  name: 'app',
  initialState: {
    ingredients: {
        list:       [] as TIngredient[],
        types:      [] as TType[],
        error:      ""
    },
    order: {
        buns:       [] as TIngredient[],
        adds:       [] as TIngredient[],
        total:      0,
        number:     0,
        error:      "",
    },
    user: {
        checkAuth:  false,
        email:      "",
        name:       "",
    },
    apiError:   "",
  },
  reducers: create => ({
      
    // каталог
    getIngredientsThunk: create.asyncThunk(
        async () => fetchRequest<{
                data: TIngredient[],
                success: boolean,
                error?: string,
                types?: TType[]
            }>
            ('/api/ingredients')
        ,{
            fulfilled:  (state, {payload}) => {
                
                if ( payload.data ) {

                    const typeNname :{[n: string]: string} = {
                        bun: "Булки",
                        main: "Начинки",
                        sauce: "Соусы",
                    }
                    
                    type Tacc = {
                        [n: keyof typeof typeNname]: TType
                    }
                    
                    const types :Tacc  = payload.data.reduce((acc: Tacc, el: TIngredient, index: number) => {
                        
                        acc[ el.type ]  =   acc[ el.type ]  ||  {
                            type:   el.type,
                            name:   typeNname[el.type] || el.type,
                            entries: [],
                        }
                        acc[ el.type ].entries.push(index);
                
                        return acc
                    }, {})
                    
                    payload.types = Object.values(types)
                }

                
                state.ingredients.list  =   payload.data    ||  []
                state.ingredients.types =   payload.types   ||  []
                state.ingredients.error =   payload.error   ||  ""
                
            },
            rejected: (state, action) => {
                console.log(action)
                state.ingredients.error = `${action.type}... ${action.error.message}`

            }
        }
    ),
    

    // заказ
    updateOrder: create.reducer( (state, {payload} :{payload: TIngredient} ) => {

        const product = {...payload, uuid: Date.now()}

        if ( payload.type === 'bun' ) {
            state.order.buns = [
                {...product, name: `${payload.name} (верх)` },
                {...product, name: `${payload.name} (низ)` },
            ]
        }
        else {
            state.order.adds.push(product)
        }
        
        if ( state.order.buns.length === 0 ) {
            state.order.adds = []
            return
        }

        const newState      =   stateCalculation(state);
        state.order.total   =   newState.order.total;
        state.ingredients   =   newState.ingredients;
    }),


    deleteFromOrder: create.reducer( (state, {payload}: {payload: number}) => {
        
        state.order.adds.splice( payload, 1 )
        
        const newState      =   stateCalculation(state)
        state.ingredients   =   newState.ingredients;
        state.order.total   =   newState.order.total;
    }),

    resortOrder: create.reducer( (state, {payload}: {payload: number[]}) => {

        const [ dragIndex, hoverIndex ] =   payload
        const drag                      =   state.order.adds[dragIndex]

        state.order.adds[dragIndex]     =   state.order.adds[hoverIndex]
        state.order.adds[hoverIndex]    =   drag
    }),
    
    resetOrder: create.reducer( state => {
        state.order.number  =   0
        state.order.buns    =   []
        state.order.adds    =   []
        const newState      =   stateCalculation(state)
        state.ingredients   =   newState.ingredients;
        state.order.total   =   newState.order.total;
    }),

    closeOrderError: create.reducer( state => {
        state.order.error = ""
    }),
    


    sendOrderThunk: create.asyncThunk(
        async (ingredients) => {
            return (
                fetchRequest<{
                    name: string,
                    order: {
                        number: number
                    },
                    susses: boolean,
                    error?: string
                }> (
                    '/api/orders'
                    , {
                        method: "POST",
                        headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({ingredients}),
                    }
                )
            )
        }
        ,{
            fulfilled: (state, {payload})=>{
                
                state.order.number  =   payload.order ? payload.order.number : 0
                state.order.error   =   payload.error || ''

                if ( payload.error  ) {
                    alert(payload.error)
                    console.log(payload)
                    return;
                }
            },
            rejected: (state, action) => {
                state.order.error = `${action.type}...<br />Server message: ${action.error.message}`
            },
        }
    ),


    // регистрация, токены, пользователь
    
    removeApiError: create.reducer(state => {
        state.apiError = ""
    }),

    sendRegisterThunk: create.asyncThunk(
      async (userData) => {
        return await fetchRequest('/api/auth/register', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData),
        })
      },
      {
        fulfilled: (state, {payload})=>{
          console.log(payload)
          // @ts-ignore
          state.user.name   =   payload.user.name
          // @ts-ignore
          state.user.email  =   payload.user.email
          // @ts-ignore
          setToken(payload)
        },
        rejected: (state, action) => {
          console.log(action)

          if ( action.error && action.error.message && action.error.message == "User already exists" ) {
            // @ts-ignore
            state.apiError = action.error.message
          } else {
            // @ts-ignore
            state.apiError = `${action.type}...\nServer message: ${action.error.message}` 
          }
        },
      }
    ),

    sendLoginThunk: create.asyncThunk(
        async (userData) => {
            return await fetchRequest<{
                success: boolean
                accessToken: string
                refreshToken:string
                user:{
                    email:string
                    name: string
                }
            }>
            ('/api/auth/login', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userData),
            })
        },
        {
            fulfilled: (state, {payload}) => {
                state.user.checkAuth    =   true
                state.user.name     =   payload.user.name
                state.user.email    =   payload.user.email
                state.apiError      =   ""
                setToken(payload)
            },
            rejected: (state, action) => {
                console.log(action)
                state.apiError  =   `${action.type}...\nServer message: ${action.error.message}` 
            }
        }
    ),
    
    sendLogoutThunk: create.asyncThunk(
        async (userData: Ttoken) => {
            return await fetchRequest('/api/auth/logout', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(userData),
            })
        },
        {
            fulfilled: state => {
                state.user.name     =   ""
                state.user.email    =   ""
                state.apiError      =   ""
                removeToken()
            },
            rejected: (state, action) => {
                console.log(action)
                state.apiError  =   `${action.type}...\nServer message: ${action.error.message}` 
            }
        }
    ),
    

    getProfileThunk: create.asyncThunk(
        async () => {
            if ( ! localStorage.getItem('accessToken') ) {
                return Promise.resolve("tokenUnknown");
            }

            return await fetchRequest('/api/auth/user', {
                // @ts-ignore
                headers: {
                  'authorization': localStorage.getItem('accessToken'),
                  'Content-Type': 'application/json;charset=utf-8',
                }
            })
        },
        {
            fulfilled: (state, {payload}) => {
                // console.log(payload)
                state.user.checkAuth    =   true
                state.apiError          =   ""

                if ( payload == 'tokenUnknown' )    return;
                // @ts-ignore
                state.user.name     =   payload.user.name
                // @ts-ignore
                state.user.email    =   payload.user.email
            },
            rejected: (state, {payload}) => {
                console.log(payload)
                // state.apiError  =   `${action.type}...\nServer message: ${action.error.message}` 
            },
        }
    ),
    
    updateProfileThunk: create.asyncThunk(
        async (userData) => {
            return await fetchRequest('/api/auth/user', {
                method: "PATCH",
                // @ts-ignore
                headers: {
                  'authorization': localStorage.getItem('accessToken'),
                  'Content-Type': 'application/json;charset=utf-8',
                } as HeadersInit,
                body: JSON.stringify(userData),
            })
        },
        {
            fulfilled: (state, {payload}) => {
                // @ts-ignore
                state.user.name     =   payload.user.name
                // @ts-ignore
                state.user.email    =   payload.user.email
                state.apiError      =   ""
            },
            rejected: (_, action) => {
                console.log(action)
                // state.apiError  =   `${action.type}...\nServer message: ${action.error.message}` 
            }
        }
    ),
    

    
  })
})


export const {
    getIngredientsThunk,
    updateOrder,
    deleteFromOrder,
    resortOrder,
    resetOrder,
    closeOrderError,
    sendOrderThunk,

    removeApiError,
    sendRegisterThunk,
    sendLoginThunk,
    sendLogoutThunk,
    getProfileThunk,
    updateProfileThunk,

} = appSlice.actions

export default appSlice.reducer








function stateCalculation(state: TStore) {

    state = JSON.parse( JSON.stringify(state) )

    state.order.total = 0;
    let counts: {[n: string]: number} = {};

    [...state.order.buns, ...state.order.adds ].map( (item: TIngredient) => {
        
        counts[item._id]    =   counts[item._id] ? ++counts[item._id]:  1;
        state.order.total   +=  item.price;
    })
    

    state.ingredients.list  =   state.ingredients.list.map( (item: TIngredient) => {
        
        return {...item, count: counts[item._id] || 0}
    })


    return state;
}



