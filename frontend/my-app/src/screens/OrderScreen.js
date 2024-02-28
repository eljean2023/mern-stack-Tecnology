import React, {useState, useEffect} from 'react'
import {Button,Row, Col,ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import {orderSigleDetailsAction, orderPayAction} from '../actions/orderAction'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAY_RESET} from '../constants/order'

const Order = ({history}) => {
    
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)

    const orderSingleDetails = useSelector(state=>state.orderSingleDetails)
    const {order, loading, error } = orderSingleDetails 

    const orderPay = useSelector(state=>state.orderPay)
    const {loading :loadingPay, success : successPay } = orderPay

    if(!loading){
        //Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100 ).toFixed(2)
    }
    order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item)=>acc + item.price, 0)
    )
    
    }

    const {id} = useParams()
    const[sdkReady, setSdkReady] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        const addPaypallScript = async () =>{
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type='text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay ){
            dispatch({type : ORDER_PAY_RESET})
            dispatch(orderSigleDetailsAction(id))
        }
        else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPaypallScript()
                }
            }
            else{
                setSdkReady(true)
            }
        }
        //addPaypallScript()
        
    },[dispatch, order, id, successPay])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(orderPayAction(id, paymentResult))
    }


  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
  : <>
        <h1 className='titles'>Your Order :  {order._id}</h1>
    <Row>
<Col md={8}>
      <ListGroup variant='flush'>
          <ListGroupItem>
                
          </ListGroupItem>
          
          <ListGroupItem>
          <p>
              <h2> Payment Method </h2>
              <strong>Method : </strong>
              {order.paymentMethod}
          </p>  
          {
            order.isPaid ? (<Message variant='success'>Paid on {order.PaidAt} </Message>) :(
                <Message variant='danger'> Not Paid </Message>
            )
          }
          </ListGroupItem>

          <ListGroupItem>
              <h2> Order Items </h2>
              {order.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
                  <ListGroupItem variant='flush'>
                      {order.orderItems.map((item, index) =>(
                          <ListGroupItem key={index}>
                              <Row >
                                  <Col>
                                  <video controls  controlsList="nodownload noplaybackrate nofullscreen" loop id="video" style={{width:'100%', height: '100%'}} >
                                       <source  src={`${item.filename}#t=20,30`} type="video/mp4" />
                                  </video>
                                  </Col>
                                  <Col>
                                  <Link to={`/product/${item.product}`}> {order.title} </Link>
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
                                       
                                  <ListGroup.Item> <h2> Order Summary </h2> </ListGroup.Item>
                                       <ListGroup.Item> 
                                          <Row>
                                          <Col> item price </Col>
                                          <Col> $ {order.itemsPrice}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      
                                      <ListGroup.Item> </ListGroup.Item>
                                       <ListGroup.Item> 
                                          <Row>
                                          <Col> Tax </Col>
                                          <Col> $ {order.taxPrice}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      
                                      <ListGroup.Item> 
                                          <Row>
                                          <Col> Total price </Col>
                                          <Col> $ {order.totalPrice}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                        
                                      {!order.isPaid && (
                                            <ListGroup.Item> 
                                                {loadingPay  && <Loader/>}
                                                {!sdkReady ? <Loader/>:(
                                                 <PayPalButton
                                                 amount={order.totalPrice}
                                                 onSuccess={successPaymentHandler}
                                                 />
                                                )}
                                            </ListGroup.Item> 
                                        )

                                        }
                                     
                                  </ListGroup>
                                  </Card>                             
                          </ListGroup>
                      </Col>
                  </Row>
  </>
}

export default Order

