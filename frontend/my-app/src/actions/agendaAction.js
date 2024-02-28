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

import axios from 'axios'

export const agendasActions = ()=>async(dispatch)=>{
    try {
    dispatch({type: AGENDA_LIST_REQUEST})
    const {data} = await axios.get('/api/allAgendas')
    dispatch({type: AGENDA_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: AGENDA_LIST_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const agendaSingleActions = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: AGENDA_SINGLE_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
   /*
    const config = {
        headers : {
            //'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }  
    }*/
    const {data} = await axios.get(`/api/singleAgenda/${id} `, {headers})
    dispatch({type: AGENDA_SINGLE_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: AGENDA_SINGLE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const agendaUserActions = ()=>async(dispatch, getState)=>{
    try {
    dispatch({type: AGENDA_FILTER_BY_USER_LIST_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
   /*
    const config = {
        headers : {
            //'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }  
    }*/
    const {data} = await axios.get('/api/agendaByUserLogin', {headers})
    dispatch({type: AGENDA_FILTER_BY_USER_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: AGENDA_FILTER_BY_USER_LIST_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const agendaAddAction = (name,link/* hour,date,country,statex,address,status,description,pricex,filename */)=>async(dispatch, getState)=>{
    try {
    dispatch({type: AGENDA_ADD_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }

    const {data} = await axios.post('/api/newAgenda', {name,link/* hour,date,country,statex,address,status,description,pricex,filename */}, config)
    
    dispatch({type: AGENDA_ADD_SUCCESS, payload : data})

    localStorage.setItem('agendaInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({type: AGENDA_ADD_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const agendaUpdateAction = (agenda)=>async(dispatch, getState)=>{
    try {
    dispatch({type: AGENDA_UPDATE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
        
    }

    const {data} = await axios.put(`/api/upgradeAgenda/${agenda._id}`,agenda, config)
    
    dispatch({type: AGENDA_UPDATE_SUCCESS})

    dispatch({type: AGENDA_SINGLE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: AGENDA_UPDATE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const agendaDeleteAction = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: AGENDA_DELETE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    /*const headers = { 'authorization': `${userInfo.token}` }*/
   
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }
    

    const {data} = await axios.delete(`/api/deleteAgenda/${id}`,config)
    
    dispatch({type: AGENDA_DELETE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: AGENDA_DELETE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}