import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const baseUrl    =  "https://norma.nomoreparties.space";



async function fetchRequest(endPoint, headers={}) {
    const res   =   await fetch(`${baseUrl}${endPoint}`, headers)
    let data;
    
    try { data = await res.json() }
    catch(err) { data = {error: `Сервер ${res.status}...`} }

    if ( !res.ok && !data.error ) {
        data.error = 'Ошибка c серверa... ' + (data.message || 'не ответил')
    }

    return data;
}





export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients"
    , async () => fetchRequest('/api/ingredients')
)

export const sendOrder = createAsyncThunk(
    "order/sendOrder"
    , async (ingredients) => {
        return fetchRequest('/api/orders', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients}),
        })
    }
)




const appSlice = createSlice({
    name: 'app',
    initialState: {
        ingredients: {
            list: [],
            types: [],
            error: null
        },
        order: {
            buns: [],
            adds: [],
            total: 0,
            number: null,
            error: null,
        }
    },
    reducers: {

        updateOrder: (state, {payload}) => {

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
        },

        deleteFromOrder: (state, {payload}) => {
            state.order.adds.splice( payload, 1 )
            
            const newState      =   stateCalculation(state)
            state.ingredients   =   newState.ingredients;
            state.order.total   =   newState.order.total;
        },

        resortOrder: (state, {payload}) => {
            const drag  =   state.order.adds[payload.dragIndex]
            state.order.adds[payload.dragIndex]     =   state.order.adds[payload.hoverIndex]
            state.order.adds[payload.hoverIndex]    =   drag
        },
        
        resetOrder: (state) => {
            state.order.number  =   null
            state.order.buns    =   []
            state.order.adds    =   []
            const newState      =   stateCalculation(state)
            state.ingredients   =   newState.ingredients;
            state.order.total   =   newState.order.total;
        },
        
    },
    extraReducers(builder) {
        builder
            .addCase(getIngredients.fulfilled, (state, {payload}) => {
                
                if ( payload.data ) {
                    const typeNname = {
                        bun: "Булки",
                        main: "Начинки",
                        sauce: "Соусы",
                    }
                    
                    const types = payload.data.reduce((acc, el, index)=>{
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
                state.ingredients.error =   payload.error   ||  null
                
            })
            .addCase(sendOrder.fulfilled, (state, {payload})=>{
                state.order.number  =   payload.order ? payload.order.number : null
                state.order.error   =   payload.error || null

                if ( payload.error ) {
                    alert(payload.error)
                    console.log(payload)
                    return;
                }
            })
            

    }
})


export const {
    ingredientsSetup,
    updateOrder,
    deleteFromOrder,
    resortOrder,
    orderSubmit,
    resetOrder,
} = appSlice.actions

export default appSlice.reducer




function stateCalculation(state) {
    state = JSON.parse( JSON.stringify(state) )

    state.order.total = 0;
    let counts = {};

    [...state.order.buns, ...state.order.adds ].map( item => {
        counts[item._id] = counts[item._id] ? ++counts[item._id]:  1;
        state.order.total += item.price;
    })
    
    state.ingredients.list  =   state.ingredients.list.map( item => {
        return {...item, count: counts[item._id] || 0}
    })


    return state;
}



