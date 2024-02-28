const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passkeys =  async function(req, res, next) {
 const token = req.headers['authorization']
    if(!token){
       return res.status(404).json({message : 'Invalid Token'});
    }
    
   const coded = jwt.verify(token, process.env.MY_SECRETKEY);
   req.user = await User.findById(coded.id).select('-password')
   
   next()
}

module.exports = passkeys