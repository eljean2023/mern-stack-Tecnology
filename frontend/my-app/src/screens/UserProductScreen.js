import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col,ListGroup, ListGroupItem} from 'react-bootstrap'
import {Link, redirect} from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {productUserActions, productDeleteAction} from '../actions/produtcAction'
import { useLocation } from "react-router-dom";
import Message from '../components/Message'
import Loader from '../components/Loader';
import Table from 'react-bootstrap/Table';
import ReactPlayer from 'react-player'
import Accordion from 'react-bootstrap/Accordion';


const UserProductScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const dispatch = useDispatch()
const productListUser = useSelector(state=>state.productListUser)
const{loading, error, products} = productListUser

const userDelete = useSelector(state=>state.productDelete)
const{ success : successDelete} = userDelete


//var linkx; //= `${products.link}`;
var linkxxx;

//linkxxx = linkx.split("v=")[1]?.split("&")[0];

const removeUser = (id) =>{
  if(window.confirm('Are you sure you to delete this product')){
    dispatch(productDeleteAction(id))
    window.location = "/userproducts"
  }
 
}

useEffect(()=>{
    dispatch(productUserActions())
},[dispatch, history, successDelete])


  return (
    <FormContainer> 
      {products.length === 0 ? <Message>Your product list is empty  <div className='messageMarge'>  
        <ListGroup.Item> <Link className='text-warning-x text-center ' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item> 
        </div> 
      </Message> 
      
      : ( <ListGroupItem variant='flush'>
      {
      products.map((product)=>{
        let linkx = `${product.link}`,
        linkxxx = linkx.split("v=")[1]?.split("&")[0]
       return <Accordion key={product._id} className='textColorProfileItems'>
          {/* {product.title}  {product.category}  {' '} $ {product.price}  */} 
          
          {product.name}  {/*product.link*/}  {' '} <div className='centerEditDelete'>
            
              
            

          <Link type='button' variant='light' to={`/productUp/${product._id}`}> <i className='fas fa-edit text-success'> </i></Link> 
          <span className='separador'> / </span>
          <Link type='button' variant='light' onClick={()=>removeUser(product._id)}><i className='fas fa-trash text-danger'> </i></Link>
          
          
          
          </div>
          
    
        <Accordion.Item eventKey="0" className='spaceDown'>
          <Accordion.Header>

          <iframe className="pointer-events spaceDown"
                  src={`https://www.youtube.com/embed/${linkxxx}`}
                  frameborder="2"
                  controls={0}
                  
                  //allow="autoplay; encrypted-media"
                  //allowfullscreen
                  //title='video'

                />

     
          
        {/*
         <video controls  controlsList="nodownload noplaybackrate nofullscreen" loop id="video" style={{width:'100%', height: '100%'}} >
          <source  src={`${product.link}#t=20,30`} type="video/mp4" />
      </video>
        */}

          </Accordion.Header>
         
          <Accordion.Body>
       
          <Link type='button' variant='light' to={`/productUp/${product._id}`}> <i className='fas fa-edit text-success'>Edit</i></Link> 
            / 
          <Link type='button' variant='light' onClick={()=>removeUser(product._id)}><i className='fas fa-trash text-danger'>remove</i></Link>
   
    
          </Accordion.Body>
                
        </Accordion.Item>
        <strong> {/*product.name*/} </strong>
      </Accordion>
     }
      
     )   
      }


        <ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item>  
 

      {
        /*
        
        <Table striped bordered hover size="sm">
  
    <tbody>
  
      {
        products.map((product)=>{
            return <tr key={product._id} className='market1'>
            <td className='text-warning-x'>{product.title}</td>
            <td>{product.category}</td>
            <td><video controls loop id="video" style={{width:'100%', height: '100%'}} >
                <source src={`${product.filename}`} type="video/mp4" />
            </video></td>
            <td> <Button className='btn btn-success'> Edit </Button> </td>
            <td> <Button className='btn btn-danger'> Delete </Button> </td>
            </tr>
        })
      }
     
    </tbody>
  </Table>
  
  <Form>

</Form>
<ListGroup.Item> <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
          <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
        </Link></ListGroup.Item>
        
        */
      }
      
      </ListGroupItem>
  )   }
  
  </FormContainer>
  )
}

export default UserProductScreen





