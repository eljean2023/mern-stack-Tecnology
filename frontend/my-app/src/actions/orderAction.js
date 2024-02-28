import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    SINGLE_ORDER_DETAILS_REQUEST,
    SINGLE_ORDER_DETAILS_SUCCESS,
    SINGLE_ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAIL

} from '../constants/order'

import axios from 'axios'

export const orderAddAction = (order)=>async(dispatch, getState)=>{
    try {
    dispatch({type: ORDER_CREATE_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }

    const {data} = await axios.post('/api/newOrder', order, config)
    
    dispatch({type: ORDER_CREATE_SUCCESS, payload : data})

    //dispatch({type: PRODUCT_ADD_SUCCESS, payload : data})

    //localStorage.setItem('productInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({type: ORDER_CREATE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}

export const orderSigleDetailsAction = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: SINGLE_ORDER_DETAILS_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const config = {
        headers : {
            authorization : `${userInfo.token}`
        }
    }

    const {data} = await axios.get(`/api/singleOrder/${id}`, config)
    
    dispatch({type: SINGLE_ORDER_DETAILS_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: SINGLE_ORDER_DETAILS_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const orderPayAction = (id, paymentResult)=>async(dispatch, getState)=>{
    try {
    dispatch({type: ORDER_PAY_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }

    const {data} = await axios.put(`/api/orderPay/${id}/pay`, config)
    
    dispatch({type: ORDER_PAY_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: ORDER_PAY_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}

export const myOrdersActions = ()=>async(dispatch, getState)=>{
    try {
    dispatch({type: MY_ORDER_LIST_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
   /*
    const config = {
        headers : {
            //'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }  
    }*/
    const {data} = await axios.get(`/api/OrdersUserLogin`, {headers})
    dispatch({type: MY_ORDER_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: MY_ORDER_LIST_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}
