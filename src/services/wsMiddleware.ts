
import { Middleware } from 'redux'
import { updateFeedOrders, updateHistoryOrders, wsFeedConnect, wsHistoryConnect } from './appSlice';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

 

export type TwsAction = {
    wsConnect:      typeof wsFeedConnect    | typeof wsHistoryConnect,
    onMessage:      typeof updateFeedOrders | typeof updateHistoryOrders,
    onError:        ActionCreatorWithPayload<string>,

    wsDisconnect?:  ActionCreatorWithoutPayload,
    wsConnecting?:  ActionCreatorWithoutPayload,
    onOpen?:        ActionCreatorWithoutPayload,
    onClose?:       ActionCreatorWithoutPayload,
}


export const wsMiddleware = (wsActions: TwsAction): Middleware => store => {

    let socket: WebSocket | null = null;
    const { wsConnect, onMessage, onError } = wsActions;
    const { dispatch } = store;
    

    return next => action => {
    
        if ( socket == null && wsConnect.match(action) ) {
            
            console.log('connect ' + action.payload)
            
            socket = new WebSocket(action.payload);
            dispatch( wsConnect(action.payload) );
            
            
            socket.onmessage = e => {
                const data = JSON.parse(e.data);
                dispatch( onMessage(data) );
            };

            socket.onerror = () => {
                const mess = `Не могу к ${action.payload}`
                console.log(mess)
                dispatch( onError(mess) );
            };

            socket.onopen = () => {
                console.log('socket is onopen')
                wsActions.onOpen && dispatch( wsActions.onOpen() );
            };

            socket.onclose = event => {
                if (event.code !== 1000) {
                  console.log('socket error !== 1000')
                }
                console.log('socket is closed')
                socket = null
                wsActions.onClose && dispatch( wsActions.onClose() );
            };
        }


        if (socket && wsActions.wsDisconnect && wsActions.wsDisconnect.match(action)) {
            console.log('socket disconnect')
            socket.close();
            wsActions.onClose && dispatch(wsActions.onClose());
        }


        next(action);
    };
};
