import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import ingredientsSlice from "./ingredientsSlice";
import orderSlice from "./orderSlice";


export default configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        order: orderSlice,
        counter: counterSlice,
    }
})
