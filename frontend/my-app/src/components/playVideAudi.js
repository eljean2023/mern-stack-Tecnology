import React from 'react';
import ReactPlayer from 'react-player';
import FormContainer  from '../components/FormContainer'
import { Button } from 'react-bootstrap';

const Player = () =>{
    return <ReactPlayer
    url={require('../images/pool.mp4')} 
    loop
    playing />   
  
}

export default Player;