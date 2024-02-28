import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const SearchEvents = ({history}) => {

    const [keywork, setKeywork] = useState('')

const navigate = useNavigate() 

const submitHandler = (e) =>{
    e.preventDefault()
    if(keywork.trim()){
        /*history.push(`/search/${keywork}`)*/
        navigate(`/search/${keywork}`)
    }
    else{
       /*history.push(`/search/${keywork}`)*/
        navigate('/')
    }
}

  return (
    <Form onSubmit={submitHandler} inline>
        <Form.Control
            type='text'
            name='q'
            onChange={(e)=>setKeywork(e.target.value)}
            placeholder='Search Events'
            className='mr-sm-2 ml-sm-5'
            >
        </Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>  Search </Button>
    </Form>
  )
}

export default SearchEvents