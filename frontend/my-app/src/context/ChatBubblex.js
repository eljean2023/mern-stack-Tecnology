import React, {useContext} from 'react'
import { RoomContext } from './RoomContext';
import {Button} from 'react-bootstrap'

const ChatBubble = ({message}) => {
  console.log({message})
  const {me} = useContext(RoomContext)

  /* const [ users, dispatch] = useReducer(userVideoReducerx,{})
  const author = message.author && users[message.author] 
  const userNamex = author?.userNamex || "Anonimous"  */

  const isSelf = message.author === me?.id
  const time = new Date(message.timestamp).toLocaleTimeString()
  const {userx} = message

  return (
    <div className='py-2'>
     <div> {isSelf ? <div className='float-right'> you : </div>: userx } </div>
      {isSelf ? <Button className='float-right' >{message.content}  <br/>  <p className='chatTime'> at : {time} </p> </Button> : <Button className='float-left'> {message.content} <div className='chatTime'> <br/> at : {time} </div></Button>}
      <hr className='lineSepare'/>
    </div>
  )
}

export default ChatBubble