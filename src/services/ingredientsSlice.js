import { createSlice } from "@reduxjs/toolkit";






const ingredientsSlice = createSlice({    
    name: 'ingredients',
    initialState: {
        list: [],
        error: null
    },
    reducers: {
        setIngredients: (state, {payload}) => {

            console.log(payload)

            state.list  =   payload.list
            state.error =   payload.error || null
        }
    }
})


export const { setIngredients } = ingredientsSlice.actions

export default ingredientsSlice.reducer

