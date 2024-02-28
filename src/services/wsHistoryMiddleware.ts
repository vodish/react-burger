
import { Middleware } from 'redux'
import { updateHistoryOrders, wsHistoryConnect } from './appSlice';
import { TFeedData } from '../utils/types';

 
const wsHistoryMiddleware: Middleware = store => next => action => {
    
    if ( ! wsHistoryConnect.match(action) || store.getState().history.ws !== '' ) {
        return next(action)
    }
    
    
    const ws = new WebSocket(action.payload)
    // console.log(action.payload)
    
    ws.onmessage  = e => {
        const data: TFeedData = JSON.parse(e.data)
        // console.log(data)
        store.dispatch( updateHistoryOrders(data) )
    }
    
    next(action)
}
 
export default wsHistoryMiddleware;