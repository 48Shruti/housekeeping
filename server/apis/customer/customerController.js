const bcrypt = require('bcrypt')
const customer = require("./customerModel")
const user = require('../user/userModel')
const resgisterCustomer = async(req,res)=>{
    let validation =""
    if(!req.body.name)
        validation +="customer name is required"
    if(!req.body.email)
        validation += "customer email is required"
    if(!req.body.address)
        validation += "customer address is required"
    if(!req.body.phoneNumber)
        validation += "customer phone number is required"
    if(!req.body.password)
        validation += "password is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        let prevRegister = await customer.findOne({email:req.body.email})
        if(!!prevRegister){ 
            res.send({
                success:false,
                status:500,
                message:"Registered already"
            })
        }
        else{
            let totalUser = await user.countDocuments()
            let newUser = new user()
            newUser.autoId = totalUser + 1
            newUser.name = req.body.name
            newUser.email = req.body.email
            newUser.password = bcrypt.hashSync(req.body.password,10)
            newUser.userType = 2
            newUser.save()
            .then( async savedRegister=>{
                if(!!savedRegister){
                    let totalCustomer = await customer.countDocuments()
                    let newCustomer = new customer()
                    newCustomer.autoId = totalCustomer + 1
                    newCustomer.name = req.body.name
                    newCustomer.address = req.body.address
                    newCustomer.email = req.body.email
                    newCustomer.phoneNumber = req.body.phoneNumber
                    newCustomer.userId = savedRegister._id
                    newCustomer.save()
                    .then(savedData=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"Account registered",
                            data:savedData
                        })
                    })
                    .catch(err=>{
                        res.send({
                            success:false,
                            status:500,
                            message:err.message
                        })
                    })
                }
            })
            .catch(err=>{
                res.send({
                    success:false,
                    status:500,
                    message:err.message
                })
            }) 
        }
    }
}
const customerAll = (req,res)=>{
    customer.find()
    .populate('user')
    .exec()
    .then((customerData)=>{
        res.send({
            success:true,
            status:200,
            message:"All customer is loaded",
            data:customerData
        })
    })
    .catch(err=>{
        res.send({
            success:false,
            status:500,
            message:err.message
        })
    })
}
const customerSingle = (req,res)=>{
    let validation = ""
    if(!req.body.autoId)
        validation += "autoId is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        customer.findOne(req.body.autoId).exec()
        .then((customerData)=>{
            if(customerData==null){
                res.send({
                    success:false,
                    status:500,
                    message:validation
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"Single customer details is loaded",
                    data:customerData
                })
            }
        })
        .catch(err=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    }
}



module.exports = {resgisterCustomer,customerAll,customerSingle}