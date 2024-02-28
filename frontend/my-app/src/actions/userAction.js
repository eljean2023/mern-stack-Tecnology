import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, 
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
} from '../constants/user'
import axios from 'axios'

export const loginAction = (email, password)=>async(dispatch)=>{
    try {
    dispatch({type: USER_LOGIN_REQUEST})

    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }

    const {data} = await axios.post('/api/login', {email, password}, config)
    
    dispatch({type: USER_LOGIN_SUCCESS, payload : data})

    localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}

export const logout = () =>(dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({type : USER_LOGOUT})
}


export const registerAction = (name, email, password)=>async(dispatch)=>{
    try {
    dispatch({type: USER_REGISTER_REQUEST})

    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }

    const {data} = await axios.post('/api/singUp', {name, email, password}, config)
    
    dispatch({type: USER_REGISTER_SUCCESS, payload : data})

    dispatch({type: USER_LOGIN_SUCCESS, payload : data})

    localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}

export const UserDetailsAction = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: USER_DETAILS_REQUEST})

    const {userlogin : {userInfo}} = getState()
    
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
        
    }

    const {data} = await axios.get(`/api/${id}`, config)
    
    dispatch({type: USER_DETAILS_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: USER_DETAILS_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}

export const UserUpdateAction = (user)=>async(dispatch, getState)=>{
    try {
    dispatch({type: USER_UPDATE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
        
    }

    const {data} = await axios.put(`/api/profile`,user, config)
    
    dispatch({type: USER_UPDATE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: USER_UPDATE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const UserDeleteAction = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: USER_DELETE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    /*const headers = { 'authorization': `${userInfo.token}` }*/
   
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }
    

    const {data} = await axios.delete(`/api/profile/${id}`,config)
    
    dispatch({type: USER_DELETE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: USER_DELETE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}