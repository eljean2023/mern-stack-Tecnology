import React, {useEffect} from 'react'
import { Link,useNavigate, useParams} from 'react-router-dom'
import {Row, Col, Card, Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {producSingleActions} from '../actions/produtcAction'
import Message from '../components/Message'
import Loader from '../components/Loader';
import FormContainer  from '../components/FormContainer'
import Accordion from 'react-bootstrap/Accordion';


const SingleProScreen = ({history}) => {
    const dispatch = useDispatch()
    const productSingle = useSelector(state=>state.productSingle)
    const{loading, error, product} = productSingle
    const navigate = useNavigate()
    const {id} = useParams()
    
useEffect(()=>{
    dispatch(producSingleActions(id))
}, [dispatch, id, history])

const AddToCart = () =>{
    navigate(`/cart/${id}`)
}
  return (
    <>
         <Link className='btn btn-light my-3' to='/'>
            Go Back
         </Link>

         {
            loading ? <Loader /> : error ? <Message variant='danger'> </Message> :
            (
                <FormContainer> 
      
     {
       <Accordion>
          {product.title}  {product.category} Price : $ {product.price}
        <Accordion.Item eventKey="0">
          <Accordion.Header>  <video  controls controlsList="nodownload" loop id="video" style={{width:'100%', height: '100%'}} >
                 <source src={`${product.filename}#t=20,30`} type="video/mp4" />
               </video></Accordion.Header>
         
          <Accordion.Body>
            <Button className='btn btn-success'> Edit </Button> 
            <Button className='btn btn-danger'> Delete </Button>
          </Accordion.Body>
          <a href={`/productUp/${product._id}`}>
              <strong> {product.title} </strong>
          </a> 
        </Accordion.Item>
        <Button onClick={AddToCart} className='btn-block' type='button'>
                               Add To Cart 
                           </Button>
      </Accordion>
              
        }
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
      
  </FormContainer>

               
            )
         }

    </>
  )
}

export default SingleProScreen