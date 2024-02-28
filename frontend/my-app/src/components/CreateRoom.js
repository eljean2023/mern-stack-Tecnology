import React, { useContext, useEffect } from 'react'
import {Button} from 'react-bootstrap' 
import {RoomContext} from '../context/RoomContext'
import {useNavigate, useParams} from 'react-router-dom'


const CreateRoom = (history) => {
  const {id} = useParams()
  const {ws} = useContext(RoomContext)
   const navigate = useNavigate()
  const enterRoom = ({roomId}) =>{
     navigate(`/joinRoomx/${roomId}`)
        console.log(roomId)
    }
   
   const join = ({roomId}) =>{
    ws.emit('create-room', enterRoom)
    navigate(`/joinRoomx/${roomId}`)
    //navigate(`/room/${id}`)
    
  }
  useEffect(()=>{
    ws.on("room-create", enterRoom)
}, [history])

    return (
    <div className='ChatFrontend'>
      <div class="shadow-lg ">
      <div>
        <Button className='btn-success' onClick={join}>Crate new meeting </Button>
    </div>
    </div>
    </div>
  )
}

export default CreateRoom