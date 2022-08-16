//import {combineReducers,/*applyMiddleware*/}from 'redux'
//import thunk from 'redux-thunk'
//import {composeWithDevTools} from 'redux-devtools-extension'

//const reducer = combineReducers({})
//const initialState = {}
//const middleware = {thunk}
// const store = configureStore(
//     reducer,initialState,
//     composeWithDevTools(applyMiddleware(...middleware)))

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { productListReducer } from './reducers/productReducer'

const reducer = combineReducers({
  productList: productListReducer,

})

const store = configureStore({
    reducer,
    //productList: productListReducer,
  })

 export default store





// import {combineReducers,/*applyMiddleware*/}from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
// //import thunk from 'redux-thunk'
// //import {composeWithDevTools} from 'redux-devtools-extension'

// const reducer = combineReducers({})

// const initialState = {}

// //const middleware = {thunk}
// // const store = configureStore(
// //     reducer,initialState,
// //     composeWithDevTools(applyMiddleware(...middleware)))

// const store = configureStore({
//     reducer: {
//       reducer,
//       initialState,
//     }
//   })

//  export default store
