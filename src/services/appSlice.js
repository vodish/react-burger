import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { fetchRequest } from "../utils/api";


const createSliceWhitThunks = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator }
})


const appSlice = createSliceWhitThunks({
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
        },
        user: {
            email: null,
            name: null,
        },
        accessToken: null,
        refreshToken: null,
    },
    reducers: create => ({
        
        getIngredientsThunk: create.asyncThunk(
            async () => fetchRequest('/api/ingredients'),
            {
                fulfilled:  (state, {payload}) => {
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
                    
                },
                rejected: (state, action) => {
                    console.log(action)
                    state.ingredients.error = `${action.type}... ${action.error.message}`
    
                }
            }
        ),
        

        updateOrder: create.reducer( (state, {payload}) => {

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


        deleteFromOrder: create.reducer( (state, {payload}) => {
            state.order.adds.splice( payload, 1 )
            
            const newState      =   stateCalculation(state)
            state.ingredients   =   newState.ingredients;
            state.order.total   =   newState.order.total;
        }),


        resortOrder: create.reducer( (state, {payload}) => {
            const drag  =   state.order.adds[payload.dragIndex]
            state.order.adds[payload.dragIndex]     =   state.order.adds[payload.hoverIndex]
            state.order.adds[payload.hoverIndex]    =   drag
        }),
        

        resetOrder: create.reducer( state => {
            state.order.number  =   null
            state.order.buns    =   []
            state.order.adds    =   []
            const newState      =   stateCalculation(state)
            state.ingredients   =   newState.ingredients;
            state.order.total   =   newState.order.total;
        }),


        closeOrderError: create.reducer( state => {
            state.order.error = null
        }),

        
        sendOrderThunk: create.asyncThunk(
            async (ingredients) => {
                return fetchRequest('/api/orders', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ingredients}),
                })
            },
            {
                fulfilled: (state, {payload})=>{
                    state.order.number  =   payload.order ? payload.order.number : null
                    state.order.error   =   payload.error || null
    
                    if ( payload.error ) {
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


        sendRegister: create.reducer( (state, {payload}) => {
            console.log(payload)
        })
        
    })
})


export const {
    getIngredientsThunk,
    ingredientsSetup,
    updateOrder,
    deleteFromOrder,
    resortOrder,
    orderSubmit,
    resetOrder,
    closeOrderError,
    sendOrderThunk,

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



