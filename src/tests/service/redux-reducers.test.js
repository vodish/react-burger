import store from "../../services/redux"
import { appSlice } from "../../services/appSlice"
import { testDataIngredients } from "../data/ingrediens"
import { testDataOrders } from "../data/orders"

describe('Redux state tests', () => {

  const initialState = store.getState()

  let action
  let result
  /*
    // создать акшен в ручную
    // вызвать редюсер с ручным акшеном
  */
  

  it('getIngredientsThunk', () => {
    
    action  =   {
      type: appSlice.actions.getIngredientsThunk.fulfilled,
      payload: {
        data: [testDataIngredients.data[0]]
      }
    };
    // console.log(action)
    result  =   appSlice.reducer(initialState, action)


    expect( result ).toEqual({
      ...initialState,
      ingredients: {
        ...initialState.ingredients,
        list: [ testDataIngredients.data[0] ],
        types: [ { type: 'bun', name: 'Булки', entries: [ 0 ] } ],
        error: '',
        indexes: { '643d69a5c3f7b9001cfa093c': 0 },
      }
    });

  })


  it('updateOrder', () => {
    
    action  =   {
      type: appSlice.actions.updateOrder,
      payload: {...testDataIngredients.data[0]}
    };

    result  =   appSlice.reducer(initialState, action)

    expect( result ).toEqual({
      ...initialState,
      order: {
        ...initialState.order,
        buns: result.order.buns,
        total: 2510,
      }
    });

  })




  it('deleteFromOrder', () => {
    
    // добавить ингридиенты
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.getIngredientsThunk.fulfilled,
      payload: {
        data: [
          testDataIngredients.data[0],
          testDataIngredients.data[1],
        ]
      }
    })

    // добавить булку
    let resut1  = result = appSlice.reducer(result, {
      type: appSlice.actions.updateOrder,
      payload: {...testDataIngredients.data[0]}
    })

    // добавить начинку
    result = appSlice.reducer(result, {
      type: appSlice.actions.updateOrder,
      payload: {...testDataIngredients.data[1]}
    })
    // console.log(result)


    // удалить начинку
    result  =   appSlice.reducer(result, {
      type: appSlice.actions.deleteFromOrder,
      payload: 0
    })
    

    // console.log(result)
    expect( result ).toEqual(resut1);

  })





  it('resortOrder', () => {
    
    // добавить ингридиенты
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.getIngredientsThunk.fulfilled,
      payload: {
        data: [
          testDataIngredients.data[0],
          testDataIngredients.data[1],
        ]
      }
    })

    // добавить булку
    result = appSlice.reducer(result, {
      type: appSlice.actions.updateOrder,
      payload: {...testDataIngredients.data[0]}
    })

    // добавить начинку 1: Биокотлета из марсианской Магнолии
    result = appSlice.reducer(result, {
      type: appSlice.actions.updateOrder,
      payload: {...testDataIngredients.data[1]}
    })

    // добавить начинку 2: Филе Люминесцентного тетраодонтимформа
    let resut1  = result = appSlice.reducer(result, {
      type: appSlice.actions.updateOrder,
      payload: {...testDataIngredients.data[2]}
    })
    // console.log(result.order.adds)



    // переставить начинку местами
    result  =   appSlice.reducer(result, {
      type: appSlice.actions.resortOrder,
      payload: [0,1]
    })
    // console.log(result.order.adds)

    
    expect(result).toEqual({
      ...resut1,
      order: {
        ...resut1.order,
        adds: [
          resut1.order.adds[1],
          resut1.order.adds[0],
        ]
      }
    });

  })





  it('resetOrder', () => {
    
    result  =   {
      ...initialState,
      order: {
        ...initialState.order,
        number: 123,
        send: true,
        total: 123,
      }
    };
    // console.log(result)

    result  =   appSlice.reducer(result, {
      type: appSlice.actions.resetOrder
    })
    // console.log(result)


    expect(result).toEqual(initialState)

  })





  it('sendOrderSend', () => {
    
    const result1  =   {
      ...initialState,
      order: {
        send: false,
      }
    };

    result  =   appSlice.reducer(result1, {
      type: appSlice.actions.sendOrderSend
    })


    expect(result).toEqual({
      ...result1,
      order: {
        ...result1.order,
        send: true
      }
    })
  })


  

  it('sendOrderThunk', () => {

    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.sendOrderThunk.fulfilled,
      payload: {
        order: {
          number: 123
        },
        error: "noerr"
      }
    })

    expect(result).toEqual({
      ...initialState,
      order: {
        ...initialState.order,
        number: 123,
        error: 'noerr'
      }
    })

  })


  it('removeApiError', () => {
    
    result = {...initialState, apiError: 'err'}

    result  =   appSlice.reducer(result, {
      type: appSlice.actions.removeApiError
    })

    expect(result).toEqual({
      ...initialState,
      apiError: ''
    })

  })

  


  it('sendRegisterThunk', () => {

    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.sendRegisterThunk.fulfilled,
      payload: {
        user: {
          name: "123",
          email: "123",
        }
      }
    })

    expect(result).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        name: "123",
        email: "123",
      }
    })

  })



  it('sendLoginThunk', () => {
    
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.sendLoginThunk.fulfilled,
      payload: {
        user: {
          name: "123",
          email: "123",
        }
      }
    })

    expect(result).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        checkAuth: true,
        name: '123',
        email: '123',
      },
      apiError: '',
    })
    
  })




  it('sendLogoutThunk', () => {

    const result1 = {
      ...initialState,
      apiError: "err",
      user: {
        ...initialState.user,
        name: "123",
        name: "email",
      }
    }

    result  =   appSlice.reducer(result1, {
      type: appSlice.actions.sendLogoutThunk.fulfilled
    })

    expect(result).toEqual(initialState)
    
  })

  


  it('getProfileThunk', () => {
    
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.getProfileThunk.fulfilled,
      payload: {
        user: {
          name: "123",
          email: "123",
        }
      }
    })

    expect(result).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        checkAuth: true,
        name: "123",
        email: "123",
      }
    })

  })


  it('updateProfileThunk', () => {

    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.updateProfileThunk.fulfilled,
      payload: {
        user: {
          name: "123",
          email: "123",
        }
      }
    })
    
    expect(result).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        name: "123",
        email: "123",
      }
    })

  })

  it('wsError', () => {
    
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.wsError,
      payload: "err"
    })
    
    expect(result).toEqual({
      ...initialState,
      apiError: "err"
    })

  })

  it('wsFeedConnect', () => {
    
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.wsFeedConnect,
      payload: "connect"
    })

    
    expect(result).toEqual({
      ...initialState,
      feed: {
        ...initialState.feed,
        ws: "connect"
      }
    })

  })




  it('updateFeedOrders', () => {

    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.updateFeedOrders,
      payload: testDataOrders
    })

    
    expect(result).toEqual({
      ...initialState,
      feed: {
        ...initialState.feed,
        orders: testDataOrders.orders,
        statuses: {
          done: 3
        },
        total: 123,
        totalToday: 123,
      }
    })

  })




  it('wsHistoryConnect', () => {
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.wsHistoryConnect,
      payload: "connect"
    })

    expect(result).toEqual({
      ...initialState,
      history: {
        ...initialState.history,
        ws: "connect"
      }
    })
  })


  it('updateHistoryOrders', () => {
    
    result  =   appSlice.reducer(initialState, {
      type: appSlice.actions.updateHistoryOrders,
      payload: testDataOrders,
    })

    
    expect(result).toEqual({
      ...initialState,
      history: {
        ...initialState.history,
        orders: [...testDataOrders.orders].reverse(),
      }
    })

  })


})