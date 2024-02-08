import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./js_appSlice";

const store = configureStore({
    reducer: appSlice
})

export type TStore = ReturnType<typeof store.getState>

export default store
