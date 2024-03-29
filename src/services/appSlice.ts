import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { fetchRequest } from "../utils/api";
import { removeToken, setToken } from "../utils/storage";
import { TIngredient, TType, Ttoken, TUserResponse, TFeedOrder, TConnect, TFeedData, TOrderStatus, TIndex } from "../utils/types"
import { TStore } from "./redux"

const createSliceWhitThunks = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator }
})



export const appSlice = createSliceWhitThunks({
    name: 'app',
    initialState: {
        apiError:   "",
        ingredients: {
            list:       []  as TIngredient[],
            types:      []  as TType[],
            error:      "",
            indexes:    {}  as TIndex
        },
        order: {
            buns:       []  as TIngredient[],
            adds:       []  as TIngredient[],
            total:      0,
            number:     0,
            error:      "",
            send:       false,
        },
        user: {
            checkAuth:  false,
            email:      "",
            name:       "",
        },
        feed: {
            ws:           ""        as string,
            statuses:     {}        as TIndex,
            orders:       []        as TFeedOrder[],
            total:        null      as null | number,
            totalToday:   null      as null | number,
        },
        history: {
            ws:           ""        as string,
            orders:       []        as TFeedOrder[],
        }
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
                        
                        state.ingredients.indexes[ el._id ]   =   index

                        return acc
                    }, {})
                    
                    payload.types = Object.values(types)
                }

                
                state.ingredients.list  =   payload.data    ||  []
                state.ingredients.types =   payload.types   ||  []
                state.ingredients.error =   payload.error   ||  ""

                // console.log(payload.data)
                
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
        state.order.send    =   false
        state.order.buns    =   []
        state.order.adds    =   []
        const newState      =   stateCalculation(state)
        state.ingredients   =   newState.ingredients;
        state.order.total   =   newState.order.total;
    }),



    closeOrderError: create.reducer( state => {
        state.order.error   = ""
        state.order.send    = false
    }),
    

    sendOrderSend: create.reducer( state => {
        state.order.send    =   true
    } ),

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
                            'authorization': localStorage.getItem('accessToken') as string,
                            'Content-Type': 'application/json;charset=utf-8',
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
                
                if ( payload.error !== '' ) {
                    // alert(payload.error)
                    // console.log(payload)
                }
            },
            rejected: (state, action) => {
                state.order.error   =   `${action.type}...<br />Server message: ${action.error.message}`
                state.order.send    =   false
            },
        }
    ),


    // регистрация, токены, пользователь
    
    removeApiError: create.reducer(state => {
        state.apiError = ""
    }),

    sendRegisterThunk: create.asyncThunk(
      async (userData) => {
        return await fetchRequest<TUserResponse>('/api/auth/register', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData),
        })
      },
      {
        fulfilled: (state, {payload})=>{
        //   console.log(payload)
          state.user.name   =   payload.user.name
          state.user.email  =   payload.user.email
          setToken(payload)
        },
        rejected: (state, action) => {
          console.log(action)

          if ( action.error && action.error.message && action.error.message === "User already exists" ) {
            state.apiError = action.error.message
          } else {
            state.apiError = `${action.type}...\nServer message: ${action.error.message}` 
          }
        },
      }
    ),

    sendLoginThunk: create.asyncThunk(
        async (userData) => {
            return await fetchRequest<TUserResponse>
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
                state.user.name         =   payload.user.name
                state.user.email        =   payload.user.email
                state.apiError          =   ""
                setToken(payload)
            },
            rejected: (state, action) => {
                console.log(action)
                state.user.checkAuth    =   true
                state.apiError          =   `${action.type}...\nServer message: ${action.error.message}` 
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
                return Promise.reject("tokenUnknown-1");
            }

            return await fetchRequest<{
                susses: boolean
                user: {
                    email: string
                    name: string
                }
            }>(
                '/api/auth/user', {
                headers: {
                  'authorization': localStorage.getItem('accessToken') as string,
                  'Content-Type': 'application/json;charset=utf-8',
                }
            })
        },
        {
            fulfilled: (state, {payload}) => {
                state.user.checkAuth    =   true
                state.apiError          =   ""
                
                state.user.name     =   payload.user.name
                state.user.email    =   payload.user.email
            },
            rejected: (state, action) => {
                state.user.checkAuth    =   true
                console.log(action.error.message)
                state.apiError  =   `${action.type}...\nServer message: ${action.error.message}` 
            },
        }
    ),
    
    updateProfileThunk: create.asyncThunk(
        async (userData) => {
            return await fetchRequest<{
                susses: boolean
                user: {
                    email: string
                    name: string
                }
            }>(
                '/api/auth/user'
                ,{ 
                    method: "PATCH",
                    headers: {
                        'authorization': localStorage.getItem('accessToken') as string,
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(userData),
                }
            )
        }
        ,{
            fulfilled: (state, {payload}) => {
                state.user.name     =   payload.user.name
                state.user.email    =   payload.user.email
                state.apiError      =   ""
            },
            rejected: (state, action) => {
                console.log(action)
                state.apiError  =   `${action.type}...\nServer message: ${action.error.message}` 
            }
        }
    ),
    

    wsError: create.reducer( (state, {payload}: {payload: string}) => {
        state.apiError = payload
    } ),
    
    wsFeedConnect: create.reducer( (state, {payload}: {payload: string}) => {
        state.feed.ws = payload
    } ),
    
    updateFeedOrders: create.reducer( (state, {payload}: {payload: TFeedData}) => {
        
        const statuses = payload.orders.reduce( (acc:TIndex, {status}: TFeedOrder) => {
            acc[ status ] = acc[ status ] ?  acc[ status ]+1 :  1;
            return acc;
        }, {})

        // console.log(statuses)

        state.feed.orders       =   payload.orders
        state.feed.total        =   payload.total
        state.feed.totalToday   =   payload.totalToday
        state.feed.statuses     =   statuses
    } ),

    
    wsHistoryConnect: create.reducer( (state, {payload}: {payload: string}) => {
        state.history.ws    =   payload
    } ),
    
    updateHistoryOrders: create.reducer( (state, {payload}: {payload: TFeedData}) => {
        
        state.history.orders    =   [...payload.orders].reverse()
    } ),
    
  })
})


export const {
    getIngredientsThunk,
    updateOrder,
    deleteFromOrder,
    resortOrder,
    resetOrder,
    closeOrderError,
    sendOrderSend,
    sendOrderThunk,

    removeApiError,
    sendRegisterThunk,
    sendLoginThunk,
    sendLogoutThunk,
    getProfileThunk,
    updateProfileThunk,

    wsError,
    wsFeedConnect,
    updateFeedOrders,
    wsHistoryConnect,
    updateHistoryOrders,

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



