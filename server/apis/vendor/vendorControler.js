const bcrypt = require('bcrypt')
const vendor = require('./vendorModel')
const user = require('../user/userModel')
const resgisterVendor = async(req,res)=>{
    let validation =""
    if(!req.body.name)
        validation +="vendor name is required"
    if(!req.body.email)
        validation += "vendor email is required"
    if(!req.body.address)
        validation += "vendor address is required"
    if(!req.body.phoneNumber)
        validation += "vendor phone number is required"
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
        let prevRegister = await vendor.findOne({email:req.body.email})
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
            newUser.userType = 3
            newUser.save()
            .then( async savedRegister=>{
                if(!!savedRegister){
                    let totalVendor = await vendor.countDocuments()
                    let newVendor = new vendor()
                    newVendor.autoId = totalVendor + 1
                    newVendor.name = req.body.name
                    newVendor.address = req.body.address
                    newVendor.email = req.body.email
                    newVendor.phoneNumber = req.body.phoneNumber
                    newVendor.userId = savedRegister._id
               //     newVendor.image = req.file.fileName
                    newVendor.save()
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
const vendorAll = (req,res)=>{
    vendor.find()
    .populate('userId')
    .exec()
    .then((vendorData)=>{
      res.send({
        success:true,
        status:200,
        message:"All vendors are loaded",
        data:vendorData
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
const vendorSingle = (req,res)=>{
    let validation = ""
    if(!req.body._id)
        validation += "Vendor Id is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        vendor.findOne({_id:req.body._id}).exec()
        .then((vendorData)=>{
            if(vendorData == null){
                res.send({
                    success:false,
                    status:500,
                    message:"Data doesnot exists"
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"Single vendor loaded",
                    data:vendorData
                })
            }
        })
        .catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    }

}

module.exports = {resgisterVendor,vendorAll,vendorSingle}