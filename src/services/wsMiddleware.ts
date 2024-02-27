
import { Middleware } from 'redux'
import { updateFeedOrders, updateHistoryOrders, wsFeedConnect, wsHistoryConnect } from './appSlice';
import { TFeedData } from '../utils/types';

 
const wsMiddleware: Middleware = store => next => action => {
    
    if ( wsFeedConnect.match(action) && store.getState().feed.ws == '' ) {

        const ws = new WebSocket(action.payload)
        console.log(action.payload)

        ws.onmessage  = e => {
            const data: TFeedData = JSON.parse(e.data)
            store.dispatch( updateFeedOrders(data) )
        }
    }
    
    if ( wsHistoryConnect.match(action) && store.getState().history.ws == '' ) {
    
        const ws = new WebSocket(action.payload)
        console.log(action.payload)
        
        ws.onmessage  = e => {
            const data: TFeedData = JSON.parse(e.data)
            store.dispatch( updateHistoryOrders(data) )
        }
    }


    next(action)
}
 
export default wsMiddleware;