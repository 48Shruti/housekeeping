const express = require('express')
const multer = require('multer')

const router = express.Router()
const categoryController = require('../apis/category/categoryController')
const adminDashboardController = require('../apis/dashboard/adminDashboardController')
const userController = require('../apis/user/userController')

//login
router.get('/login',userController.login)

//catergory without login
router.post('/category/all',categoryController.categoryAll)
router.post('/category/single',categoryController.categorySingle)

//json web token
//router.use(require('../middleware/tokenChecker'))

// category 
const categoryStorage = multer.diskStorage({destination:(req,filename,cb)=>{
    cb(null,'./server/public/category')
},
filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname)
}})
const categoryUpload = multer({storage:categoryStorage})
router.post('/category/add',categoryUpload.single('image'),categoryController.categoryAdd,categoryUpload.single('image'))
router.post('/category/update',categoryUpload.single('image'),categoryController.categoryUpdate)
router.post('/category/delete',categoryController.categorydelete)

// dashboard
router.get('/dashboard',adminDashboardController.dashboard)

router.all('*',(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
module.exports = router