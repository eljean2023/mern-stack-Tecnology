import React, {useState, useEffect} from 'react'
import {Link, redirect,useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {UserDetailsAction, UserUpdateAction, UserDeleteAction} from '../actions/userAction'
import {myOrdersActions} from '../actions/orderAction'
import {LinkContainer} from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Example  from '../components/MenuLat'
import FormContainer  from '../components/FormContainer'
import Card from 'react-bootstrap/Card';
import Message from '../components/Message'
import Loader from '../components/Loader';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';



function ProfileOrdersScreen({history}) {
const [message, setMessage] = useState(null)
const dispatch = useDispatch()

const userLogin = useSelector(state=>state.userlogin)
const{ userInfo} = userLogin

/*
const userUpdate = useSelector(state=>state.userUpdate)
const{ success} = userUpdate
*/

const userDetails = useSelector(state=>state.userDetails)
const{loading, error, user, success} = userDetails

const orderMyList = useSelector(state=>state.orderMyList)
const{loading: loadingOders, error: errorOrders, orders} = orderMyList

const navigate = useNavigate()

useEffect(()=>{
         if(!userInfo){
           navigate('/login')
         }

            dispatch(myOrdersActions())

},[dispatch, history,navigate, userInfo, user])

const onSubmitHandler = (e) =>{
    e.preventDefault()
    
   /* window.location = "/";*/
   //dispatch Register
} 

  return (
    <>
      <h1 className='titles animate__animated animate__bounceIn animate__delay-1s	3s'>My Orders</h1>
         <Card>
      <Card.Body>
        
        {loadingOders ? <Loader/> : errorOrders ? <Message>{errorOrders}</Message> : orders.length === 0 ? <Message>Your order is empty</Message> : (
          <Table stripped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order =>(<tr key={order._id}>
                  <td>{order._id}</td> 
                  <td>{order.createdAt}</td> 
                  <td> $  {order.totalPrice}</td> 
                  <td>{order.isPaid ? order.paidAt: (
                    <i className='fas fa-times' style={{color : 'red'}}></i>
                  )}</td> 
                    <td> <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light'> Details </Button>
                      </LinkContainer></td>
                </tr>))}
              </tbody>

          </Table>
        )}

        <Card.Text>
        <Col >
{message && <Message variant='danger'>{message}</Message>} 
{error && <Message variant='danger'>{error}</Message>}
{success && <Message variant='success'>My Orders</Message>}
{loading && <Loader/> }


            
            </Col>
        </Card.Text>
     </Card.Body>
       </Card>
       <ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item> 
                            

    </>
  )
}

export default ProfileOrdersScreen