import React,{useEffect}from 'react'
import  { useState, useReducer, useContext} from 'react'
import { RoomContext } from '../context/RoomContext';
import {productsActions} from '../actions/produtcAction'
import {useDispatch} from 'react-redux'
import FormContainer  from '../components/FormContainer'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import {useSelector} from 'react-redux'
import Loader from '../components/Loader';


import  RecordVideos  from '../screens/RecordVideos';
import { useReactMediaRecorder } from "react-media-recorder";

import Surveys from './Surveys';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch()
    const userDetails = useSelector(state=>state.userDetails)
    const{loading, error, user} = userDetails/
useEffect(()=>{
    dispatch(productsActions())
}, [dispatch])


setTimeout(()=>{
 document.getElementById('splash').classList.add('fade')
}, 3000)

  return (
    <div className='homeScreenCenter'>
      <div id='splash'>
        <h1 className='welcome'>Welcome to Bawool.....</h1>
      </div>
    {loading && <Loader/> }
      <FormContainer className="shadow-lg p-3 mb-5 bg-body rounded">
        <div className="shadow-lg p-3 mb-5 bg-body rounded">
        <h3 className='titleshome animate__animated animate__bounceIn animate__delay-1s	3s'><i className="fa fa-clock relojPri" aria-hidden="true"></i> All in one</h3>
        <div className='centerdiv'>
      <Card style={{ width: '18rem', textAlign: ''}}>
      <ListGroup variant="flush"  className='frontCenterAlignx'>
        {/* <ListGroup.Item><a href={`/createRoomxx`}><i className="fa fa-play fa-fw homeIcon fa-fwx" aria-hidden="true"></i>Live Seps</a></ListGroup.Item> */}
        <ListGroup.Item><Link to="/market"><i className="fa fa-eye fa-fw homeIcon homeIcon fa-fwx" aria-hidden="true"></i> Breaking news </Link></ListGroup.Item>
        <ListGroup.Item><Link to="/agendaAlls"><i className="fa fa-calendar fa-fw homeIcon fa-fwx" aria-hidden="true"></i>Music Hits</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/courseAlls"><i className="fa fa-newspaper fa-fw homeIcon fa-fwx" aria-hidden="true"></i>Courses</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/createLivex"><i className="fa fa-calendar fa-fw homeIcon fa-fwx" aria-hidden="true"></i> Live </Link></ListGroup.Item>
        </ListGroup>
    </Card>
    </div> 
    <div className='mrgButtom'></div> 
    </div>
    <Nav className='frontCenterAlign'
      activeKey="/home"
       
    >
      <Nav.Item>
      <Nav.Link href="/login"><i className="fa fa-lock whiteColor" aria-hidden="true"> Login</i> </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link href="/login"><i className="fab fa-hire-a-helper whiteColor" aria-hidden="true"> Help</i> </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login"><i className="far fa-address-card whiteColor" aria-hidden="true"> Contact Us</i></Nav.Link>
      </Nav.Item>
    </Nav>

    <div className='prefootHome '>
    <h5 className='titles animate__animated animate__flash animate__infinite	infinite animate__delay-1s	10s animate__slower' > <i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i> </h5>
    </div>

      </FormContainer>
      
      </div>
  )
}

export default Home 