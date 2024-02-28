const User = require('../models/User');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs')

const userSingUp= async(req,res)=>{
const {name,email, password} = req.body;

const existUser =await User.findOne({email});

if(existUser){
   return res.status(404).json({message :'Invalid email'})
}

const newUser = new User({
    name, email, password
})

newUser.password = await newUser.encryptPassword(password)
await newUser.save()


const token = jwt.sign({id: newUser.id}, process.env.MY_SECRETKEY)


res.json({
    message : "Welcome to your profile", newUser, token 
})
}

const userSignIn= async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})

   
    
    if(user && (await user.comparePassword(password))){
      const token = jwt.sign({id: user._id}, process.env.MY_SECRETKEY)
      res.json({
         message: `Welcome to login page ${user.name}`, user, token
      })
    } else{
      return res.status(404).json({message: 'Invalid email or Password'})
    }

    

    /*
    if(!user){
       return res.status(404).json({message : 'El email no exist'})
    }

    const validatePassword = await User.findOne({password})

    if(!validatePassword){
       return res.status(404).json({message : 'Invalid password'})
    }
    */
   

   
   }

// User profile
const userProfile = async(req, res) =>{
   //const user = await User.findById(req.params.id)
   const user = await User.findById(req.user._id)
   if(!user){
      return res.status(404).json({message : 'invalid id'})
   }
  return res.json(user)
}

/*
const salt = await bcrypt.genSaltSync(10)
const hashPass = await bcrypt.hashSync(password, salt)
*/

// User Profile Update
const userProfileUp = async(req, res) =>{
   const {name, email} = req.body;
   const NewProfileUp =  {name, email,  password: bcrypt.hashSync(req.body.password, 10)} ;
   await User.findByIdAndUpdate(req.user._id, NewProfileUp)
   //const user = await User.findById(req.user._id)
   res.json({message: 'User Updated'})
}

// User Delte (Close account)
 const userDelete = async(req, res) => {
   await User.findByIdAndRemove(req.params.id);
   res.json({message: 'Profile Deleted'})
}




module.exports = {
    userSingUp, userSignIn, userProfile, userProfileUp, userDelete
}