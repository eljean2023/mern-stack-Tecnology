import React, {useReducer} from 'react'
import ChatBubble from '../../context/ChatBubblex'
import ChatInput from './ChatInputx'
import {chatReducerx} from "../../context/chatReducer"

const Chat = ({}) => {
    const [chat] = useReducer(chatReducerx,{
        messages : [],
      })
  return (
    <div className='flex'>
        <div>
         {/*

        {chat.messages.map((message, index)=>(
                <ChatBubble message={message} key={index}/>
            ))
            }        
        */}
        </div>
        <div>
        <ChatInput/>     
        </div>
        
    </div>
  )
}

export default Chat