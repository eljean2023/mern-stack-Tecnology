import React, {useEffect} from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {agendaUserActions, agendaDeleteAction} from '../actions/agendaAction'
import { useLocation } from "react-router-dom";
import Message from '../components/Message'
import Accordion from 'react-bootstrap/Accordion';
import { format } from 'date-fns'

const UserAgendaScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const dispatch = useDispatch()
const agendaListByUser = useSelector(state=>state.agendaListByUser)
const{loading, error, agendas} = agendaListByUser

const userDelete = useSelector(state=>state.productDelete)
const{ success : successDelete} = userDelete


const removeUser = (id) =>{
  if(window.confirm('Are you sure you to delete this event')){
    dispatch(agendaDeleteAction(id))
    window.location = "/useragenda"
  }
 
}

useEffect(()=>{
    dispatch(agendaUserActions())
},[dispatch, history, successDelete])


  return (
    <FormContainer> 
      {console.log(agendas)}
      {agendas.length === 0 ? <Message>Your events list is empty  <div className='messageMarge'>  
        <ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item> 
        </div> 
      </Message> 
      
      : ( <ListGroupItem variant='flush'>
      {
      agendas.map((agenda)=>{
        let linkx = `${agenda.link}`,
        linkxxx = linkx.split("v=")[1]?.split("&")[0]
       return <Accordion key={agenda._id} className='textColorProfileItems'>

        {/*
          {agenda.name}  {agenda.country}  {' '}  {agenda.statex}  {' '}  {agenda.address} {' '}  { format(new Date(agenda.date), 'dd/MM/yyyy')}
          {' '}  {agenda.hour} {' '}  {agenda.description} {' '} {' '}  {agenda.pricex}  {' '}   {agenda.status}   
        */}

        <div className='hitDown'>
          <div className='hitDown0'>
        {agenda.name} { format(new Date(agenda.date), 'dd/MM/yyyy')}
          {' '}    
        </div>
        <div className='centerEditDelete'>
          <Link type='button' variant='light' to={`/agendaUp/${agenda._id}`}> <i className='fas fa-edit text-success'> </i></Link> 
          <span className='separador'> / </span>
          <Link type='button' variant='light' onClick={()=>removeUser(agenda._id)}><i className='fas fa-trash text-danger'> </i></Link>
        </div> 
        </div>
        
       <div>
       <iframe className="pointer-events spaceDown"
                  src={`https://www.youtube.com/embed/${linkxxx}`}
                  frameborder="2"
                  controls={0}
                  
                  //allow="autoplay; encrypted-media"
                  //allowfullscreen
                  //title='video'

                />
         
       </div>
         
          
       {/*
          <div className='centerEditDelete'>
          <Link type='button' variant='light' to={`/agendaUp/${agenda._id}`}> <i className='fas fa-edit text-success'> </i></Link> 
          <span className='separador'> / </span>
          <Link type='button' variant='light' onClick={()=>removeUser(agenda._id)}><i className='fas fa-trash text-danger'> </i></Link>
             
          </div> 
       */}
         
    
          <hr/> 
          
          {/*<Accordion.Item eventKey="0">
          <Accordion.Header><video controls  controlsList="nodownload noplaybackrate nofullscreen" loop id="video" style={{width:'100%', height: '100%'}} >
          <source  src={`${product.filename}#t=20,30`} type="video/mp4" />
      </video></Accordion.Header>
         
          <Accordion.Body>

          <Link type='button' variant='light' to={`/productUp/${product._id}`}> <i className='fas fa-edit text-success'>Edit</i></Link> 
            / 
          <Link type='button' variant='light' onClick={()=>removeUser(product._id)}><i className='fas fa-trash text-danger'>remove</i></Link>
   
    
          </Accordion.Body>
                <strong> {product.title} </strong>
        </Accordion.Item> */}
        
        
      </Accordion>

     }
      
     )   
      }
        <ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item>  
      
      </ListGroupItem>
  )   }
  
  </FormContainer>
  )
}

export default UserAgendaScreen





