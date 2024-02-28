const mongoose =require('mongoose');

const {Schema} = mongoose;

const newOrder = new Schema({
   /* user : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'User' 
    },
*/

    user : {type: String},

    orderItems : [
        {
            title : {type: String, require: true},
            category : {type: String, require: true},
            filename : {type: String, require: true },
            price : {type: Number, required: true},
            product : {
                type : mongoose.Schema.Types.ObjectId,
                       require : true,
                       ref : 'Product' 
            }
        }
    ],
    /*
    shippingAddress : {
        address : {type: String, require: true},
        city : {type: String, require: true},
        postalCode : {type: String, require: true },
        country : {type: Number, required: true},
    },
*/
    paymentMethod : {
        type: String, require: true
    },

    paymentResult : {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String}
    },

    taxPrice : {
        type: Number, require: true,
        default : 0.00
    },

    taxShipping : {
        type: Number, require: true,
        default : 0.00
    },
    totalPrice : {
        type: Number, require: true,
        default : 0.00
    },
    isPaid : {
        type: Boolean, require: true,
        default : false
    },

    paidAt : {
        type: Date
    }, 

    isDelivered  :{
        type: Boolean, require: true,
        default : false
    },

    deliveredAt :{
        type : Date
    },
    
    date : {type: Date, default: Date.now()}
})



module.exports= mongoose.model('Order', newOrder)