const express =require('express');
const {courseCreate, getAllCourses, getSingleCourse, courseUpdate, courseDelete, getCourseUserLogin} = require('../controllers/courseController')
const router = express.Router();

const pases = require('../helpers/verifyToken')

router.post('/newCourse',pases, courseCreate)

router.get('/allCourses',getAllCourses)

router.get('/courseByUserLogin',pases, getCourseUserLogin)

router.get('/singleCourse/:id',pases, getSingleCourse)

router.put('/upgradeCourse/:id',pases, courseUpdate)
 
router.delete('/deleteCourse/:id',pases, courseDelete)


module.exports = router
