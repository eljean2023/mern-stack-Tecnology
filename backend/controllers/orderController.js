const Order =require('../models/Order')

// Create Order 

const createOrderItems = async(req,res)=>{
    const {orderItems,/*shippingAddress,*/paymentMethod, /*paymentResult,*/ itemPrice, taxPrice,/* shippingPrice,*/ totalPrice} = req.body;

        if(orderItems && orderItems.length === 0){
            res.status(400).json({message : 'No order items' }) 
            return
        }else{
            const newOrder = new Order({orderItems,/*shippingAddress*/ paymentMethod, itemPrice, taxPrice,/* shippingPrice*/ totalPrice})
             newOrder.user = req.user.id
            await newOrder.save()
            res.json({
            order : newOrder
             })
            }
}
    // Get order by id

    const orderById = async(req, res) =>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }
    else{
        res.status(404).json('Order not found')
    }
}

 // Get order by product 

 const updateOderToPaid = async(req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.email_address
        }
        const updatedOrder  = await order.save()
        res.json(updatedOrder)
    }
    else{
        res.status(404).json('Order not found')
    }
}

// Get single order from user login 
const getOrdersUserLogin = async(req, res) =>{
    const orders = await Order.find({user: req.user.id}).sort({ date: -1 })
    console.log(req.user.id)
    return res.json(orders)
 }

module.exports = {
    createOrderItems, orderById, updateOderToPaid, getOrdersUserLogin
}

//new ObjectId("643067bea256efe1fa0567e2")