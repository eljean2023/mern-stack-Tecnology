import {
    AGENDA_LIST_REQUEST, 
    AGENDA_LIST_SUCCESS, 
    AGENDA_LIST_FAIL,

    AGENDA_ADD_REQUEST,
    AGENDA_ADD_SUCCESS,
    AGENDA_ADD_FAIL,

    AGENDA_FILTER_BY_USER_LIST_REQUEST,
    AGENDA_FILTER_BY_USER_LIST_SUCCESS,
    AGENDA_FILTER_BY_USER_LIST_FAIL,

    AGENDA_SINGLE_REQUEST,
    AGENDA_SINGLE_SUCCESS,
    AGENDA_SINGLE_FAIL,

    AGENDA_UPDATE_REQUEST,
    AGENDA_UPDATE_SUCCESS,
    AGENDA_UPDATE_FAIL,

    AGENDA_DELETE_REQUEST,
    AGENDA_DELETE_SUCCESS,
    AGENDA_DELETE_FAIL

} from '../constants/agenda'

export const agendaListReducer = (state={agendas : []}, action)=>{
    switch(action.type){
        case AGENDA_LIST_REQUEST :
            return {loading :true, agendas:[]}
        case AGENDA_LIST_SUCCESS :
            return {loading: false, agendas: action.payload} 
        case AGENDA_LIST_FAIL :
            return {loading: false, error: action.payload}   
        default:
            return state
    }
   
}

export const agendaSingleReducer = (state={agenda: {}}, action)=>{
    switch(action.type){
        case AGENDA_SINGLE_REQUEST :
            return {loading :true, ...state}
        case AGENDA_SINGLE_SUCCESS :
            return {loading: false, agenda: action.payload} 
        case AGENDA_SINGLE_FAIL :
            return {loading: false, error: action.payload}   
        default:
            return state
    }
   
}

export const agendaFilterUserReducer = (state={agendas : []}, action)=>{
    switch(action.type){
        case AGENDA_FILTER_BY_USER_LIST_REQUEST :
            return {loading :true, agendas:[]}
        case AGENDA_FILTER_BY_USER_LIST_SUCCESS :
            return {loading: false, agendas: action.payload} 
        case AGENDA_FILTER_BY_USER_LIST_FAIL :
            return {loading: false, error: action.payload}   
        default:
            return state
    }
   
}

export const agendaAddReducer = (state={}, action)=>{
    switch(action.type){
        case AGENDA_ADD_REQUEST :
            return {loading :true}
        case AGENDA_ADD_SUCCESS :
            return {loading: false, agendaInfo: action.payload} 
        case AGENDA_ADD_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
}

export const agendaUpdateReducer = (state={agenda:{}}, action)=>{
    switch(action.type){
        case AGENDA_UPDATE_REQUEST :
            return {loading :true}
        case AGENDA_UPDATE_SUCCESS :
            return {loading: false, success: true} 
        case AGENDA_UPDATE_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
   
}

export const agendaDeleteReducer = (state={}, action)=>{
    switch(action.type){
        case AGENDA_DELETE_REQUEST :
            return {loading :true}
        case AGENDA_DELETE_SUCCESS :
            return {loading: false, success: true} 
        case AGENDA_DELETE_FAIL :
            return {loading: false, error: action.payload}  
        default:
            return state
    }
}