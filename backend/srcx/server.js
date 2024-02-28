//Requirements
const express = require('express');
const path =require('path');
/*
const uuid =require('uuid');
const multer=require('multer');
*/
const dotenv = require('dotenv');
const cors = require('cors');
require('./database')
//Configurations
dotenv.config()
const app = express();

//Setting

app.set('PORT', process.env.PORT || 4500);

/*
//Multer 

const router = express.Router();

*/

//midleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

//Routes

app.use('/api', require('./routes/userRoute'))
app.use('/api', require('./routes/productRoutes'))
app.use('/api', require('./routes/uploadRoutes'))

//Static files
//const __dirname = path.resolve()
//app.use(express.static(path.join(__dirname, '/uploads'))); 
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static(path.join(__dirname, 'uploads')))
//Server Starting

app.listen(app.get('PORT'), ()=>{
    console.log(`The server is running on port ${app.get('PORT')}`)
})