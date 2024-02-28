const express =require('express');
const router = express.Router();

const { createOrderItems, orderById, updateOderToPaid, getOrdersUserLogin} = require('../controllers/orderController')

const pases = require('../helpers/verifyToken')

router.post('/newOrder',pases, createOrderItems)
router.get('/singleOrder/:id',pases, orderById)
router.get('/OrdersUserLogin',pases, getOrdersUserLogin)
router.put('/orderPay/:id/pay',pases, updateOderToPaid)

module.exports = router