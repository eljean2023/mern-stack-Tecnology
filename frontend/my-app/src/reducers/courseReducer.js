import {
    COURSE_LIST_REQUEST, 
    COURSE_LIST_SUCCESS, 
    COURSE_LIST_FAIL,

    COURSE_ADD_REQUEST,
    COURSE_ADD_SUCCESS,
    COURSE_ADD_FAIL,

    COURSE_FILTER_BY_USER_LIST_REQUEST,
    COURSE_FILTER_BY_USER_LIST_SUCCESS,
    COURSE_FILTER_BY_USER_LIST_FAIL, 

    COURSE_SINGLE_REQUEST,
    COURSE_SINGLE_SUCCESS,
    COURSE_SINGLE_FAIL,

    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,

    COURSE_DELETE_REQUEST,
    COURSE_DELETE_SUCCESS,
    COURSE_DELETE_FAIL

} from '../constants/course'

export const courseListReducer = (state={courses : []}, action)=>{
    switch(action.type){
        case COURSE_LIST_REQUEST :
            return {loading :true, courses:[]}
        case COURSE_LIST_SUCCESS :
            return {loading: false, courses: action.payload} 
        case COURSE_LIST_FAIL :
            return {loading: false, error: action.payload}   
        default:
            return state
    }
   
}

export const courseSingleReducer = (state={course: {}}, action)=>{
    switch(action.type){
        case COURSE_SINGLE_REQUEST :
            return {loading :true, ...state}
        case COURSE_SINGLE_SUCCESS :
            return {loading: false, course: action.payload} 
        case COURSE_SINGLE_FAIL :
            return {loading: false, error: action.payload}   
        default:
            return state
    }
   
}

export const courseFilterUserReducer = (state={courses : []}, action)=>{
    switch(action.type){
        case COURSE_FILTER_BY_USER_LIST_REQUEST :
            return {loading :true, courses:[]}
        case COURSE_FILTER_BY_USER_LIST_SUCCESS :
            return {loading: false, courses: action.payload} 
        case COURSE_FILTER_BY_USER_LIST_FAIL :
            return {loading: false, error: action.payload}   
        default:
            return state
    }
   
}

export const courseAddReducer = (state={}, action)=>{
    switch(action.type){
        case COURSE_ADD_REQUEST :
            return {loading :true}
        case COURSE_ADD_SUCCESS :
            return {loading: false, courseInfo: action.payload} 
        case COURSE_ADD_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
}

export const courseUpdatereReducer = (state={course:{}}, action)=>{
    switch(action.type){
        case COURSE_UPDATE_REQUEST :
            return {loading :true}
        case COURSE_UPDATE_SUCCESS :
            return {loading: false, success: true} 
        case COURSE_UPDATE_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
   
}

export const courseDeleteReducer = (state={}, action)=>{
    switch(action.type){
        case COURSE_DELETE_REQUEST :
            return {loading :true}
        case COURSE_DELETE_SUCCESS :
            return {loading: false, success: true} 
        case COURSE_DELETE_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
}