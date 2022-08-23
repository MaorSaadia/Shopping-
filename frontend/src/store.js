import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';

/*const reducer = combineReducers({
  productList: productListReducer,
  productDeatils: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegistor: userRegisterReducer,
});*/

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

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDeatils: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegistor: userRegisterReducer,
  },
  intialState,
});

export default store;
