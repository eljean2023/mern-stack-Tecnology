import React, {useState, useEffect} from 'react'
import {Link, redirect,useNavigate, useParams} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { UserDeleteAction} from '../actions/userAction'
import {agendaSingleActions,agendaUpdateAction} from '../actions/agendaAction'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer  from '../components/FormContainer'
import Card from 'react-bootstrap/Card';
import Message from '../components/Message'
import Loader from '../components/Loader';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'

function AgendaUpScreen({history}) {
const [name, setName] = useState('')
const [country, setCountry] = useState('')
const [statex, setStatex] = useState('')
const [address, setAddress] = useState('')
const [description, setDescription] = useState('')
const [date, setDate] = useState('')
const [hour, setHour] = useState('')
const [status, setStatus] = useState('')
const [filename, setFilename] = useState('')
const [pricex, setPricex] = useState()
const [message, setMessage] = useState(null)
const dispatch = useDispatch()
const {id} = useParams()
const [uploading, setUploading] = useState(false)

const agendaSingle = useSelector(state=>state.agendaSingle)
const{loading, error, agenda} = agendaSingle


const userDetails = useSelector(state=>state.userDetails)
const{ user} = userDetails

const userLogin = useSelector(state=>state.userlogin)
const{ userInfo} = userLogin

const userUpdate = useSelector(state=>state.userUpdate)
const{ success} = userUpdate

const userDelete = useSelector(state=>state.userDelete)
const{ success : successDelete} = userDelete

const navigate = useNavigate()

useEffect(()=>{
         if(!agenda.name  || agenda._id !== id){
          dispatch(agendaSingleActions(id))
         }
         else{
          setName(agenda.name)
          setCountry(agenda.country)
          setStatex(agenda.statex)
          setAddress(agenda.address)
          setDate(agenda.date)
          setHour(agenda.hour)
          setStatus(agenda.status)
          setDescription(agenda.description)
          setPricex(agenda.pricex)
          setFilename(agenda.filename)
          
         }
   
},[dispatch, history,navigate, agenda, userInfo, user,success, successDelete])

const onSubmitHandler = (e) =>{
    e.preventDefault()
/*
const removeUser = (id) =>{
  dispatch(UserDeleteAction(id))
}
  */

dispatch(agendaUpdateAction({_id: id, name, country,statex,address,date,hour,status,description, filename, pricex}))
       navigate('/profile')
} 


  const removeUser = (id) =>{
    dispatch(UserDeleteAction(id))
    window.location = "/useragenda"
  }


  const uploadHandle = async (e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('filename', file)
    setUploading(true)
    try {
      const config = {
        'Content-Type' : 'multipart/form-data'
      }
    const {data} = await axios.post('/api/uploads', formData, config)
    setFilename(data)
    setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <FormContainer>
      <h1 className='titles animate__animated animate__bounceIn animate__delay-1s	3s'>Update Event</h1>

         {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

<Form onSubmit={onSubmitHandler}>
<Form.Group className="mb-3" controlId="formBasicName">
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Enter the Name"  value={name} onChange={(e)=>setName(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

{uploading && <Loader /> }

<Form.Group className="mb-3" controlId="formBasicCountry">
<Form.Label>Country</Form.Label>
<Form.Control type="text" placeholder="Enter the country"  value={country} onChange={(e)=>setCountry(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicEstate">
<Form.Label>state</Form.Label>
<Form.Control type="text" placeholder="Enter the state"  value={statex} onChange={(e)=>setStatex(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicAddress">
<Form.Label>address</Form.Label>
<Form.Control type="text" placeholder="Enter the address"  value={address} onChange={(e)=>setAddress(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicDescription">
<Form.Label>Description</Form.Label>
<Form.Control type="text" placeholder="Enter the Description"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicDate">
<Form.Label>Date</Form.Label> 
<Form.Control type="date" placeholder="Enter the country"  value={date} onChange={(e)=>setDate(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicHour">
<Form.Label>Hour</Form.Label>
<Form.Control type="text" placeholder="Enter the Hour"  value={hour} onChange={(e)=>setHour(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicDescription">
<Form.Label>Description</Form.Label>
<Form.Control type="text" placeholder="Enter the Description"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicStatus">
<Form.Label>Status</Form.Label>
<Form.Control type="text" placeholder="Enter the Status"  value={status} onChange={(e)=>setStatus(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Item</Form.Label>
<Form.Control type="text" placeholder="Password" hidden value={filename} onChange={(e)=>setFilename(e.target.value)} disabled />

<Form.Control
        id='image-file'
        label='Choose File'
        type='file'
        /*custom */
        onChange={uploadHandle} 
        >
      </Form.Control>

</Form.Group>  



<Form.Group className="mb-3" controlId="formBasicconfirmPassword">
<Form.Label>Price</Form.Label>
<Form.Control type="text" placeholder="Confirm Password"  value={pricex} onChange={(e)=>setPricex(e.target.value)} />

</Form.Group>

<Button className='txt-warning' variant="success" type="submit">
Update
</Button>

<Card> <Card.Body> <Card.Text> <Col >

</Col>
        </Card.Text>
     </Card.Body>
       </Card>
       <ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item> 
      
       
</Form>

         )}


            
           
    </FormContainer>
  )
}

export default AgendaUpScreen


