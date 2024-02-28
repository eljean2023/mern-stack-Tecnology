const mongoose =require('mongoose');

const {Schema} = mongoose;
const newProduct = new Schema({
   user : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'User' 
    },
    name : {type: String, require: true},
    link : {type: String, require: true},
    /*
    title : {type: String, require: true},
    category : {type: String, require: true},
    filename : {type: String, require: true },
    path : {type: String, required: true},
    price : {type: Number, required: true},
    */
    date : {type: Date, default: Date.now()}
})

module.exports= mongoose.model('Product', newProduct)