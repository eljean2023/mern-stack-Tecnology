import React, { useEffect, useState, useReducer, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import VideoPlayerRoom from '../components/VideoPlayerRoom';
import {userVideoReducerx} from '../context/userVideoReducer'
import {chatReducerx} from "../context/chatReducer"
import {toggleChatAction} from "../context/chatActions"
import {addUserVideoAction, addUserNameAction, addAllUsers} from '../context/userVideoAction'
import {addHistoryAction} from "../context/chatActions"
import {Button, Fade} from 'react-bootstrap'

import ParticipantR from './ParticipantsRoom';
import Player from '../components/playVideAudi';
import Modal from 'react-bootstrap/Modal';

import {WhatsappShareButton, WhatsappIcon, 
  FacebookShareButton,FacebookIcon,
  TwitterShareButton, TwitterIcon,
  EmailShareButton, EmailIcon,
} from "react-share";

import {useSelector} from 'react-redux'

import addNotification from 'react-push-notification'
import { Notifications } from 'react-push-notification';
import myLogo from '../images/myLogo.jpg'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ShareScreenButton from './ShareScreenButton'
import ChatScreenButton from './ChatScreenButton'

import Chat from '../components/chat/Chat'

import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
    
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: 'black', color: '#FF8008'}}
      onClick={decoratedOnClick}
    >
      {children}
      
    </button>
  );
}


{/*

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

*/}

/************************************************* */
const mystyle = {
  backgroundColor: "black",
};

/*********************************************** */
const LiveScreen = (props) => {
    const [allParticipants, setAllParticipants] = useState([])
    const {id} = useParams()
    const {ws, me, stream, ShareScreen, screenSharingId,roomId,userNamex,userInvited, status, status2, setStatus, statusSpecial, statusSpecial2} = useContext(RoomContext)
    const [notificationsx, setNotificationsx] = useState([])
    const [ users, dispatch] = useReducer(userVideoReducerx,{})
    const [displayAudio, setDisplayAudio] = useState(true); 
    const [displayVideo, setDisplayVideo] = useState(true); 
    const [displayUserVideo, setDisplayUserVideo] = useState(true);
    const [show, setShow] = useState(false);
    const [showScreen, setShowScreen] = useState(false);
    

    var [screenSharingVideo, setScreenSharingVideo] = useState(localStorage.getItem("screenSharingVideo") || "")

    const [access, setAccess] = useState("");

    const [modalShow, setModalShow] = React.useState(false);
    const  onHide=() => setModalShow(false);

    const userLogin = useSelector(state =>state.userlogin)
    const {userInfo} = userLogin

    const [showx, setShowx] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fullscreen, setFullscreen] = useState(true);

    const [chat, chatDispatch] = useReducer(chatReducerx,{
      messages : [],
      isChatOpen : true
      
    })
    const navigate = useNavigate()
 /********************************************************************* */  
const getUsers = ({participants})=>{
        dispatch(addAllUsers(participants))
        setAllParticipants(participants)
        console.log(participants)
}    

{
  /*
    useEffect(()=>{
  ws.on("hiThere", (msg)=>{
    console.log(msg)
  }),[ws]})
  */
}

console.log(MediaStream)

function checkNow(){};

//console.log({users})

  // code to refresh page goes here

useEffect(()=>{
  
   if (me && stream)
    ws.emit("join-room", {roomId : id, userId :me._id, userNamex})
           ws.on("get-users", getUsers)
           return () =>{
            
           //ws.on("connection")

           return () =>{
          
            ws.off("join-room")
            ws.off("stream")
                } 
           }
          
}, [id,ws, stream, userNamex, me])

