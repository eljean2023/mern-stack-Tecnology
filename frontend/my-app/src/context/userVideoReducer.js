import { ADD_USER_VIDEO, REMOVE_USER_VIDEO, ADD_USER_NAME, ADD_ALL_USERS } from './userVideoAction'

export const userVideoReducerx = ( state = {stream: MediaStream} , action= {stream: MediaStream, userId : String, userNamex: String, users:[]})=>{
    switch(action.type){
        case ADD_USER_VIDEO :
            return {
                ...state,
                [action.payload.userId] : {
                    ...state[action.payload.userId],
                    stream :action.payload.stream
                }
                   }
                   case ADD_USER_NAME :
                    return {
                        ...state,
                        [action.payload.userId] : {
                            ...state[action.payload.userId],
                            userNamex :action.payload.userNamex
                        }
                           }           
        case REMOVE_USER_VIDEO :
            return {
                ...state,
                [action.payload.userId] : {
                    ...state[action.payload.userId],
                    stream : undefined
                }
            }
         case ADD_ALL_USERS : 
            return {...state, ...action.payload.users}
            
        default:
            return {...state}
            
}}