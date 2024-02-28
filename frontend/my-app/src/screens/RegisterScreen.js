import React, {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {registerAction} from '../actions/userAction'
import { useLocation } from "react-router-dom";
import Message from '../components/Message'
import Loader from '../components/Loader';


const RegisterScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [message, setMessage] = useState(null)
const dispatch = useDispatch()
const navigate = useNavigate()


const userRegister = useSelector(state=>state.userRegister)
const{loading, error, userInfo} = userRegister

const [isRevealPwd, setIsRevealPwd] = useState(false);


useEffect(()=>{
    if(userInfo){
      navigate('/market') 
      /*  history.push(redirect) */
        
    }
},[navigate, userInfo, redirect])

const onSubmitHandler = (e) =>{
    e.preventDefault()
   
    if(password !== confirmPassword){
        setMessage('Passwords do not match')
    } else{
        dispatch(registerAction(name, email, password))
    }
    
   /* window.location = "/";*/
   //dispatch Register
} 

setTimeout(() => {
  setIsRevealPwd(false);
}, 3000);
  return (
    <FormContainer>
      <div class="shadow-lg p-3 mb-5 bg-body rounded">
        <h1 className='titles animate__animated animate__bounceIn animate__delay-1s	3s logotitle'><i className="fa fa-user-plus" aria-hidden="true"></i></h1>
        {message && <Message variant='danger'>{message}</Message>} 
        {error && <Message variant='danger'>{error}</Message>} 
        {loading && <Loader/> }

    <Form onSubmit={onSubmitHandler}>
    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label >Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name"  value={name} onChange={(e)=>setName(e.target.value)}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control  type="email" placeholder="Enter your email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">

        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type={isRevealPwd ? "text" : "password"} placeholder="Enter your password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
        <span  onClick={() => setIsRevealPwd(prevState => !prevState)} toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password eyesIcon" >

        </span>
        

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicconfirmPassword">
        <Form.Label >Confirm Password</Form.Label>
        <Form.Control type={isRevealPwd ? "text" : "password"} placeholder="Enter your password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        <span  onClick={() => setIsRevealPwd(prevState => !prevState)} toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password eyesIcon " >

      </span>
      </Form.Group>
      <div className='centerdiv'> 
      <Button  variant="success" type="submit">
        Register
      </Button>
      </div>
    </Form>

    <Row className='py-3'>
    <Col>
        have an account ? {' '}
        <Link  to={redirect ? `/login? redirect = ${redirect}` : '/login'} className='text-warning-x'>
         Log In 
        </Link>
    </Col>
    </Row>
    </div>
    </FormContainer>
    
  )
}

export default RegisterScreen