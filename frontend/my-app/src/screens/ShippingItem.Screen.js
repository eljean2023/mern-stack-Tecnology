import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, redirect, useNavigate,useParams} from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingItemScreen = ({history}) => {

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalcode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const navigate = useNavigate()

const onSubmitHandler = (e) =>{
    e.preventDefault()
    navigate(`/payment`)
    }   
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
           <h1> Shipping </h1>
        <Form onSubmit={onSubmitHandler}>
        
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label >Address</Form.Label>
        <Form.Control type="text" placeholder="Enter your name"  value={address} onChange={(e)=>setAddress(e.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label >City</Form.Label>
        <Form.Control type="text" placeholder="Enter your name"  value={city} onChange={(e)=>setCity(e.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label >Postal Code</Form.Label>
        <Form.Control type="text" placeholder="Enter your name"  value={postalcode} onChange={(e)=>setPostalCode(e.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label >country</Form.Label>
        <Form.Control type="text" placeholder="Enter your name"  value={country} onChange={(e)=>setCountry(e.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
        </Form.Group>
        <Button type='submit' variant='primary'> Continue </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingItemScreen