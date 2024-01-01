import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        number: null,
        bun: [],
        add: [],
        total: 0,
        error: null,
    },
    reducers: {
        addIngredient: (state, action) => {

        },
        removeIngredient: (state, action) => {

        },
        reorderIngredient: (state, action) => {

        },
    }
})

export const {
    addIngredient,
    removeIngredient,
    reorderIngredient,
} = orderSlice.actions

export default orderSlice.reducer
