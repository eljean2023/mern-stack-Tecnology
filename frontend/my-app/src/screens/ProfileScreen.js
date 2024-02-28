import React, {useState, useEffect} from 'react'
import {Link, redirect,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {UserDetailsAction, UserUpdateAction,} from '../actions/userAction'
import {myOrdersActions} from '../actions/orderAction'
import FormContainer  from '../components/FormContainer'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ProfileScreen = ({history}) => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const dispatch = useDispatch()
const navigate = useNavigate()

const userDetails = useSelector(state=>state.userDetails)
const{loading, error, user} = userDetails

const orderMyList = useSelector(state=>state.orderMyList)
const{loading: loadingOders, error: errorOrders, orders} = orderMyList

const userLogin = useSelector(state=>state.userlogin)
const{ userInfo} = userLogin

const userUpdate = useSelector(state=>state.userUpdate)
const{ success} = userUpdate



const [type, setType] = useState("");
const [icon, setIcon] = useState("fa-solid fa-eye-slash");


useEffect(()=>{
         if(!userInfo){
           navigate('/profile')
         }
 
        if(!user.name){
            dispatch(UserDetailsAction('/profile'))
            dispatch(myOrdersActions())
        }
        else{
            setName(user.name)
            setEmail(user.email)
    }    
},[dispatch, history, userInfo, user])

const onSubmitHandler = (e) =>{
    e.preventDefault()
   
        /*dispatch(UserUpdateAction({id: user._id, name, email, password})) */
    }

const show = () => {
    type === "password" ? setType("text") : setType("password");
    icon === "fa-solid fa-eye"
      ? setIcon("fa-solid fa-eye-slash")
      : setIcon("fa-solid fa-eye");
  };

  return <FormContainer>
    
    <Card.Title><h3 className='titles animate__animated animate__fadeInRight animate__slow'>Dashboard  {user?.name}</h3>  </Card.Title>

    <Card style={{ textAlign: 'center' }}>
      <ListGroup variant="flush">
      <Link className='btn btn-segundary btn-block underline' to={redirect ? `/addproduct? redirect = ${redirect}` : '/addproduct'}>
          Add Breaking news
        </Link>    
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/userproducts? redirect = ${redirect}` : '/userproducts'}>
         My Breaking news List
        </Link>
        {/*
        
        <hr/>
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/MyOrders? redirect = ${redirect}` : '/myOrders'}>
         My Orders
        </Link>
        
        */}
        <hr/>
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/addEvent? redirect = ${redirect}` : '/addEvent'}>
         Add Hits
        </Link>
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/useragenda? redirect = ${redirect}` : '/useragenda'}>
         My Hit List
        </Link>
        <hr/>
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/courseAdd? redirect = ${redirect}` : '/courseAdd'}>
         Add Coursess
        </Link>
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/couseAlls? redirect = ${redirect}` : '/courseAlls'}>
         My Courses List
        </Link>
        <hr/>
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/profileInfo? redirect = ${redirect}` : '/profileInfo'}>
         My Profile
        </Link>
       {/*
       
        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/addEvent? redirect = ${redirect}` : '/addEvent'}>
         Add Survey
        </Link>

        <Link className='btn btn-segundary btn-block underline' to={redirect ? `/useragenda? redirect = ${redirect}` : '/useragenda'}>
         My Surveys
        </Link>
       
       */}
      </ListGroup>    
    </Card>
    <Link className='text-warning-x text-center' to={redirect ? `/? redirect = ${redirect}` : '/'}>
    <i className="fa fa-arrow-left text-center" aria-hidden="true" > Back </i>
   </Link>
    </FormContainer>
}

export default ProfileScreen




  
  