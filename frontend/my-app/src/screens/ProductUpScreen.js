import React, {useState, useEffect} from 'react'
import {Link, redirect,useNavigate, useParams} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {UserDetailsAction, UserUpdateAction, UserDeleteAction} from '../actions/userAction'
import {producSingleActions ,ProductUpdateAction} from '../actions/produtcAction'
import FormContainer  from '../components/FormContainer'
import Card from 'react-bootstrap/Card';
import Message from '../components/Message'
import Loader from '../components/Loader';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'

function ProductUpScreen({history}) {
const [title, setTitle] = useState('')
const [category, setCategory] = useState('')
const [filename, setFilename] = useState('')
const [price, setPrice] = useState('')
const [message, setMessage] = useState(null)
const dispatch = useDispatch()
const {id} = useParams()
const [uploading, setUploading] = useState(false)

const productSingle = useSelector(state=>state.productSingle)
const{loading, error, product} = productSingle


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
         if(!product.title  || product._id !== id){
          dispatch(producSingleActions(id))
         }
         else{
          setTitle(product.title)
          setCategory(product.category)
          setFilename(product.filename)
          setPrice(product.price)
         }
   
},[dispatch, history,navigate, product, userInfo, user,success, successDelete])

const onSubmitHandler = (e) =>{
    e.preventDefault()
/*
const removeUser = (id) =>{
  dispatch(UserDeleteAction(id))
}
  */

dispatch(ProductUpdateAction({_id: id, title, category, filename, price}))
       navigate('/profile')
} 


  const removeUser = (id) =>{
    dispatch(UserDeleteAction(id))
    window.location = "/"
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
      <h1 className='titles animate__animated animate__bounceIn animate__delay-1s	3s'>Update Product</h1>

         {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

<Form onSubmit={onSubmitHandler}>
<Form.Group className="mb-3" controlId="formBasicName">
  
{/*

<Form.Label>Title</Form.Label>
<Form.Control type="text" placeholder="Enter Name"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

{uploading && <Loader /> }

<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Category</Form.Label>
<Form.Control type="text" placeholder="Enter email"  value={category} onChange={(e)=>setCategory(e.target.value)}/>
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
       /* onChange={uploadHandle} 
        >
      </Form.Control>

</Form.Group>  


<Form.Group className="mb-3" controlId="formBasicconfirmPassword">
<Form.Label>Price</Form.Label>
<Form.Control type="text" placeholder="Confirm Password"  value={price} onChange={(e)=>setPrice(e.target.value)} />

*/}

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

export default ProductUpScreen


