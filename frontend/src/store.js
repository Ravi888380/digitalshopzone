import { createStore, combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,
    productDetailsReducer,
    productReviewCreateReducer,
    productTopRatedReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListeReducer,
    userUpdateReducer,
 } from './reducers/userReducers'
 import {orderCreateReducer,orderGetReducer,orderPayReducer ,orderListMyReducer,} from './reducers/orderReducers'


const reducer= combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    cart :cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListeReducer,
    userDelete:userDetailsReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderGetReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,


})

const cartItemsFromStroge=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []
const userInfoFromStroge=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
const shippingAddressFromStroge=localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}
const paymentMethodFromStroge=localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')): {}

const initialState ={
    cart:{
        cartItems:cartItemsFromStroge,
    shippingAddress: shippingAddressFromStroge,
    paymentMethod: paymentMethodFromStroge,
    },
    userLogin:{userInfo:userInfoFromStroge}
}
const middleware = [thunk]


const store= createStore(
    reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store