import React from 'react'
import addNotification from 'react-push-notification'
import { Notifications } from 'react-push-notification';
import myLogo from '../images/myLogo.jpg'
import { Button } from 'react-bootstrap'
import {useParams, useNavigate} from 'react-router-dom';

const name = 'Jean'

function SendNotifi(){
  const {id} = useParams()
    const navigate = useNavigate()
    const ClickNotification  = () =>{
        addNotification({
            title   : 'Bawool',
            message  : `Esta en espera ${name}`,
            duration : 150000,
            icon     : myLogo,
            theme: 'green',
            vibrate: [100, 100, 100],
            onClick: () => navigate(`/participantsR/${id}`)

        })
    }

  return (
    <div>
    <Notifications />
    <Button onClick={ClickNotification}> Click to Notification </Button>
    </div>
  )
}

export default SendNotifi


