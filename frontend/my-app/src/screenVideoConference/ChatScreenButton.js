import React from 'react'
import {Col, Row, Button, Form} from 'react-bootstrap'

const ChatScreenButton = ({onClick}) => {
 
  return (
    <div className='videoChatSendStyle' >
        <i onClick={onClick} className="fa fa-comments" aria-hidden="true" ></i>
    </div>
  )
}

export default ChatScreenButton