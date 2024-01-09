import { configureStore } from "@reduxjs/toolkit";
// import ingredientsSlice from "./ingredientsSlice";
// import orderSlice from "./orderSlice";
import appSlice from "./appSlice";



export default configureStore({
    reducer: appSlice
    // reducer: {
    //     ingredients: ingredientsSlice,
    //     order: orderSlice,
    // }
})
