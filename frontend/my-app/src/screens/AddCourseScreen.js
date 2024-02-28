import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {courseAddAction} from '../actions/courseAction'
import { useLocation } from "react-router-dom";
import Message from '../components/Message'
import Loader from '../components/Loader';
import ListGroup from 'react-bootstrap/ListGroup';


const AddCourseScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const [name, setName] = useState('')
const [link, setLink] = useState('')
/*
const [title, setTitle] = useState('')
const [category, setCategory] = useState('')
const [filename, setFilename] = useState('')
const [uploading, setUploading] = useState(false)
const [price, setPrice] = useState()

*/


const [message, setMessage] = useState(null)
const dispatch = useDispatch()

const addCourse = useSelector(state=>state.courseAdd)
const{loading, error, courseInfo} = addCourse

const navigate = useNavigate()


useEffect(()=>{
    if(!courseInfo){
      /*  history.push(redirect) */
      console.log(courseInfo)
    }
},[history, courseInfo, redirect])

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
   
        dispatch(courseAddAction(name, link/* title, category,price, filename */))
          navigate('/profile')
} 

  return (
    
    <FormContainer>
        <h2 className='titles animate__animated animate__bounceIn animate__delay-1s	3s'>Add your Course </h2>
        {message && <Message variant='danger'>{message}</Message>} 
        {error && <Message variant='danger'>{error}</Message>} 
        {loading && <Loader/> }

    <Form onSubmit={onSubmitHandler}>

    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your Course Name</Form.Label>
        <Form.Control type="text" placeholder="Enter the title"  value={name} onChange={(e)=>setName(e.target.value)}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Link</Form.Label>
        <Form.Control type="text" placeholder="Enter the category"  value={link} onChange={(e)=>setLink(e.target.value)}/>
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

export default AddCourseScreen

{/*

<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Text / voice && Instrumental </Form.Label>
       
        <Form.Control type="text" placeholder="Select your file" /*name="Img" accept='image/'  id='Img' hidden value={filename} onChange={(e)=>setFilename(e.target.value)}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Control
        id='image-file'
        label='Choose File'
        type='file'
        /*custom 
        onChange={uploadHandle} 
        >
      </Form.Control>

        {uploading && <Loader /> }


      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter the price"  value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

*/}