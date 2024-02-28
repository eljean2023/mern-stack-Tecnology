const mongoose =require('mongoose');
const bcrypt =require('bcryptjs')

const {Schema} = mongoose;
const newUser = new Schema({
    name : {type: String, require: true},
    email : {type: String, require: true, unique: true},
    password : {type: String, require: true},
    isAdmin : { type: Boolean, require:true, default:false} ,
    date : {type: Date, default: Date.now()}
})

newUser.methods.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

newUser.methods.comparePassword =async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports= mongoose.model('User', newUser)
