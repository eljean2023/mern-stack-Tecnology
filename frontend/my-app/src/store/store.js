import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productListReducer, 
        productAddReducer,
        productSingleReducer,
        productFilterUserReducer,
        productUpdatereReducer,
        productDeleteReducer
} from '../reducers/productReducer'


import {courseListReducer, 
    courseAddReducer,
    courseSingleReducer,
    courseFilterUserReducer,
    courseUpdatereReducer,
    courseDeleteReducer
} from '../reducers/courseReducer'

import {cartReducer} from '../reducers/cartReducer'

import {agendaAddReducer, agendaFilterUserReducer, agendaListReducer, agendaUpdateReducer, agendaDeleteReducer, agendaSingleReducer} from '../reducers/agendaReducer'

import {orderAddReducer, orderSingleDetailsReducer, orderPayReducer, myOrdersReducer} from '../reducers/orderReducer'

import {userLoginReducer, 
        userRegisterReducer, 
        userdETAILSReducer, 
        userUpdatereReducer,
        userDeleteReducer
} from '../reducers/userReducer'

const reducer = combineReducers({
    cart : cartReducer,

    orderAdd : orderAddReducer,
    orderSingleDetails : orderSingleDetailsReducer,
    orderPay : orderPayReducer,
    orderMyList : myOrdersReducer,

    productList : productListReducer,
    productSingle : productSingleReducer,
    productListUser :productFilterUserReducer, 
    productAdd : productAddReducer,
    productUpdate : productUpdatereReducer,
    productDelete : productDeleteReducer,

    courseList : courseListReducer,
    courseSingle : courseSingleReducer,
    courseListUser :courseFilterUserReducer, 
    courseAdd : courseAddReducer,
    courseUpdate : courseUpdatereReducer,
    courseDelete : courseDeleteReducer,

    userlogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDelete : userDeleteReducer,
    userDetails : userdETAILSReducer,
    userUpdate : userUpdatereReducer,

    agendaAdd : agendaAddReducer,
    agendaListByUser : agendaFilterUserReducer,
    agendaList: agendaListReducer,
    agendaSingle : agendaSingleReducer,
    agendaUp : agendaUpdateReducer,
    agendaDelete : agendaDeleteReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems'))
: []

const productInfoFromStorage = localStorage.getItem('productInfo')
? JSON.parse(localStorage.getItem('productInfo'))
: null

const courseInfoFromStorage = localStorage.getItem('courseInfo')
? JSON.parse(localStorage.getItem('courseInfo'))
: null

const agendaInfoFromStorage = localStorage.getItem('agendaInfo')
? JSON.parse(localStorage.getItem('agendaInfo'))
: null

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = {
    cart :{cartItems : cartItemsFromStorage} ,
    userlogin : {userInfo : userInfoFromStorage},
    productAdd : {productInfo : productInfoFromStorage},
    courseAdd : {couseInfo : courseInfoFromStorage},
    agendaAdd : {agendaInfo : agendaInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store 