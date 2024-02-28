import React, {useState, useEffect} from 'react'
import {Link, redirect,useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {UserDetailsAction, UserUpdateAction, UserDeleteAction} from '../actions/userAction'
import {LinkContainer} from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Example  from '../components/MenuLat'
import FormContainer  from '../components/FormContainer'
import Card from 'react-bootstrap/Card';
import Message from '../components/Message'
import Loader from '../components/Loader';
import ListGroup from 'react-bootstrap/ListGroup';



function ProfileInfoScreen({history}) {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [message, setMessage] = useState(null)
const dispatch = useDispatch()

const userDetails = useSelector(state=>state.userDetails)
const{loading, error, user} = userDetails

const userLogin = useSelector(state=>state.userlogin)
const{ userInfo} = userLogin

const userUpdate = useSelector(state=>state.userUpdate)
const{ success} = userUpdate

const userDelete = useSelector(state=>state.userDelete)
const{ success : successDelete} = userDelete

const [type, setType] = useState("");
const [icon, setIcon] = useState("fa-solid fa-eye-slash");

const navigate = useNavigate()

useEffect(()=>{
         if(!userInfo){
           navigate('/login')
         }
 
        if(!user.name){
            dispatch(UserDetailsAction('/addProduct'))
        }
        else{
            setName(user.name)
            setEmail(user.email)
    }    
},[dispatch, history,navigate, userInfo, user, successDelete])

const onSubmitHandler = (e) =>{
    e.preventDefault()

{/*

const removeUser = (id) =>{
  if(window.confirm('Are you sure you to delete to close your account')){
  dispatch(UserDeleteAction(id))
}
}

*/}
   
    if(password !== confirmPassword){
        setMessage('Password and confirmPassword are mandatory')
        } else if(!password){
            setMessage('Passwords do not match') 
    } else if(!password || password=== "" || password == null){
      setMessage('Password can not be empty') 
    }
    else if(!confirmPassword || confirmPassword === "" || confirmPassword == null){
    setMessage('confirmPassword can not be empty') 
    }  
    else{
        dispatch(UserUpdateAction({id: user._id, name, email, password}))
       // navigate('/profile')
    }
    
   /* window.location = "/";*/
   //dispatch Register
} 
  const show = () => {
    type === "password" ? setType("text") : setType("password");
    icon === "fa-solid fa-eye"
      ? setIcon("fa-solid fa-eye-slash")
      : setIcon("fa-solid fa-eye");
  };


  const removeUser = (id) =>{
    if(window.confirm('Are you sure you want to cancel your account')){
      dispatch(UserDeleteAction(id))
      window.location = "/"
    }
  }


  return (
    <FormContainer>
      <h1 className='titles animate__animated animate__bounceIn animate__delay-1s	3s'>Update Profile</h1>
         <Card>
      
      <Card.Body>
        
        <Card.Text>
        <Col >
{message && <Message variant='danger'>{message}</Message>} 
{error && <Message variant='danger'>{error}</Message>}
{success && <Message variant='success'>Profile Updated</Message>}
{loading && <Loader/> }

<Form onSubmit={onSubmitHandler}>
<Form.Group className="mb-3" controlId="formBasicName">
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Enter Name"  value={name} onChange={(e)=>setName(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Email address</Form.Label>
<Form.Control type="email" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type={type} placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
<span onClick={show}  toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" >

</span>
</Form.Group>  

<Form.Group className="mb-3" controlId="formBasicconfirmPassword">
<Form.Label>Confirm Password</Form.Label>
<Form.Control type={type} placeholder="Confirm Password"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
<span onClick={show}  toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" >
<Button variant="secundary" href='#'></Button>{' '}
      {/*2308
      <Button variant="success" href='/addProduct'>Add</Button>{' '}
     
      <Button variant="warning" href='/edit'>Edit</Button>{' '}
      <Button variant="danger"  href='/delete'>Delete</Button>{' '}
     */}
</span>
</Form.Group>

<Button className='txt-warning' variant="success" type="submit">
Update
</Button>

</Form>
            
            </Col>
        </Card.Text>
     </Card.Body>
       </Card>
       <ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item> 

        <Link type='button' variant='light' onClick={()=>removeUser(user._id)}><i className='fas fa-trash text-danger removeOption'>Close your account </i></Link>

    </FormContainer>
  )
}

export default ProfileInfoScreen