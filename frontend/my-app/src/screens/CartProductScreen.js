import React, {useEffect} from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import message from '../components/Message'
import FormContainer  from '../components/FormContainer'
import Table from 'react-bootstrap/Table';
import {Form, Button, Row, Col,Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'

import {addToCart, removeFromCart} from '../actions/cartAction '

const CartProductScreen = ({history, redirect}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const navigate = useNavigate()
  const {id} = useParams() 
  useEffect(()=>{
    if(id){
      dispatch(addToCart(id))
    }
  },[dispatch, id/*, history, redirect*/])

  const removeFromcart = (id) =>{
    dispatch(removeFromCart(id))
  }

  const  CheckoutProcess = () =>{
    navigate('/shipping')
  }

  return <FormContainer>   
            <Col md={8}>
            <h1 className='text-center titles'>Shopping Cart</h1>
            {cartItems.length === 0 ? <p><Message className='text-warning-x text-center'>Your shopping cart is empty</Message> <Link to='/'><i className="fa fa-arrow-left text-warning-x " aria-hidden="true" > Back </i></Link> </p> : (
            <ListGroup variant='flush'>
                {
                  cartItems.map(item =>(
                    <ListGroupItem key={item.product}>
                        <Row>
                        <Col md={6}>
                        <video controls controlsList="nodownload" loop id="video" style={{width:'100%', height: '100%'}}>
                        <source src={`${item.filename}#t=20,30`} type="video/mp4" />
                        </video>
                        </Col>
                        
                        <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.title} {item.category} {item.price} </Link>
                        </Col>
                        <Col md={3}>
                        <Link type='button' variant='light' onClick={()=>removeFromcart(item.product)}><i className='fas fa-trash text-danger'></i></Link>
                        </Col>
                        </Row>

                        <hr/>

                        <Col md={4}>
        
        <ListGroup variant='flush'>
       
           <ListGroupItem>
       
           <h5 className='text-center'>
           SubTotal : 
             $ {cartItems.reduce((acc, item) => acc + item.price, 0)} 
           </h5>
          </ListGroupItem>
          
              
        </ListGroup>
        
      </Col>

      <hr/>

                        <div>
                        <Button type='button' variant='success' className='' disabled={cartItems.length === 0}
                        onClick={CheckoutProcess}
                        >
                          Proceed To Checkout 

                        </Button>
                    </div>
                  
                    </ListGroupItem>
                  ))
                }
            </ListGroup>
            )}
               
            </Col>
            
            <Link className='text-warning-x text-center' to={redirect ? `/market? redirect = ${redirect}` : '/market'}>
            </Link>
        </FormContainer>
}

export default CartProductScreen

{
  
}