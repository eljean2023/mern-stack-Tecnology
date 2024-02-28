const express = require('express');
const Course =require('../models/Course')


// Get data list 

const getAllCourses = async(req, res) =>{
    const courses = await Course.find()
    return res.json(courses)
 }

 // Get courses from user login 
const getCourseUserLogin = async(req, res) =>{
    const courses = await Course.find({user: req.user.id}).sort({ date: -1 })
    return res.json(courses)
 }



// Insert data (Product)

const courseCreate= async(req,res)=>{
    const {name, link /* title,category, price, filename */} = req.body;
    console.log(req.body)
    if(!name){
       return res.status(404).json({message :'Name is required'})
    }
    if(!link){
        return res.status(404).json({message :'Link is required'})
     }
     {/*
     if(!price){
        return res.status(404).json({message :'price is required'})
     }
     console.log(req.body)
      console.log(req.body.price)
     const newProduct = new Product({title, category, price, filename})
     newProduct.filename =req.body.filename;
     newProduct.path = 'uploads/' + req.body.filename;  */}
     const newCourse = new Course({name, link/* title, category, price, filename */})
     newCourse.user = req.user
     console.log('a ver a ver que ' + req.user.id)
    await newCourse.save()
    
    res.json({
        message : newCourse
    })
    }

// Get a single product 

const getSingleCourse = async(req, res) =>{
    const course = await Course.findById(req.params.id)
    return res.json(course)
 }
 

// Product Update
const courseUpdate = async(req, res) =>{
    const {name, link/* title, category,price, filename */} = req.body;
    const NewCourseUp =  {name, link/*title, category, price, filenam*/} ;
    await Course.findByIdAndUpdate(req.params.id, NewCourseUp)
    res.json({message: 'Course Updated'})
 }

 // Delete Product

 const courseDelete = async(req, res) => {
    await Course.findByIdAndRemove(req.params.id);
    res.json({message: 'Course Deleted'})
 }
 

module.exports = {
    courseCreate, getAllCourses, getSingleCourse, courseUpdate, courseDelete, getCourseUserLogin
}