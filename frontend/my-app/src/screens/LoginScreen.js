import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col, image} from 'react-bootstrap'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {loginAction} from '../actions/userAction'
import { useLocation } from "react-router-dom";
import Message from '../components/Message'
import Loader from '../components/Loader';


const LoginScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const dispatch = useDispatch()
const userLogin = useSelector(state=>state.userlogin)
const{loading, error, userInfo} = userLogin

/*const [pwd, setPwd] = useState('');*/
const [isRevealPwd, setIsRevealPwd] = useState(false);

const navigate = useNavigate()


useEffect(()=>{
  if(!userInfo){
    navigate('/login')
  }
  else{
    navigate('/profile')
  }
  
},[userInfo, history, redirect])

const onSubmitHandler = (e) =>{
    e.preventDefault()
    dispatch(loginAction(email, password))
   //window.location = "/profile" 
} 
setTimeout(() => {
  setIsRevealPwd(false);
}, 3000);

  return (
    <FormContainer className="frmContainer"> 
       <div className="shadow-lg p-3 mb-5 bg-body rounded">
        <h1 className='titles animate__animated animate__bounceIn animate__delay-1s	3s logotitle'><i className="fa fa-lock" aria-hidden="true"></i></h1>
        {error && <Message variant='danger'>{error}</Message>} 
        {loading && <Loader/> }
    <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type={isRevealPwd ? "text" : "password"} placeholder="Enter your password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
        <span  onClick={() => setIsRevealPwd(prevState => !prevState)} toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password eyesIcon" >

        </span>
        

      </Form.Group>
      <div className='centerdiv'>
      <Button variant="success" type="submit">
        Log In
      
      </Button>
      </div>
    </Form>
    <div className='centerdiv'>
    <Row className='py-3'>
    <Col>
        New customer ? {''}
        <Link className='text-warning-x' to={redirect ? `/register? redirect = ${redirect}` : '/register'}>
         Register 
        </Link>
    </Col>
    </Row>
    </div>
    </div>
    </FormContainer>
  )
}

export default LoginScreen