import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import appSlice, { updateFeedOrders, updateHistoryOrders, wsError, wsFeedConnect, wsHistoryConnect } from "./appSlice";
import { wsMiddleware } from "./wsMiddleware";



const wsFeed = wsMiddleware({
    wsConnect:  wsFeedConnect,
    onMessage:  updateFeedOrders,
    onError:    wsError,
});

const wsHistory = wsMiddleware({
    wsConnect:  wsHistoryConnect,
    onMessage:  updateHistoryOrders,
    onError:    wsError,
});



const store = configureStore({
    reducer: appSlice,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([wsFeed, wsHistory])
    },
})

export type TDispatch   = typeof store.dispatch
export type TStore      = ReturnType<typeof store.getState>

export const useDispatch2: () => TDispatch = useDispatch
export const useSelector2: TypedUseSelectorHook<TStore> = useSelector


export default store
