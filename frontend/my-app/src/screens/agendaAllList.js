import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link, redirect, useNavigate,useParams} from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {agendasActions} from '../actions/agendaAction'
import { useLocation } from "react-router-dom";
import Loader from '../components/Loader';


//import { getVideoDurationInSeconds } from "get-video-duration"

/*
import Message from '../components/Message'
import Loader from '../components/Loader';
import Table from 'react-bootstrap/Table';
import ReactPlayer from 'react-player'
import { matchPath } from 'react-router'
import singleProduct from '../components/SingleProduct'
*/

import SingleAgenda from '../components/SingleAgendas'
import { setDate } from 'date-fns/esm'

const AllAgendasScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const dispatch = useDispatch()
const AgendaList = useSelector(state=>state.agendaList)
const{loading, error, agendas} = AgendaList
const[data, setData] = useState() 
const[records, setRecords] = useState([])

const navigate = useNavigate()
const {id} = useParams()



//let history = match.params.param

useEffect(()=>{
    dispatch(agendasActions())
},[dispatch, history])


const AddToCart = () =>{
    navigate(`/cart`)
}

const filter = (e)=>{
setRecords(agendas.filter(f=>f.name.includes(e.target.value.toLowerCase())))
}
console.log(agendas)

// From a URL...
//getVideoDurationInSeconds(
 // 'https://www.youtube.com/embed/E7wJTI-1dvQ'
//).then((duration) => {
 // console.log(duration)
//})
function myFunction() { 
  let vid = document.getElementById("myVideo");
} 

setTimeout(()=>{
  myFunction()
}, 6000)
myFunction()

var myWindow = window.open("", "MsgWindow", "width=200,height=100");
//myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");

let timex = 13000
var linkx = "https://www.youtube.com/embed/E7wJTI-1dvQ"
let height = 600;
let width = 1200;

function openWin() {
  myWindow = window.open(linkx, 'popUpWindow', 'height=' + height + ', width=' + width + ', resizable=yes,scrollbars=yes,toolbar=yes');   // Opens a new window
  if(myWindow){
    setTimeout(()=>{
      myWindow.close()
    }, timex)
    navigate(`/agendaAlls`)
  }
}

function closeWin() {
  myWindow.close();  // Closes the new window
}

  return (
    <div> 
  {loading && <Loader/> }
<h1 className='text-center titles'>Hits only</h1>


{
  /*

  <iframe name="theFrame">Link to yputube </iframe>

  <video id="myVideo" width="320" height="176" controls>
  <source src="https://www.youtube.com/embed/E7wJTI-1dvQ" type="video/mp4"/>
  </video>
   */
}

{
/*
  <iframe name='holahola' width="420" height="345" src={linkx}>
</iframe>

*/
}

{/*
  
<Button onClick={openWin}>Open</Button>
<Button onClick={closeWin}>Close</Button>
*/}
  
        
      {/*
          <div>
      <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
        />
        </div>

         <div>
          
        <a href={'https://www.youtube.com/embed/E7wJTI-1dvQ'} target='_blank'>Go to Youtube</a> 
        </div>

      */}

      

       
        <div>
      </div>
      {/*
         <h1 className='text-center titles searchAgendaTop '>Global Events</h1>
       <Form className="d-flex searchAgenda">
            <Form.Control
              type="search"
              placeholder="Search by artist Name,  famouse or group ect..."
              className="me-2"
              aria-label="Search"
              onChange={filter}
            
            />
            {/*
            <Button variant="outline-success">Search</Button>
           
          </Form>
      */}
       <Row className='aver'>
       {/*agendas*/}
       {/*records*/}
       {
            agendas.map((agenda)=>(
              <Col sm={12} md={6} lg={4} xl={3} key={agenda._id}> 
              <SingleAgenda agenda={agenda}/>
              </Col>
             
            ))
          }
   
       </Row>
  
  <Form>

  <Link className='text-warning-x text-center' to={redirect ? `/? redirect = ${redirect}` : '/'}>
    <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
   </Link>
</Form>
  </div>
  )
}


export default AllAgendasScreen