useEffect(()=>{
  if(!me) return
  if(!stream) return
  ws.on("user-joined", ({userId, userNamex: name})=>{
    dispatch(addUserNameAction(userId, name))
    
      const call = me?.call(userId, stream, {
        metadata : {
          userNamex
        }
      })
      
      call.on("stream", (userStream)=>{
        dispatch(addUserNameAction(userId, userNamex))
        if(!stream) return
        if(!userStream) return
                 dispatch(addUserNameAction(userId, userNamex))
         return dispatch(addUserVideoAction(userId, userStream)) 
          

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
  
  function tesOne (){
    me.on("call", (call)=>{
      const {userNamex} = call.metadata
      dispatch(addUserNameAction(call.user, userNamex))
        call.answer(stream)
        call.on("stream", (userStream)=>{
          //ws.on("add-message", addMessage )
          if(!stream) return
          if(!userStream) return 
          //if(statusSpecial === "woo"){
         /* if(window.confirm(`The participant ${userNamex} is waiting for your authorization`)){*/
                {/*userStream*/} 
               if(statusSpecial !== statusSpecial2){
                  dispatch(addUserVideoAction(call.user, userStream))
                }
                else if(statusSpecial === statusSpecial2){
                  dispatch(addUserVideoAction(call.user, userStream)) 
          
                }
               if(!stream)
               
               setDisplayUserVideo(!displayUserVideo)
              
            //}
           
          //}
        })
        
       // ws.on("add-message", addMessage )
    })
  }

   checkNow(tesOne()) 
  

  return () =>{
    ws.off("user-joined")
    ws.off("stream")
        }   

}, [stream, userNamex, me, userNamex, ws, users])

useEffect(()=>{
  ws.on("getNotifications", (data, e)=>{
    window.location.reload(false)
    e.preventDefault()
    setNotificationsx((prev)=>[...prev, data])   
})
},[ws])


screenSharingVideo = 
screenSharingId === me?.id ? stream : users[screenSharingId]?.stream
const {[screenSharingId]:sharing, ...usersToShow} = users


useEffect(()=>{
  localStorage.setItem("screenSharingVideo", screenSharingVideo)
},[screenSharingVideo])

const toggleChat = ({messages}) =>{
  chatDispatch(toggleChatAction(!chat.isChatOpen))
  {/*console.log(chatDispatch(addHistoryAction(messages)))*/}
  
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

}

const displayNotification = (userNamex)=>{
    addNotification({
      title: 'Warning',   
      message  : `The participant ${userNamex} raised his hand`,
      duration : 150000,
      icon     : myLogo,
      onClick : ()=>checkNow()
      /*onClick: ()=>window.location = navigate(`/room/${id}`, ClickNotification()) */
  })
  
 
}
    
/********************************************************* */

/*

useEffect(()=>{
  if(!stream) return 
  enabledStream = stream.getVideoTracks()[0].enabled;
  //stream.getVideoTracks()[0].enabled=false
}, [stream])

*/

var enabledStream; 

 const playStop = () =>{
 
      enabledStream = stream?.getVideoTracks()[0].enabled;
  if(enabledStream){
     stream.getVideoTracks()[0].enabled=false
     setDisplayVideo(!displayVideo) 
     
  }
  else{
      stream.getVideoTracks()[0].enabled=true
      setDisplayVideo(!displayVideo)
    
    }}

  var enabledAudio;

  const muteunmute = () =>{
      enabledAudio = stream?.getAudioTracks()[0].enabled;
    if(enabledAudio){
        stream.getAudioTracks()[0].enabled=false;
        setDisplayAudio(!displayAudio)
      }
      else{
          stream.getAudioTracks()[0].enabled=true;
          setDisplayAudio(!displayAudio)
      }
   }

   var audioTruex = stream?.getAudioTracks()[0]?.enabled
   var videoTruex = stream?.getVideoTracks()[0]?.enabled
   var videoUserTruex = stream?.getVideoTracks()[0]?.enabled
   


/**********************************************************/

{/*

const displayToggle  = () =>{
  setDisplayStream(!displayStream)
}

*/}


function textMessage() { }


  useEffect(()=>{
      ws.on("disconnect", ({userId})=>{
       
      },[])})

textMessage()


const addNewMessage = (message)=>{
     
}

const shareUrl= "https://google.com"


const handleAccess=()=>{

    setAccess(!access ? "Hi" : "There")

  }


/**************************************************************************** */


/************************************************************************** */


const refresh = (e) => {
 
  dispatch(addUserVideoAction(window.location.reload(e.preventDefault())))
  e.preventDefault()
  
}


function refresssh(e){
  e.preventDefault()
  dispatch(addUserVideoAction(window.location.reload(e.preventDefault())))
   e.preventDefault()
}

  return (
    <div className="shadow-lg shadowvideo">
      {/*
      
      <Button onClick={refresh} > Action </Button>
      
      */}
 
    <div className="container">
       <div style={mystyle}> 
    <div className='allUsersDisplayed'>   
    <h5 className='roomId'>Live Stream : {id} </h5>
    <div>
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button className='participants' > Participants <span>{Object.values(users).length -1}
       </span> </Button>
    </OverlayTrigger>
    </div>
    </div>
    <div className="row">
    <div className="col-md-12">
    <div className="video">
    <div className='flex' >
      {screenSharingVideo &&(
      <div className='w-4/5 pr-4 '>
              <VideoPlayerRoom stream={screenSharingVideo} />
        </div>
        
      )}
      <div className={`flex grid gap-4 ${
        screenSharingVideo ? "w-1/2 grid-col-2" : "grid-cols-4"
        
      }`}>
      
        <div className="holatxnnn">
        
            {displayVideo ?  (  screenSharingId !== me?.id && <VideoPlayerRoom stream={stream}  className="holatbnnn" />   )   :
              
           <div className='avatar'><i className="fa fa-user-circle" aria-hidden="true" ></i><div className='avatarNamex'> 
            </div>
            
             </div>
          }
    
            <div  className='userVideo'>{userNamex} </div>
             
            </div>
            
       {Object.values(usersToShow).filter(user => !!user.stream).map((user , index)=>(
       
        <div key={index}>
      
          <div className="">
         
          {displayUserVideo ? 
          (< VideoPlayerRoom stream={user.stream} userNamex={user.userNamex} />)  :
          <div className='avatar'><i className="fa fa-user-circle" aria-hidden="true" ></i><div className='avatarName'> 
          
          <div className='userVideo'> {"console.log(user.userId)"} </div>
          
          </div> </div>
      
        }
          <div  className='userVideo'>{user.userNamex} </div>
         
          {
          console.log(users.userNamex)
         }
          

         {
          /*
           <div className="marca">

            <input type="text"  placeholder='Enter your Name' name='status' className='marcaxx'  
              onChange={(e)=>setStatus(e.target.value)} hidden={status.length<1}
              value={status}
            />
          </div>
           */
         }
         
           
          </div>
        </div>
       ))
      }
</div>
        
</div>
      </div>
    </div>
   
    <div className="col-md-2">
    <Accordion defaultActiveKey="1">
      <Card className='cardx'>
      <CustomToggle eventKey="0"> + <i className="fa fa-ellipsis-v" aria-hidden="true"> </i></CustomToggle>
        <Card.Header>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body> <div className='btn-success'>
        
    <div className='menuOptionsx'>
    <div className='sharescrenButton'>
    
      <ShareScreenButton onClick={ShareScreen}/>
    </div><i className="fa fa-hand-paper-o" aria-hidden="true"></i>
    
    {displayAudio && audioTruex ?  (<button onClick={muteunmute} className="btn btn-primary btn-block" > {audioTruex && ("")} <i className="fa fa-microphone famicroyvix" aria-hidden="true"> </i></button>)  : <>
        <button onClick={muteunmute} className="btn btn-primary btn-block" >  { !audioTruex && ("")} <i className="warning fa fa-microphone-slash famicroyvix" aria-hidden="true"></i>   </button></>
     }     

    {enabledStream ? <button onClick={()=>HandleNotifications()} className="" > <i  className="fa fa-hand-paper-o famicroyvix" aria-hidden="true"></i></button> : <button onClick={()=>HandleNotifications()}  className="btn btn-primary .btn-block" > <i  className="fa fa-hand-paper famicroyvix" aria-hidden="true"></i></button> }

    {displayUserVideo && videoUserTruex ? <button onClick={playStop} className="btn btn-primary btn-block" > {videoUserTruex  && ("")}  <i  className="fa fa-video famicroyvix" aria-hidden="true"></i></button> : <button onClick={playStop} className="btn btn-primary .btn-block" >{!videoUserTruex && ("")} <i  className="fa fa-video-slash famicroyvix" aria-hidden="true"> </i>
    
    </button> 
    
    }

    <Button  onClick={() => setModalShow(true)}>
       <i className="fa fa-share-alt famicroyvix" aria-hidden="true"> </i>  
    </Button>  

    <div className='sharescrenButton  chatMessage'>
   
       <ChatScreenButton onClick={toggleChat} />
      
    </div>
    </div>
    
    </div></Card.Body>
        </Accordion.Collapse>
      </Card>
     
    </Accordion>
    </div>

  
    {chat.isChatOpen && ((
    <div className="col-md-4">
    <div className='Col-md videoChatStyle' > 
       <div className='col-sm-4 chatMessage '> 
       <div className='chatFixed'>
       <Chat/>
       </div> 
    </div>
    </div>
    
  
    </div>
    
   ))}




   {/*
   
      <button onClick={ClickNotification} className="btn btn-secondary" >Notify</button>
    <button onClick={()=>HandleNotifications()} className="btn btn-secondary" >Notify last</button>
    <button onClick={()=>displayNotification()} className="btn btn-secondary" >Display Notification</button> 
    <Button onClick={roomAccess}  variant="success"> Access </Button>

    <Button variant="primary" onClick={handleShow}>
        Chat 
    </Button>

    <Modal show={show} onHide={handleClose}   centered>
        <Modal.Header closeButton>
          <Modal.Title> Chat </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Chat</Form.Label>
       
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Chat</Form.Label>
              <Form.Control as="textarea" rows={3}  />
              <Chat/> 
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
   
   */}
    {/*<div className="famicroyvix videoChatTools">
            <a href="#" className="facebook">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="instagram">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="linkedin">
                <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="discord">
                <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="whatsapp">
                <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="slack">
                <i className="fab fa-slack"></i>
            </a>
  </div>*/}
  


    <hr className='lineSepare'/>
    <div className='videoChatTools'>
    <div className='menuOptions'>
    <div className='sharescrenButton '>
      
      <ShareScreenButton onClick={ShareScreen}/>
    </div><i className="fa fa-hand-paper-o" aria-hidden="true"></i>
    {displayAudio && audioTruex ?  (<button onClick={muteunmute} className="btn btn-primary btn-block" > {audioTruex && ("")} <i className="fa fa-microphone famicroyvix" aria-hidden="true"> </i></button>)  : <>
        <button onClick={muteunmute} className="btn btn-primary btn-block" >  { !audioTruex && ("")} <i className="warning fa fa-microphone-slash famicroyvix" aria-hidden="true"></i></button></>
     }     

    {enabledStream ? <button onClick={()=>HandleNotifications()} className="" > <i  className="fa fa-hand-paper-o famicroyvix" aria-hidden="true"></i></button> : <button onClick={()=>HandleNotifications()}  className="btn btn-primary .btn-block" > <i  className="fa fa-hand-paper famicroyvix" aria-hidden="true"></i></button> }

    {displayUserVideo && videoUserTruex ? <button onClick={playStop} className="btn btn-primary btn-block" > {videoUserTruex  && ("")}  <i  className="fa fa-video famicroyvix" aria-hidden="true"></i></button> : <button onClick={playStop} className="btn btn-primary .btn-block" >{!videoUserTruex && ("")} <i  className="fa fa-video-slash famicroyvix" aria-hidden="true"></i>
    
    </button> 
    }
          
    <div className='sharescrenButton  chatMessage'>
   
       <ChatScreenButton onClick={toggleChat} />
      
    </div>
    </div>
    </div>
    <Notifications />

   

    <hr className='lineSepare'/>
   
  </div>

</div>

      <div>
        
        {arr.map((n)=>displayNotification(n))}
        
      </div>
  

</div>


<div className='modal-fullscreen'> 
              <Modal 
      {...props}
      show={modalShow}
      onHide={() => setModalShow(false)}
           className='bodyModal'
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <div className='text-warning titlesNave eventsParametersxModal active animate__animated animate__fadeInTopLeft' href="/" id="logo1">B A W <i className="fa fa-globe animate__animated"></i> <i className="fa fa-globe animate__animated"></i> L  <i className="fa fa-check fa-check fa-checkHeader" aria-hidden="true"></i></div>
        </Modal.Title>
      </Modal.Header>
      {/*<Card.Text className='EventsFooter'> Status :  </Card.Text>*/}
      <Modal.Body>
              
              {/*
                <Card.Text className='eventsParameters'> Country   :  </Card.Text>
              <Card.Text className='eventsParameters'> Country   :  </Card.Text>
              <Card.Text className='eventsParameters'> Address :  </Card.Text>
              <Card.Text className='eventsParameters'> Group :  </Card.Text>
              <Card.Text className='eventsParameters'> Date :  </Card.Text>
              <Card.Text className='eventsParameters'> From : </Card.Text>
              <Card.Text className='eventsParameters'> Description   :   </Card.Text>
              */}
              
      </Modal.Body>
      <div className='EventsFooter'>
      {/*<Card.Text className='EventsFooter'> Price : $  </Card.Text>*/}
      
      </div>  
      <Modal.Footer>
        
        </Modal.Footer>
      <div className='CloseAndShare'> 

      <EmailShareButton 
          url={shareUrl}
          quote={'Share the link'}
          hashtag={'#portafolio...'}
          >
          <EmailIcon size={40} round={true}/>
        </EmailShareButton>

      <TwitterShareButton 
          url={shareUrl}
          quote={'Share the link'}
          hashtag={'#portafolio...'}
          >
          <TwitterIcon size={40} round={true}/>
          </TwitterShareButton>   

      <FacebookShareButton 
          url={shareUrl}
          quote={'Share the link'}
          hashtag={'#portafolio...'}
          >
              <FacebookIcon size={40} round={true}/>
          </FacebookShareButton>
          <WhatsappShareButton 
          url={shareUrl}
          quote={'Share the link'}
          hashtag={'#portafolio...'}
          >
          <WhatsappIcon size={40} round={true}/>
          </WhatsappShareButton>
        </div> 

        <Modal.Footer>
        <Button onClick={onHide} className='btn-danger'>Close</Button> 
        </Modal.Footer>
          


    </Modal>
    </div> 
   

</div>

  )
}

export default LiveScreen