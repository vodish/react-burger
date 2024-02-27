
import { Middleware } from 'redux'
import { updateFeedOrders, updateHistoryOrders, wsFeedConnect, wsHistoryConnect } from './appSlice';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

 

export type TwsActionTypes = {
    wsConnect:      typeof wsFeedConnect    | typeof wsHistoryConnect,
    onMessage:      typeof updateFeedOrders | typeof updateHistoryOrders,
    onError:        ActionCreatorWithPayload<string>,

    wsDisconnect?:  ActionCreatorWithoutPayload,
    wsConnecting?:  ActionCreatorWithoutPayload,
    onOpen?:        ActionCreatorWithoutPayload,
    onClose?:       ActionCreatorWithoutPayload,
}


export const wsMiddleware = (wsActions: TwsActionTypes): Middleware => store => {

    let socket: WebSocket | null = null;
    const { wsConnect, onMessage, onError } = wsActions;
    const { dispatch } = store;
    

    return next => action => {
    
        if ( socket == null && wsConnect.match(action) ) {
            
            console.log('connect ' + action.payload)
            
            socket = new WebSocket(action.payload);
            dispatch( wsConnect(action.payload) );
            

            socket.onerror = () => {
                dispatch( onError(`Не могу к ${action.payload}`) );
            };

            socket.onmessage = e => {
                const data = JSON.parse(e.data);
                dispatch( onMessage(data) );
            };
        }


        next(action);
    };
};
