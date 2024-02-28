import React, {useState, useEffect} from 'react'
import {Button,Row, Col,ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import {orderAddAction} from '../actions/orderAction'

const Placeorder = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const orderAdd = useSelector(state=>state.orderAdd)
    const {order, success, error } = orderAdd

    console.log(order)

    const navigate = useNavigate()

    //Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100 ).toFixed(2)
    }
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item)=>acc + item.price, 0)
    )
    
    cart.taxPrice = (addDecimals(Number((0.10 * cart.itemsPrice).toFixed(2))))

    cart.totalPrice = Number(cart.itemsPrice) +  Number(cart.taxPrice)

    useEffect(()=>{
        if(success){
          navigate(`/order/${order.order._id}`)
          
        }
        // eslint-disable-next-line
    },[history, success])

    const placeorder = () =>{
       dispatch(orderAddAction(
        {
            orderItems : cart.cartItems,
            itemsPrice : cart.itemsPrice,
            taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice,
            paymentMethod : cart.paymentMethod,

        }
       ))
    }


  return (
    <FormContainer> 
       <CheckoutSteps step1 step2 step3 step4/>
       <Row>
          <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2> Shipping </h2>
                    </ListGroupItem>
                    
                    <ListGroupItem>
                        <h2> Payment Method </h2>
                        <strong>Method : </strong>
                        {cart.paymentMethod}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2> Order Items </h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                            <ListGroupItem variant='flush'>
                                {cart.cartItems.map((item, index) =>(
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col>
                                            <video controls controlsList="nodownload noplaybackrate nofullscreen" loop id="video" style={{width:'100%', height: '100%'}} >
                                                 <source  src={`${item.filename}#t=20,30`} type="video/mp4" />
                                            </video>
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.product}`}> {item.title} </Link>
                                            </Col>
                                            <Col>
                                            <Link> $ {item.price} </Link>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}    
                            </ListGroupItem>
                        )}
                    </ListGroupItem>
                   
                                            <Card>
                                            <ListGroup variant='flush'>
                                                 
                                            <ListGroup.Item> <h2> Oder Summary </h2> </ListGroup.Item>
                                                 <ListGroup.Item> 
                                                    <Row>
                                                    <Col> item price </Col>
                                                    <Col> $ {cart.itemsPrice}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                
                                                <ListGroup.Item> </ListGroup.Item>
                                                 <ListGroup.Item> 
                                                    <Row>
                                                    <Col> Tax </Col>
                                                    <Col> $ {cart.taxPrice}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                
                                                <ListGroup.Item> 
                                                    <Row>
                                                    <Col> Total price </Col>
                                                    <Col> $ {cart.totalPrice}</Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item >{ error &&  <Message variant='danger'> {error} </Message> } </ListGroup.Item>
                                                <ListGroupItem>
                                                <Button type='button' className='btn btn-block' disabled={cart.cartItems === 0}
                                                 onClick={placeorder}
                                                > Place Oder </Button>
                                                </ListGroupItem>
                                            </ListGroup>
                                            </Card>                             
                                    </ListGroup>
                                </Col>
                            </Row>
                        </FormContainer> 
  )
}

export default Placeorder