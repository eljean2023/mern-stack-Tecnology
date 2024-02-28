import {CART_ADD_ITEM, CART_REMOVE_ITEM, PAYMENT_METHOD} from '../constants/cart'

import axios from 'axios'

export const addToCart = (id, qty) => async(dispatch, getState)=>{
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
    const {data} = await axios.get(`/api/singleProduct/${id}`, {headers})
    dispatch({
       type: CART_ADD_ITEM, 
        payload : {
        product : data._id,
        title : data.title,
        category : data.category,
        filename : data.filename,
        price : data.price 
        } 
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch, getState)=>{
    dispatch({
       type: CART_REMOVE_ITEM, 
        payload : id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const savepaymentMethod = (data) => async(dispatch)=>{
    dispatch({
       type: PAYMENT_METHOD, 
        paymentMethod : data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))

}

