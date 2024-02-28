const mongoose =require('mongoose');

const {Schema} = mongoose;
const newAgenda = new Schema({
   user : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'User' 
    },
    name : {type: String, require: true},
    link : {type: String, require: true},
    /*date : {type: String, require: true},
    country : {type: String, require: true},
    statex : {type: String, require: true},
    address : {type: String, require: true},
    status : {type: String, require: true},
    filename : {type: String},
    description : {type: String, require: true},
    pricex : {type: Number, required: true},
    */
    date : {type: Date, default: Date.now()}
})

module.exports= mongoose.model('Agenda', newAgenda)