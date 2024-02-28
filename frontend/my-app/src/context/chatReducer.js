import { ADD_MESSAGE,TOGGLE_CHAT, ADD_HISTORY} from './chatActions'

export const chatReducerx = ( state = {messages : [], isChatOpen : Boolean, history:[]} , action)=>{
    switch(action.type){
        case ADD_MESSAGE :
            return {
                ...state,
            messages : [...state.messages, action.payload.message] 
                 } 
        case ADD_HISTORY :
            return {
            ...state, 
            messages :  action.payload.history
                } 
        case TOGGLE_CHAT : 
            return {
                ...state,
                isChatOpen : action.payload.isOpen
            }          
       default:
            return {...state}
            
}}