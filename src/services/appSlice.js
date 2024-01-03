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
            }
            else {
                state.order.adds.push(payload)
            }
            
            if ( state.order.buns.length === 0 )
            {
                state.order.adds = []
                return;
            }

            const newState      =   stateCalculation(state);
            state.order.total   =   newState.order.total;
            state.ingredients   =   newState.ingredients;
        },

        orderDelete: (state, {payload}) => {
            state.order.adds.splice( payload, 1 )
            
            const newState      =   stateCalculation(state)
            state.ingredients   =   newState.ingredients;
            state.order.total   =   newState.order.total;
        },

        orderAddsSort: (state, {payload}) => {
            const drag  =   state.order.adds[payload.dragIndex]
            state.order.adds[payload.dragIndex]     =   state.order.adds[payload.hoverIndex]
            state.order.adds[payload.hoverIndex]    =   drag
        },
        
        orderSubmit: (state, {payload}) => {
            state.order.number  =   payload.order ? payload.order.number : null
            state.order.error   =   payload.error || null

            if ( payload.error )   return;

            const newState      =   stateCalculation(state)
            state.ingredients   =   newState.ingredients;
            state.order.total   =   newState.order.total;
        },
        
        orderReset: (state) => {
            state.order.number  =   null
            state.order.buns    =   []
            state.order.adds    =   []
            const newState      =   stateCalculation(state)
            state.ingredients   =   newState.ingredients;
            state.order.total   =   newState.order.total;
        },
        
    }
})


export const {
    ingredientsSetup,
    orderInsert,
    orderDelete,
    orderAddsSort,
    orderSubmit,
    orderReset,
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





const SEND_ORDER_URL    =  "https://norma.nomoreparties.space/api/orders";

export async function apiOrderSubmit(bodyData)
{
   try {
      const response    =  await fetch(SEND_ORDER_URL, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(bodyData),
      })
      
      if ( !response.ok ) {
         return {error: "Ответ сети был не ok..."}
      }

      const data     =  await response.json();
      if ( data.success !== true ) {
         return {error: "Сервер вернул ошибку data.success..."}
      }
      
      return { ...data }
      
   }
   catch (error)
   {
      return {error: `Возникла проблема с вашим fetch запросом: ${error.message}`}
   }
}




const INGREDIENTS_URL   =  "https://norma.nomoreparties.space/api/ingredients";

export async function apiGetIngredients()
{
   try {
      const response    =  await fetch(INGREDIENTS_URL)
      
      if ( !response.ok ) {
         return {error: "Ответ сети был не ok..."}
      }

      const data     =  await response.json();
      if ( data.success !== true ) {
         return {error: "Сервер вернул ошибку data.success..."}
      }

      return { list: data.data }
      
   }
   catch (error)
   {
      return {error: `Возникла проблема с вашим fetch запросом: ${error.message}`}
   }
}
