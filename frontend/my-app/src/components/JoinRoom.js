import React, {useContext, useRef, useState, useEffect} from 'react'
import { RoomContext } from '../context/RoomContext';
import {useNavigate, useParams} from 'react-router-dom'
import VideoPlayerRoom from '../components/VideoPlayerRoom';
import addNotification from 'react-push-notification'
import { Notifications } from 'react-push-notification';
import myLogo from '../images/myLogo.jpg'
import { Button, Form} from 'react-bootstrap'


const JoinRoom = () => {
    const {ws,me, userNamex, setUserNamex, status, setStatus,statusSpecial, setStatusSpecial,setStatusSpecial2,statusSpecial2, stream} = useContext(RoomContext)
    const [copySuccess, setCopySuccess] = useState("")
    const [streamx, setStreamx] = useState(false)
   // var [enabledStream, setenbledStream] = useState(localStorage.getItem("enabledStream") || "")
    const textAreaRef = useRef(null)
    const navigate = useNavigate()
    const {id} = useParams() 

    const joinRoom = ()=>{
        navigate(`/room/${id}`)  
        {/*, <Notifications name={userNamex}/>*/}
    }
    const url = window.location.pathname + `/room/${id}`;
   //navigator.clipboard.writeText(url);

    async function copyToClip() {
      //await navigator.clipboard.writeText(window.location.href);
        setCopySuccess("Copied");
    }

    const HandleNotifications = ()=>{
      ws.emit("check", {
        senderNane : userNamex,
        receiverName : "Host"
      })
    }

  {/*

*/}

var enabledStream; 
 const playStop = () =>{
  if(!stream) return 
      enabledStream = stream.getVideoTracks()[0].enabled;
  if(enabledStream){
     stream.getVideoTracks()[0].enabled=false
  }
  else{
      stream.getVideoTracks()[0].enabled=true
    }}

  var enabledAudio;

  const muteunmute = () =>{
      enabledAudio = stream.getAudioTracks()[0].enabled;
    if(enabledAudio){
        stream.getAudioTracks()[0].enabled=false;
      }
      else{
          stream.getAudioTracks()[0].enabled=true;
      }
   }



  /*
      const ClickNotification  = () =>{
          addNotification({
              title   : 'participant is waiting',
              message  : navigate(`/room/${id}`),
              duration : 4000,
              icon     : myLogo,
             
              onClick: ()=>window.location = navigate(`/room/${id}`, ClickNotification())
              
          })
      }
*/

const testOne = () => {
  if(statusSpecial !== statusSpecial2){
    return navigate(`/room/${id}`)
  }
 
}

  return (
    <div class="shadow-lg p-3 mb-5 bg-body rounded">
          <h1 className='text-center'>Welcome</h1>
    <>

    <Notifications />
    <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className='joinRoomName'>
        <div>
        <Form.Control type="text"  
        input placeholder='Enter your Name' link='link' 
        onChange={(e)=>setUserNamex(e.target.value)}
        value={url}  hidden
        />
        
        <button onClick={copyToClip} className="btn btn-secondary" > 
         
          {copySuccess ? <i className="fa fa-check checkCopy" aria-hidden="true" hidden={url.length<1}> Copied </i> : <i className="fa fa-clone titles animate__animated animate__flash animate__infinite	infinite animate__delay-1s	10s animate__slower" aria-hidden="true" id='CopyLink'> Copy your link </i> }
          </button>

        </div>
        <div className='txtInputJoinRoom'>
        <input type="text"  placeholder='Enter your Name' name='userNamex' 
        onChange={(e)=>setUserNamex(e.target.value)}
        value={userNamex}
        />
        <button onClick={joinRoom} className="btn btn-secondary checkCopy" hidden={userNamex.length<1}>Go</button>
        {/*<button onClick={ClickNotification} className="btn btn-secondary" >Notify</button>*/}
         {/*
         <button onClick={()=>HandleNotifications()} className="btn btn-secondary" >Notify</button>
         */}
        </div>
        <div>

        <input type="text"  placeholder='Enter your Status' name='status' 
        onChange={(e)=>setStatus(e.target.value)}
        value={status} hidden
       
        />

          {/*
          
          
          <input type="text"  placeholder='Partipants Code' name='statusSpecial' className='marcax'  
            onChange={(e)=>setStatusSpecial(e.target.value)} hidden={status.length<1}
            value={statusSpecial}
          />


          */}
        

        <button onClick={joinRoom} className="btn btn-secondary checkCopy" hidden={userNamex.length<1}> </button>
        {/*<button onClick={ClickNotification} className="btn btn-secondary" >Notify</button>*/}
        </div>
        </div>
        <div className="VideoWaitingRoom">
           {/*
           {
           
              
              stream ? <VideoPlayerRoom stream={stream}/> : <div className='avatar'><i class="fa fa-user-circle" aria-hidden="true" ></i><div className='avatarName'> {userNamex} </div>  </div>
            }
 
            <div className='videoTools'>
            {enabledAudio ? <button onClick={muteunmute} className="btn btn-primary btn-block" ><i className="fa fa-microphone famicroyvi" aria-hidden="true"></i></button>: 
            <button onClick={muteunmute} className="btn btn-primary btn-block" ><i className="fa fa-microphone-slash famicroyvi" aria-hidden="true"></i></button>
            }

            {enabledStream ? <button onClick={playStop} className="btn btn-primary" > <i  className="fa fa-video-slash famicroyvi" aria-hidden="true"></i></button> : <button onClick={playStop} className="btn btn-primary btn-block" >{userNamex} / {status}  <i  className="fa fa-video-slash famicroyvi" aria-hidden="true"></i></button> }

          </div>
            */
           }

            {/* <Button onClick={testOne} variant="success"  hidden={status !== "Host"}> Join Room </Button> */}
           
          </div>
          
    </form>
         {/*
          <i class="fa fa-microphone-slash " aria-hidden="true"></i>
          <i class="fa fa-video-slash" aria-hidden="true"></i>
        <li><i class="fa fa fa-spinner fa-spin"></i>as bullets</li>
          <div><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          <div><span class="sr-only">Loading...</span></div>
          </div>
         */}
         
    </>
    </div>
  )
}

export default JoinRoom