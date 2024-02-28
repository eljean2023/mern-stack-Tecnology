import React, { useContext, useState, useEffect, useReducer} from 'react'
import {Form, Button} from 'react-bootstrap'
//import { RoomContext } from '../context/RoomContext';
import {RoomContext} from '../../context/RoomContext'
import {useParams } from 'react-router-dom';
import {chatReducerx} from "../../context/chatReducer"
import {addMessageAction, addHistoryAction, toggleChatAction} from "../../context/chatActions"
import ChatBubble from '../../context/ChatBubblex'

import Modal from 'react-bootstrap/Modal';

const ChatInput = ({users}) => {
    const [message, setMessage] = useState("")
    const {userNamex} = useContext(RoomContext)
    const {me, ws} = useContext(RoomContext)
    const [show, setShow] = useState(false);
    const [chat, dispatch] = useReducer(chatReducerx,{
      messages : [],
      //isChatOpen : false
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id} = useParams()

    useEffect(()=>{
               ws.on("add-message",  addMessage)
               ws.on("get-messages", (messages)=>console.log({messages}))
               ws.on("get-messages", addHistory)
               return () =>{
                ws.off("add-message")
                ws.off("get-messages")
                ws.off("connection")
                ws.off("join-room")
              }     
          
    }, [id,ws,])


/********************************************** */
   let userNameUlti = ''

    if(userNamex){
      userNameUlti = userNamex
    }

    const sendMessage = (message)=>{
      const messageData = {
          content : message,
          timestamp : new Date().getTime(),
          author : me?.id,
          userx : userNameUlti  
      }
      console.log(messageData.author, messageData.userx)

      dispatch(addMessageAction(messageData))
      if (me)  ws.emit("send-message", {roomId : id}, messageData)
  }

const addMessage = (message)=>{
  dispatch(addMessageAction(message))
}

/************************************************** */



const addHistory = (messages)=>{
  dispatch(addHistoryAction(messages))
} 


useEffect(()=>{
},[message]) 

  return (
    <div>
     <div>
    <Form onSubmit={(e)=>{
      e.preventDefault()
        sendMessage(message)
        setMessage("")
    }}>
      <div className='contenChatx'>
      <div >
       
      </div>

      <div className='videoChatSendStyle btn-textArea'> 
        <div className='fixedChat'> 
          <textarea className='border rounder ' 
          onChange={(e)=>setMessage(e.target.value)}
          value={message} placeholder="Type message.." required/> 
    
          <Button className='btn-button animate__animated animate__flash animate__infinite	infinite animate__delay-1s	10s animate__slower' variant='' 
          type="submit">Send</Button>
                
          </div>  
      </div>
      
      {chat.messages.map((message, index)=>(
                <ChatBubble message={message} key={index}/>  
            ))
            }
      </div>
      
 
    <Modal show={show} onHide={handleClose}   centered>
        <Modal.Header closeButton className='chatTitle'>
          <Modal.Title className='chatTitlex'>Chat <i className="fa fa-comments" aria-hidden="true"></i> </Modal.Title>
        </Modal.Header>
        <Modal.Body className='chatTitle'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              {chat.messages.map((message, index)=>(
                <ChatBubble message={message} key={index}/>  
                ))
                }
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>  </Form.Label>
              <div className='txtAreaAndSendbtn'>
              <div>
              <Form.Control as="textarea" rows={2}  
              onChange={(e)=>setMessage(e.target.value)}
              value={message} placeholder="Type message.." required/> 
              </div>
              <div>
              <Button className='btn-button animate__animated animate__flash animate__infinite	infinite animate__delay-1s	10s animate__slower' variant='' 
              type="submit">Send</Button>
              </div>
              </div>
             
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='chatTitle'>
         
          <Button  variant="primary" onClick={handleClose} className='btn-danger mb-4 chatBntClose'>
          Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    <i className="fa fa-user-plus" aria-hidden="true"></i>
    </div>
    <Button variant="primary" onClick={handleShow} className='ChatExtra'>
    <i className="fa fa-comments" aria-hidden="true"> Chat </i>
    </Button>
    
    </div>
  )
}
export default ChatInput