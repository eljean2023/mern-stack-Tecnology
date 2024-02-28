const express = require('express');
const Product =require('../models/Product')


// Get data list 

const getAllProducts = async(req, res) =>{
    const products = await Product.find()
    return res.json(products)
 }
 
// Insert data (Product)

const productCreate= async(req,res)=>{
    const {title,category, price, filename} = req.body;
    console.log(req.body)
    if(!title){
       return res.status(404).json({message :'Title is required'})
    }
    if(!category){
        return res.status(404).json({message :'Category is required'})
     }
     if(!price){
        return res.status(404).json({message :'price is required'})
     }
     console.log(req.body)
     console.log(req.body.price)
     const newProduct = new Product({title, category, price, filename})
     newProduct.filename =req.body.filename;
     newProduct.path = 'uploads/' + req.body.filename; 
     
    await newProduct.save()
    
    res.json({
        message : newProduct
    })
    }

// Get a single product 

const getSingleProduct = async(req, res) =>{
    const product = await Product.findById(req.params.id)
    return res.json(product)
 }
 

// Product Update
const productUpdate = async(req, res) =>{
    const {title, category,price, recordSon} = req.body;
    const NewProductUp =  {title, category,price, recordSon} ;
    await Product.findByIdAndUpdate(req.params.id, NewProductUp)
    res.json({message: 'Product Updated'})
 }

 // Delete Product

 const productDelete = async(req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.json({message: 'Product Deleted'})
 }
 

module.exports = {
    productCreate, getAllProducts, getSingleProduct, productUpdate, productDelete
}