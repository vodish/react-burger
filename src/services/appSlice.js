import { createSlice } from "@reduxjs/toolkit";




const appSlice = createSlice({
    name: 'app',
    initialState: {
        ingredients: {
            list: [],
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
        ingredientsSetup: (state, {payload}) => {
            state.ingredients.list  =   payload.list || []
            state.ingredients.error =   payload.error || null
        },

        orderInsert: (state, {payload}) => {
            if ( payload.type === 'bun' ) {
                state.order.buns = [
                    {...payload, name: `${payload.name} (верх)` },
                    {...payload, name: `${payload.name} (низ)` },
                ]
            } else {
                state.order.adds.push(payload)
            }
            
            const newState = stateCalculation(state)
            state.order.total = newState.order.total;
            state.ingredients = newState.ingredients;
            
        },

        orderDelete: (state, {payload}) => {
            
            state.order.adds.splice( payload, 1 )
            
            const newState = stateCalculation(state)
            state.ingredients = newState.ingredients;
            state.order.total = newState.order.total;
        },

        orderAddsSort: (state, action) => {

        },
    }
})


export const {
    ingredientsSetup,
    orderInsert,
    orderDelete,
    orderAddsSort,
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
