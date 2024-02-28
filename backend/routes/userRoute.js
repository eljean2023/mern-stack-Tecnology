const express =require('express');
const {userSingUp, userSignIn, userProfile, userProfileUp, userDelete} = require('../controllers/userController')
const router = express.Router();

const pases = require('../helpers/verifyToken')

router.post('/singUp', userSingUp)

router.post('/login', userSignIn)

router.get('/profile', pases, userProfile)

router.put('/profile', pases, userProfileUp)

router.delete('/profile/:id', pases, userDelete)


module.exports = router