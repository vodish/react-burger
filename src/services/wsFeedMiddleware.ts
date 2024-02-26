
import { Middleware } from 'redux'
import { updateFeedOrders, wsFeedConnect } from './appSlice';
import { TFeedData } from '../utils/types';

 
const wsFeedMiddleware: Middleware = store => next => action => {
    // console.log('wsFeedMiddleware')
    if ( ! wsFeedConnect.match(action) || store.getState().feed.ws !== '' ) {
        return next(action)
    }
        

    const ws = new WebSocket(action.payload)
    
    ws.onmessage  = e => {
        const data: TFeedData = JSON.parse(e.data)
        store.dispatch( updateFeedOrders(data) )
    }
    
    next(action)
}
 
export default wsFeedMiddleware;