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

import axios from 'axios'

export const coursesActions = ()=>async(dispatch)=>{
    try {
    dispatch({type: COURSE_LIST_REQUEST})
    const {data} = await axios.get('/api/allCourses')
    dispatch({type: COURSE_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: COURSE_LIST_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const courseSingleActions = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: COURSE_SINGLE_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
   /*
    const config = {
        headers : {
            //'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }  
    }*/
    const {data} = await axios.get(`/api/singleCourse/${id} `, {headers})
    dispatch({type: COURSE_SINGLE_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: COURSE_SINGLE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const courseUserActions = ()=>async(dispatch, getState)=>{
    try {
    dispatch({type: COURSE_FILTER_BY_USER_LIST_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const headers = { 'authorization': `${userInfo.token}` };
   /*
    const config = {
        headers : {
            //'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }  
    }*/
    const {data} = await axios.get('/api/courseByUserLogin', {headers})
    dispatch({type: COURSE_FILTER_BY_USER_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type: COURSE_FILTER_BY_USER_LIST_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }

}


export const courseAddAction = (name, link/*title, category, price, filename */)=>async(dispatch, getState)=>{
    try {
    dispatch({type: COURSE_ADD_REQUEST})
    const {userlogin : {userInfo}} = getState()
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }

    const {data} = await axios.post('/api/newCourse', {link, name/*title, category, price, filename */}, config)
    
    dispatch({type: COURSE_ADD_SUCCESS, payload : data})

    dispatch({type: COURSE_ADD_SUCCESS, payload : data})

    localStorage.setItem('courseInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({type: COURSE_ADD_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const courseUpdateAction = (course)=>async(dispatch, getState)=>{
    try {
    dispatch({type: COURSE_UPDATE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
        
    }

    const {data} = await axios.put(`/api/upgradeCourse/${course._id}`,course, config)
    
    dispatch({type: COURSE_UPDATE_SUCCESS})

    dispatch({type: COURSE_SINGLE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: COURSE_UPDATE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}


export const courseDeleteAction = (id)=>async(dispatch, getState)=>{
    try {
    dispatch({type: COURSE_DELETE_REQUEST})

    const {userlogin : {userInfo}} = getState()
    /*const headers = { 'authorization': `${userInfo.token}` }*/
   
    const config = {
        headers : {
            'Content-Type':'application/json',
            authorization : `${userInfo.token}`
        }
    }
    

    const {data} = await axios.delete(`/api/deleteCourse/${id}`,config)
    
    dispatch({type: COURSE_DELETE_SUCCESS, payload : data})

    } catch (error) {
        dispatch({type: COURSE_DELETE_FAIL,
        payload : error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })    
    }
}