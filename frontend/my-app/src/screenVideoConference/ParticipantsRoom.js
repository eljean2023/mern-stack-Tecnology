import React, {useContext, useRef, useState, useEffect} from 'react'
import { RoomContext } from '../context/RoomContext';
import {useNavigate, useParams} from 'react-router-dom'

const ParticipantR = ({addNewMessage}) => {
    const {ws,me, userNamex, setUserNamex,userInvited, status, setStatus,status2,setStatus2,statusSpecial, statusSpecial2,setStatusSpecial, setStatusSpecial2} = useContext(RoomContext)
    const [copySuccess, setCopySuccess] = useState("")
    const textAreaRef = useRef(null)
    const navigate = useNavigate()
    const {id} = useParams() 

    const joinRoom = ()=>{
        navigate(`/room/${id}`)
       
    }
    const url = window.location.href;
   //navigator.clipboard.writeText(url);

    async function copyToClip() {
      //await navigator.clipboard.writeText(window.location.href);
        setCopySuccess("Copied");
        console.log(setCopySuccess("Copied"));
        
    }
    
const textMessage = () =>{
  ws.on("hiThere", (data)=>{
    console.log(data)
})
}

/*

useEffect(()=>{
  ws.on("hiTherex", ()=>{
    console.log("Hi there")
})
},[ws])
*/


const HandleNotifications = ()=>{
  const data = {name: userNamex, userId: ws.id, receiverName : status};
  ws.emit("sendNotification", data)
  console.log(data)
}

    /*
    const HandleNotifications = ()=>{
      ws.emit("sendNotification", {
        status: "Host",
        //socketId : ws.id,
        senderName : userNamex,
        receiverName : ws.id,
        userId : me.id,
        
        
      })
    }
    */
   console.log(ws.id)

  

  return (
  
    <>
    <h1 className='text-center mb-4'>Welcome</h1>
    
    <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className='joinRoomName'>
        <div>
        </div>
        <div>
      
        
        
        <input type="text"  placeholder='Enter your Name' name='userNamex' 
        onChange={(e)=>setUserNamex(e.target.value)}
        value={userInvited}
        />


      {/*
        <input type="text"  placeholder='Enter your Code' name='status' 
        onChange={(e)=>setStatus(e.target.value)}
        value={status}
        />
         

         */}

         <button onClick={textMessage} className="btn btn-secondary" >Probar Mensaje</button>

        <button onClick={joinRoom} className="btn btn-secondary animate__animated animate__flash animate__infinite	infinite animate__delay-1s	10s animate__slower checkCopy " hidden={userNamex.length<1}>Go</button>
        </div>
        {/*<button onClick={()=>HandleNotifications()} className="btn btn-secondary" >Notify</button> */}
        </div>
    </form>

    </>
  )
}

export default ParticipantR