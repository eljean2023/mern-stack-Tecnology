import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, redirect, useNavigate,useParams} from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savepaymentMethod} from '../actions/cartAction '

const PaymentScreen = ({history}) => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()

const onSubmitHandler = (e) =>{
    e.preventDefault()
    dispatch(savepaymentMethod(paymentMethod))
    navigate(`/placeorder`)
    }   
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
           <h1> Payment Method </h1>
        <Form onSubmit={onSubmitHandler}>
        <Form.Group> Select the payment method 
        <Form.Label as='legend'></Form.Label>
        <Col>
        <Form.Check
            type='radio'
            label = 'Credit Card or Paypal'
            id = 'Paypal'
            name ='paymentMethod'
            value = 'Paypal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
        >
       </Form.Check>

       <Form.Check
            type='radio'
            label = 'Stripe'
            id = 'Stripe'
            name ='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
        >
       </Form.Check>

        </Col>
        </Form.Group>
        <Button type='submit' className='btn btn-success'> Continue </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen