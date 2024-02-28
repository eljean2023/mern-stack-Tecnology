import React, { useEffect, useState, useReducer, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import VideoPlayerRoom from '../components/VideoPlayerRoom';
import {userVideoReducerx} from '../context/userVideoReducer'
import {chatReducerx} from "../context/chatReducer"
import {toggleChatAction} from "../context/chatActions"
import {addUserVideoAction, addUserNameAction, addAllUsers} from '../context/userVideoAction'
import {Button} from 'react-bootstrap'
import ChatBubble from '../context/ChatBubblex';
import ChatInput from '../components/chat/ChatInputx';

import addNotification from 'react-push-notification'
import { Notifications } from 'react-push-notification';
import myLogo from '../images/myLogo.jpg'

import SendNotifi from './SendNotifi';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ShareScreenButton from './ShareScreenButton'
import ChatScreenButton from './ChatScreenButton'

import Chat from '../components/chat/Chat'
import { Socket } from 'socket.io-client';

const mystyle = {
  backgroundColor: "rgba(0, 0, 0, 0.962)",
};

const RoomScreen = () => {
    const [allParticipants, setAllParticipants] = useState([])
    const {id} = useParams()
    const {ws, me, stream, ShareScreen, screenSharingId, setRoomId, userNamex, status, setStatus} = useContext(RoomContext)
    const [notificationsx, setNotificationsx] = useState([])
    const [ users, dispatch] = useReducer(userVideoReducerx,{})
    const [chat, chatDispatch] = useReducer(chatReducerx,{
      //messages : [],
      isChatOpen : true
    })
    const navigate = useNavigate()
   
const getUsers = ({participants})=>{
   console.log(participants)
    dispatch(addAllUsers(participants))
    setAllParticipants(participants)
}    

//console.log({users})

  // code to refresh page goes here

useEffect(()=>{
  
   if (me && stream)
    ws.emit("join-room", {roomId : id, userId :me._id, userNamex})
           ws.on("get-users", getUsers)
           return () =>{
            
            ws.on("connection")
           }
}, [id,ws, stream, userNamex, me])

useEffect(()=>{
  if(!me) return
  if(!stream) return
  ws.on("user-joined", ({userId, userNamex})=>{
    
    dispatch(addUserNameAction(userId, userNamex))

      const call = me?.call(userId, stream, {
        metadata : {
          userNamex
        }
      })
      
      call.on("stream", (userStream)=>{
        if(!stream) return
        if(!userStream) return
          dispatch(addUserVideoAction(userId, userStream)) 
       
      })
  })
  me.on("call", (call)=>{
    const {userNamex} = call.metadata
    dispatch(addUserNameAction(call.user, userNamex))
      call.answer(stream)
      call.on("stream", (userStream)=>{
        //ws.on("add-message", addMessage )
        if(!stream) return
        if(!userStream) return
          dispatch(addUserVideoAction(call.user, userStream)) 
      })
     // ws.on("add-message", addMessage )
  })

  return () =>{
    ws.off("user-joined")
        }   

}, [/*stream, userNamex, me, */, ws, users,])

useEffect(()=>{
  ws.on("getNotifications", (data)=>{
    setNotificationsx((prev)=>[...prev, data])
})
},[ws])

console.log(notificationsx)

const screenSharingVideo = 
screenSharingId === me?.id ? stream : users[screenSharingId] ?.stream

const {[screenSharingId]:sharing, ...usersToShow} = users


const toggleChat = (e) =>{
  chatDispatch(toggleChatAction(!chat.isChatOpen))
  e.preventDefault()
}

if(!userNamex || userNamex == " " || userNamex == null){
  navigate(`/participantsR/${id}`)
}




  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      
      {Object.values(users).map(element => {
				  return <h6 style={{color: "white"}}  key={element}>{element.userNamex}

          </h6>;
			    })}
    </Tooltip>
  );

  
  const roomAccess = (id) =>{
    if(window.confirm(`The participant ${userNamex} is waiting for your authorization `)){
      if(!me) return
      if(!stream) return
      ws.on("user-joined", ({userId, userNamex})=>{
        dispatch(addUserNameAction(userId, userNamex))
          const call = me.call(userId, stream, {
            metadata : {
              userNamex
            }
          })
          if(window.confirm(`The participant ${userNamex} is waiting for your authorization `)){
            call.on("stream", (userStream)=>{
              dispatch(addUserVideoAction(userId, userStream)) 
              
          })
          }
      })
      me.on("call", (call)=>{
        const {userNamex} = call.metadata
        dispatch(addUserNameAction(call.user, userNamex))
          call.answer(stream)
          call.on("stream", (userStream)=>{
            //ws.on("add-message", addMessage )
              dispatch(addUserVideoAction(call.user, userStream)) 
    
          })
         // ws.on("add-message", addMessage )
      })
    }    
  }

  

/*
 function addNotificationx(e){
      //e.preventDefault()
  return addNotification({
    title   : 'Bawool',
    message  : `Esta en esperax ${userNamex}`,
    duration : 150000,
    icon     : myLogo,
      onClick: ()=>window.location = navigate(`/room/${id}`)
  })
  
}

*/

const arr = [];

const values = notificationsx;

values.forEach(value => {
  if (!arr.includes(value)) {
    arr.push(value);
  }
});


const ClickNotification  = () =>{
  addNotification({
      title   : 'Bawool',
      message  : `Esta en espera ${userNamex}`,
      duration : 150000,
      icon     : myLogo,
      /*onClick: ()=>window.location = navigate(`/room/${id}`, ClickNotification()) */
  })
}

{/*

useEffect(()=>{
  ws.on("getNotifications", (data)=>{
    setNotificationsx((prev)=>[...prev, data])
  })
}, [ws])
*/}

/*
const HandleNotifications = ()=>{
  if(status === "Host"){
    ws.on("connection", alert("alguien esta esperando"))
  }
}
*/

const HandleNotifications = ()=>{
  const data = {name: userNamex, userId: ws.id, receiverName : status};
  if(!ws.ws){
    ws.emit("sendNotification", data)
  }
  console.log(data)
}

const checkNow = () =>{
  alert("hi there")
}

const displayNotification = (userNamex)=>{
    addNotification({
      title: 'Warning',   
      message  : `Esta en espera ${userNamex}`,
      duration : 150000,
      icon     : myLogo,
      onClick : ()=>checkNow()
      /*onClick: ()=>window.location = navigate(`/room/${id}`, ClickNotification()) */
  })
  {
    /*
    if(window.confirm(`The participant ${userNamex} is waiting for your authorization `)){
    navigate(`/room/${id}`)
    */
  }
  
 
}
    
  //(window.confirm(`The participant ${senderNane} is waiting for your authorization `))
  //alert("hi there")


  return (
    <div className="container">
       <div style={mystyle}> 
    <div className='allUsersDisplayed'>   
    <h5 className='roomId'>Room Id : {id} </h5>
    <div>
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="success">Participants <span>{Object.values(users).length} </span> </Button>
    </OverlayTrigger>
    </div>
    </div>
   

    <div className="row">
    <div className="col-md-8">
    <div className="video">
    <div className='flex' >
      {screenSharingVideo && (
      <div className='w-4/5 pr-4'>
            <VideoPlayerRoom stream={screenSharingVideo} />
        </div>
      )}
      <div className={`flex grid gap-4 ${
        screenSharingVideo ? "w-1/5 grid-col-1" : "grid-cols-4"
      }`}>
      
        <div className=" ">
            {screenSharingId !== me?.id && <VideoPlayerRoom stream={stream}/>} 
            <Button onClick={roomAccess} variant="success"  hidden={status !== "Host"}  > Try it Out </Button>
            <div className='userVideo'>{userNamex}</div>
          </div>
            
       {Object.values(usersToShow).filter(user => !!user.stream).map((user , index)=>(
        
        <div key={index}>
          
          <div className="">
          
          <VideoPlayerRoom stream={user.stream} userNamex={user.userNamex} />
          
          <div  className='userVideo'>{user.userNamex}
          
          <div className="marca">
          <input type="text"  placeholder='Enter your Name' name='status'  
            onChange={(e)=>setStatus(e.target.value)} disabled hidden={status.length<1}
            value={status}
          />
          </div>
          </div>
          </div>



         {/*
         {
          Object.values(users.map((user)=>(
            user.userNamex
          ))
          )}
         */}
          
        </div>
       ))
      }
</div>
     
       </div>
      </div>
    </div>
   
   {chat.isChatOpen && ((
    <div className="col-md-4">
    <div className='Col-md videoChatStyle' > 
       <div className='col-sm-4 chatMessage '> 
       <Chat/> 
    </div>
    </div>
    <button onClick={ClickNotification} className="btn btn-secondary" >Notify</button>
    <button onClick={()=>HandleNotifications()} className="btn btn-secondary" >Notify last</button>
    <button onClick={()=>displayNotification()} className="btn btn-secondary" >Display Notification</button>
    <Button onClick={roomAccess} variant="success"> Access </Button>
    </div>
   ))}
    

    {
      /*
      
      <div className="col-sm-4">
    <div className='Col-md videoChatStyle' > 
       <div className='chatMessage '> 
       <Chat/> 
    </div>
    </div>
    </div>
      
      */
    }

  <Notifications />
  
    <hr className='lineSepare'/>
    <div className='videoChatTools'>
    <div className='sharescrenButton '>
      <ShareScreenButton onClick={ShareScreen}/>
    </div>
    <div className='sharescrenButton  chatMessage'>
   
       <ChatScreenButton onClick={toggleChat} />
      
    </div>
    
    </div>
    <hr className='lineSepare'/>
    
  </div>

</div>
      <div>
        
        {arr.map((n)=>displayNotification(n))}
        
      </div>

</div>



  )
}

export default RoomScreen

