import React, {createContext, useEffect, useState, useReducer} from 'react'
import socketIOClient from 'socket.io-client'
import {useNavigate} from 'react-router-dom'/*
import {userVideoReducerx} from './userVideoReducer'
import {addUserVideoAction} from './userVideoAction'*/
import {userVideoReducerx} from '../context/userVideoReducer'
import {useParams } from 'react-router-dom';
import User from "peerjs"
import { v4 as uuidV4 } from 'uuid'


const WS = "https://mern-stacktecnoapp.onrender.com"

export const RoomContext = createContext()

const ws = socketIOClient(WS)

export const RoomProvider = ({children}) =>{
    const [me, setMe] = useState()
    const [cameraOn, setCameraOn] = useState(false)
    const [stream, setStream] = useState()
    const [screenSharingId, setScreenSharingId] = useState("")
    const [roomId, setRoomId] = useState()
    const [userNamex, setUserNamex] = useState(localStorage.getItem("userNamex") || "")
    const [userInvited, setUserInvited] = useState()
    const [status, setStatus] = useState(localStorage.getItem("status") || "Host")
    const [status2, setStatus2] = useState(localStorage.getItem("status2") || "Participant")
    const [statusSpecial, setStatusSpecial] = useState(localStorage.getItem("statusSpecial") || "None")
    const [statusSpecial2, setStatusSpecial2] = useState(localStorage.getItem("statusSpecial2") || "None2")
    var [ShareScreen, setShareScreen] = useState(localStorage.getItem("ShareScreen") || "ShareScreen")


    /*const [users, dispatch] = useReducer(userVideoReducerx,{})*/
   // const [users, dispatch] = useReducer(userVideoReducerx,{})
   //const navigate = useNavigate()
   const {idx} = useParams()
  
   const enterRoom = ({roomId}) =>{
    //navigate(`/room/${roomId}`)
      //console.log(roomId)
    }
   
/*
const getUsers = ({participants})=>{
    console.log({participants})
}
*/


useEffect(()=>{
    localStorage.setItem("userNamex", userNamex)
  },[userNamex])

  useEffect(()=>{
    localStorage.setItem("status", status)
  },[status])


  useEffect(()=>{
    localStorage.setItem("statusSpecial", statusSpecial)
  },[statusSpecial])

  useEffect(()=>{
    localStorage.setItem("statusSpecial2", statusSpecial2)
  },[statusSpecial2])


useEffect(()=>{
    const savedId = localStorage.getItem("userId")
    const meId = savedId || uuidV4()
    localStorage.setItem("userId", meId)

    const user = new User(meId, {
        host:"localhost",
        port:9001,
        path: "/"
    })
    setMe(user)
   
 /*
    try{
        navigator.mediaDevices
        .getUserMedia({video: true, audio: true})
        .then((stream)=>{
            setStream(stream)
        })
    } catch(error){
        console.error(error)
    }
 */
   

    ws.on("room-create" , enterRoom)
   // ws.on("get-users" , getUsers)
    ws.on("user-started-sharing", (userId)=>setScreenSharingId(userId))
    ws.on("user-stopped-sharing", ()=>{setScreenSharingId("")})
   
    
    //ws.on("user-joined")
   // ws.on("add-message", addMessage)
    


    return () =>{
        ws.off("room-create" , enterRoom)
       // ws.off("get-users" , getUsers)
        ws.off("user-started-sharing", (userId)=>setScreenSharingId(userId))
        ws.off("user-stopped-sharing", ()=>{setScreenSharingId("")})
        //ws.off("add-message")
    } 

}, [])


useEffect(()=>{
  if (screenSharingId) {
    ws.emit("start-sharing",{ userId: screenSharingId, roomId})
  } else {
    ws.emit("stop-sharing")
  }
},[screenSharingId, roomId])


//console.log(roomId)

const switchStream = (stream ) =>{
    setStream(stream)
    setScreenSharingId(me?.id || "")
    Object.values(me?.connections).forEach((connection)=>{
        const videoTrack = stream
        ?.getTrack()
        .find((track)=>track.kind === "video")
        console.log(connection[0].peerConnection.getSenders()[1])
        connection[0].peerConnection
        .getSenders()[1]
        .replaceTrack(videoTrack)
        .catch((err)=>console.error(err))
    })
}

 ShareScreen = () =>{
    if(screenSharingId){
        navigator.mediaDevices
        .getUserMedia({video: true, audio: true})
        .then(switchStream)
    }
    else{
        navigator.mediaDevices.getDisplayMedia({}).then(switchStream)
}
}
/*
const sendMessage = (message)=>{
    const messageData = {
        content : message,
        timestamp : new Date().getTime(),
        author : me?.id,  
    }
   
    if (me)  ws.emit("send-message", {roomId : idx}, messageData)
    console.log("testing el room Idx : " + idx)
    console.log(messageData)
}

const addMessage = (message)=>{
    console.log("new message", message)
}
*/

{/*

const toggleChat = () =>{
    chatDispatch(toggleChatAction(!chatReducerx.isOpen))
}


*/}



 return (
    <div>
     <RoomContext.Provider value={
        {ws, me, stream, setStream,
        ShareScreen, setRoomId, 
        screenSharingId,
        userNamex,
        userInvited,
        setUserNamex,
        status,
        setStatus,
        status2,
        setStatus2,
        statusSpecial,
        setStatusSpecial,
        statusSpecial2, setStatusSpecial2,
        roomId, 
        //users
        //sendMessage,
        //addMessage, 
        //toggleChat
            
        }}> 
        {children} 
     
     </RoomContext.Provider>

     </div>
 )
}