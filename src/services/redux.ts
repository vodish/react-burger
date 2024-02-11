import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import appSlice from "./appSlice";

const store = configureStore({
    reducer: appSlice
})

export type TDispatch   = typeof store.dispatch
export type TStore      = ReturnType<typeof store.getState>

export const useDispatch2: () => TDispatch = useDispatch
export const useSelector2: TypedUseSelectorHook<TStore> = useSelector


export default store
