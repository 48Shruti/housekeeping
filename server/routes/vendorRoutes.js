const express = require('express')
const  router = express.Router()
const categoryController = require('../apis/category/categoryController')
const dashboardController = require('../apis/dashboard/vendorDashboardController')
const userController = require('../apis/user/userController')
const vendorController = require('../apis/vendor/vendorControler')
const bookingController = require('../apis/booking/bookingController')
const serviceController = require('../apis/service/serviceController')
const reviewController = require('../apis/review/reviewController')


//register
router.post('/register',vendorController.resgisterVendor)

//category
router.post('/category/all',categoryController.categoryAll)
router.post('/category/single',categoryController.categorySingle)

// other vendors service show only without login 
router.post('/service/all',serviceController.serviceAll)
router.post('/service/single',serviceController.serviceSingle)

//login 
router.post('/login',userController.login)

//json web token 
//router.use(require('../middleware/tokenChecker'))
//change
router.post('/changePassword',userController.changePassword)
router.post('/changeStatus',userController.changeStatus)

//booking
router.post('/booking/all',bookingController.bookingAll)
router.post('/booking/single',bookingController.bookingSingle)

//service
router.post('/service/add',serviceController.serviceAdd)
router.post('/service/update',serviceController.serviceUpdate)
router.post('/service/delete',serviceController.serviceDelete)

//dashboard
router.get('/dashboard', dashboardController.dashboard)

//review
router.post('/review/all',reviewController.reviewAll)
router.post('/review/single',reviewController.reviewSingle)

router.all('*',(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
module.exports = router