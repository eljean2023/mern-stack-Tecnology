const express =require('express');
const {productCreate, getAllProducts, getSingleProduct, productUpdate, productDelete, getProductUserLogin} = require('../controllers/productController')
const router = express.Router();

const pases = require('../helpers/verifyToken')

router.post('/newProduct',pases, productCreate)

router.get('/allProducts',getAllProducts)

router.get('/productByUserLogin',pases, getProductUserLogin)

router.get('/singleProduct/:id',pases, getSingleProduct)

router.put('/upgradeProduct/:id',pases, productUpdate)
 
router.delete('/deleteProduct/:id',pases, productDelete)


module.exports = router
