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

export const userLoginReducer = (state={}, action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST :
            return {loading :true}
        case USER_LOGIN_SUCCESS :
            return {loading: false, userInfo: action.payload} 
        case USER_LOGIN_FAIL :
            return {loading: false, error: action.payload}  
        case USER_LOGOUT :
            return {} 
        default:
            return state
    }
}

export const userRegisterReducer = (state={}, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST :
            return {loading :true}
        case USER_REGISTER_SUCCESS :
            return {loading: false, userInfo: action.payload} 
        case USER_REGISTER_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
}

export const userdETAILSReducer = (state={user:{}}, action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST :
            return {...state, loading :true}
        case USER_DETAILS_SUCCESS :
            return {loading: false, user: action.payload} 
        case USER_DETAILS_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
   
}

export const userUpdatereReducer = (state={}, action)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST :
            return {loading :true}
        case USER_UPDATE_SUCCESS :
            return {loading: false, success: true, userInfo: action.payload} 
        case USER_UPDATE_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
   
}

export const userDeleteReducer = (state={}, action)=>{
    switch(action.type){
        case USER_DELETE_REQUEST :
            return {loading :true}
        case USER_DELETE_SUCCESS :
            return {loading: false, success: true} 
        case USER_DELETE_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
}