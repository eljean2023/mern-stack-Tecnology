import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,

    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,

    PRODUCT_FILTER_BY_USER_LIST_REQUEST,
    PRODUCT_FILTER_BY_USER_LIST_SUCCESS,
    PRODUCT_FILTER_BY_USER_LIST_FAIL, 

    PRODUCT_SINGLE_REQUEST,
    PRODUCT_SINGLE_SUCCESS,
    PRODUCT_SINGLE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL

} from '../constants/products'

import axios from 'axios'

export const productsActions = ()=>async(dispatch)=>{
    try {
    dispatch({type: PRODUCT_LIST_REQUEST})
    const {data} = await axios.get('/api/allProducts')
    dispatch({type: PRODUCT_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const producSingleActions = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: PRODUCT_SINGLE_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
   /*
    const config = {
        headers : {
            //'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }  
    }*/
    const {data} = await axios.get(`/api/singleProduct/${id} `, {headers})
    dispatch({type: PRODUCT_SINGLE_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: PRODUCT_SINGLE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const productUserActions = ()=>async(dispatch, getState)=>{
    try {
    dispatch({type: PRODUCT_FILTER_BY_USER_LIST_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
   /*
    const config = {
        headers : {
            //'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }  
    }*/
    const {data} = await axios.get('/api/productByUserLogin', {headers})
    dispatch({type: PRODUCT_FILTER_BY_USER_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: PRODUCT_FILTER_BY_USER_LIST_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const productAddAction = (name, link/*title, category, price, filename */)=>async(dispatch, getState)=>{
    try {
    dispatch({type: PRODUCT_ADD_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }

    const {data} = await axios.post('/api/newProduct', {link, name/*title, category, price, filename */}, config)
    
    dispatch({type: PRODUCT_ADD_SUCCESS, payload : data})

    dispatch({type: PRODUCT_ADD_SUCCESS, payload : data})

    localStorage.setItem('productInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({type: PRODUCT_ADD_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const ProductUpdateAction = (product)=>async(dispatch, getState)=>{
    try {
    dispatch({type: PRODUCT_UPDATE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
        
    }

    const {data} = await axios.put(`/api/upgradeProduct/${product._id}`,product, config)
    
    dispatch({type: PRODUCT_UPDATE_SUCCESS})

    dispatch({type: PRODUCT_SINGLE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: PRODUCT_UPDATE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const productDeleteAction = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: PRODUCT_DELETE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    /*const headers = { 'authorization': `${userInfo.token}` }*/
   
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }
    

    const {data} = await axios.delete(`/api/deleteProduct/${id}`,config)
    
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}