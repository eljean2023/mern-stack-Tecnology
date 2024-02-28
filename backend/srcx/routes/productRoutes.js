const express =require('express');
const {productCreate, getAllProducts, getSingleProduct, productUpdate, productDelete} = require('../controllers/productController')
const router = express.Router();

const pases = require('../helpers/verifyToken')

router.post('/newProduct', productCreate)

router.get('/allProducts', getAllProducts)

router.get('/singleProduct/:id', pases, getSingleProduct)

router.put('/upgradeProduct/:id', pases, productUpdate)
 
router.delete('/deleteProduct/:id', productDelete)


module.exports = router
