import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import appSlice from "./appSlice";
import wsFeedMiddleware from "./wsFeedMiddleware"; 
import wsHistoryMiddleware from "./wsHistoryMiddleware";
import wsMiddleware from "./wsMiddleware";


const store = configureStore({
    reducer: appSlice,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([wsMiddleware])
    },
})

export type TDispatch   = typeof store.dispatch
export type TStore      = ReturnType<typeof store.getState>

export const useDispatch2: () => TDispatch = useDispatch
export const useSelector2: TypedUseSelectorHook<TStore> = useSelector


export default store
