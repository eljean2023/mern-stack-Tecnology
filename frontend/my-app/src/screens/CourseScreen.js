import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link, redirect, useNavigate,useParams} from 'react-router-dom'
import FormContainer  from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {coursesActions} from '../actions/courseAction'
import { useLocation } from "react-router-dom";
import Message from '../components/Message'
import Loader from '../components/Loader';
import Table from 'react-bootstrap/Table';
import ReactPlayer from 'react-player'
import { matchPath } from 'react-router'
import SingleCourse from '../components/SingleCourse'

const CourseScreen = ({history}) => {
const location = useLocation()
const redirect = location.search ? location.search.split('=')[1] : '/'
const dispatch = useDispatch()
const courseList = useSelector(state=>state.courseList)
const{loading, error, courses} = courseList

const navigate = useNavigate()
const {id} = useParams()

//let history = match.params.param

useEffect(()=>{
    dispatch(coursesActions())
},[dispatch, history])

   console.log()

const AddToCart = () =>{
    navigate(`/cart`)
    
}
  return (
    <> 
       <h1 className='text-center titles'> Courses </h1>
       <Row>
          {
             courses.map((course)=>(
              <Col sm={12} md={6} lg={4} XL={3}> 
              <SingleCourse course={course}/>
              </Col>
             ))
          }
       </Row>
  
  <Form>

  <Link className='text-warning-x text-center' to={redirect ? `/profile? redirect = ${redirect}` : '/profile'}>
      <i className="fa fa-arrow-left" aria-hidden="true" > Back </i>
   </Link>
</Form>
  </>
  )
}


export default CourseScreen