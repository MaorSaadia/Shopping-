import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDeatils: productDetailsReducer,
});

const store = configureStore({
  reducer,
});

export default store;

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
