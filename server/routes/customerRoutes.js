const express = require('express')
const multer = require('multer')
const router = express.Router()
const jsonwebtoken = require('jsonwebtoken')
const customerController = require('../apis/customer/customerController')
const userController = require('../apis/user/userController')
const categoryController = require('../apis/category/categoryController')
const reviewController = require('../apis/review/reviewController')
const bookingController = require('../apis/booking/bookingController')
const serviceController = require('../apis/service/serviceController')
const vendorController = require('../apis/vendor/vendorControler')

//service
router.post('/service/all',serviceController.serviceAll)
router.post('/service/single',serviceController.serviceSingle)

//vendor
router.post('/vendor/all',vendorController.vendorAll)
router.post('/vendor/single',vendorController.vendorSingle)

//login
router.post('/login',userController.login)

//register
router.post('/register',customerController.resgisterCustomer)

// category
router.post('/category/all',categoryController.categoryAll)
router.post('/category/single',categoryController.categorySingle)

//jwt
router.use(require('../middleware/tokenChecker'))

//change
router.post('/changePassword',userController.changePassword)
router.post('/changeStatus',userController.changeStatus)

//booking
router.post('/booking/add',bookingController.bookingAdd)
router.post('/booking/all',bookingController.bookingAll)
router.post('/booking/delete',bookingController.bookingDelete)

//review
const reviewStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./server/public/review')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const reviewUpload = multer({storage:reviewStorage})
router.post('/review/add',reviewUpload.single('image'),reviewController.reviewAdd)
router.post('/review/all',reviewController.reviewAll)
router.post('/review/update',reviewUpload.single('image'),reviewController.reviewUpdate)
router.post('/review/delete',reviewController.reviewDelete)


router.all('*',(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
module.exports= router