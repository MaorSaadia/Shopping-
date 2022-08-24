import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpadateProfileReducer,
} from './reducers/userReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  productList: productListReducer,
  productDeatils: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegistor: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpadateProfile: userUpadateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const intialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import {
//   productListReducer,
//   productDetailsReducer,
// } from './reducers/productReducer';
// import { cartReducer } from './reducers/cartReducer';
// import {
//   userLoginReducer,
//   userRegisterReducer,
//   userDetailsReducer,
// } from './reducers/userReducer';
// import { createSlice } from '@reduxjs/toolkit';

// const cartItemsFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : [];

// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const cart = createSlice({
//   name: 'cart',
//   initialState: { cartItems: cartItemsFromStorage },
//   reducers: {
//     cart: cartReducer,
//   },
// });

// const userLogin = createSlice({
//   name: 'userLogin',
//   initialState: { userInfo: userInfoFromStorage },
//   reducers: {
//     userLogin: userLoginReducer,
//   },
// });

// const reducer = combineReducers({
//   productList: productListReducer,
//   productDeatils: productDetailsReducer,
//   cart: cart.reducer,
//   userLogin: userLogin.reducer,
//   userRegistor: userRegisterReducer,
//   userDetails: userDetailsReducer,
// });

// const store = configureStore({
//   reducer,
// });

// export default store;
