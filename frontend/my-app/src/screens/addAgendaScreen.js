import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {agendaAddAction} from '../actions/agendaAction'
import { useLocation } from "react-router-dom";
import Message from '../components/Message'
import Loader from '../components/Loader';
import ListGroup from 'react-bootstrap/ListGroup';

const AddAgendaScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const [name, setName] = useState('')
const [link, setLink] = useState('')
/*
const [country, setCountry] = useState('')
const [hour, setHour] = useState('')
const [date, setDate] = useState('')
const [statex, setStatex] = useState('')
const [address, setAddress] = useState('')
const [status, setStatus] = useState('')
const [description, setDescription] = useState('')
const [filename, setFilename] = useState('')
const [uploading, setUploading] = useState(false)
const [pricex, setPricex] = useState('')

*/
const [message, setMessage] = useState(null)
const dispatch = useDispatch()

const addAgenda = useSelector(state=>state.agendaAdd)
const{loading, error, agendaInfo} = addAgenda

const navigate = useNavigate()


useEffect(()=>{
    if(!agendaInfo){
      /*  history.push(redirect) */
      console.log(agendaInfo)
    }
},[history, agendaInfo, redirect])

/*
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
*/

const onSubmitHandler = (e) =>{
    e.preventDefault()
   
        dispatch(agendaAddAction(name, link /* ,hour,date,country,statex,address,status,description, pricex,filename */))
          navigate('/profile')
} 

  return (
    
    <FormContainer>

<h2 className='titles animate__animated animate__bounceIn animate__delay-1s	3s'>Add Event </h2>

{message && <Message variant='danger'>{message}</Message>} 
{error && <Message variant='danger'>{error}</Message>} 
{loading && <Loader/> }

<Form onSubmit={onSubmitHandler}>

<Form.Group className="mb-3" controlId="formBasicName">
<Form.Label>Your Business Name</Form.Label>
<Form.Control type="text" placeholder="Enter your Business name"  value={name} onChange={(e)=>setName(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicHour">
<Form.Label>Link</Form.Label>
<Form.Control type="text" placeholder="Paste your link"  value={link} onChange={(e)=>setLink(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<div className='centerdiv'>
<Button className='txt-warning' variant="primary" type="submit">
Save
</Button>
</div>
<Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
  <i className="" aria-hidden="true" >  </i>
</Link>
</Form>
<ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
  <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
</Link></ListGroup.Item> 
        
    </FormContainer>
    
  )
}

export default AddAgendaScreen



{/*
<Form.Group className="mb-3" controlId="formBasicHour">
<Form.Label>Hour</Form.Label>
<Form.Control type="text" placeholder="Enter the Hour"  value={hour} onChange={(e)=>setHour(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicDate">
<Form.Label>Date</Form.Label>
<Form.Control type="date" placeholder="Enter the Date"  value={date} onChange={(e)=>setDate(e.target.value)}/>

</Form.Group>


<Form.Group className="mb-3" controlId="formBasicCountry">
<Form.Label>Country</Form.Label>
<Form.Control type="text" placeholder="Enter the Country"  value={country} onChange={(e)=>setCountry(e.target.value)}/>


</Form.Group>


<Form.Group className="mb-3" controlId="formBasicState">
<Form.Label>State</Form.Label>
<Form.Control type="text" placeholder="Enter the State"  value={statex} onChange={(e)=>setStatex(e.target.value)}/>

</Form.Group>


<Form.Group className="mb-3" controlId="formBasicAddress">
<Form.Label>Address</Form.Label>
<Form.Control type="text" placeholder="Enter the Address"  value={address} onChange={(e)=>setAddress(e.target.value)}/>

</Form.Group>

<Form.Group className="mb-3" controlId="formBasicStatus">
<Form.Label>Status</Form.Label>
<Form.Control type="text" placeholder="Enter the Status"  value={status} onChange={(e)=>setStatus(e.target.value)}/>

</Form.Group>


<Form.Group className="mb-3" controlId="formBasicDescription">
<Form.Label>Description</Form.Label>
<Form.Control type="text" placeholder="Enter the description"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicDescription">
<Form.Label>Pricex</Form.Label>
<Form.Control type="number" placeholder="Enter the description"  value={pricex} onChange={(e)=>setPricex(e.target.value)}/>

</Form.Group>

<Form.Group className="mb-3" controlId="formBasicFileName">
<Form.Label>Text / voice && Instrumental </Form.Label>

<Form.Control type="text" placeholder="Select your file" /*name="Img" accept='image/'  id='Img' hidden value={filename} onChange={(e)=>setFilename(e.target.value)}/>
</Form.Group>

<Form.Control
id='image-file'
label='Choose File'
type='file'
/*custom */
// onChange={uploadHandle} 
//</Form>>
//</Form.Control>

{/*uploading && <Loader /> 

//</Form></FormContainer>
*/}


/*

<Form.Group className="mb-3" controlId="formBasicPrice">
<Form.Label>Price</Form.Label>
<Form.Control type="Number" placeholder="Enter the price"  value={pricex} onChange={(e)=>setPricex(e.target.value)}/>
</Form.Group>

*/}