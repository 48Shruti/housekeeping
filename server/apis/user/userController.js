const bcrypt = require('bcrypt')
const user = require('./userModel')
const jwt = require('jsonwebtoken')
const SECRET = "housekeeping"
const login = (req,res)=>{
    let validation = ""
    if(!req.body.email){
        validation += "Email is required"
    }
    if(!req.body.password){
        validation += "password is required"
    }
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        user.findOne({email:req.body.email}).exec()
        .then(data=>{
            if(data==null){
                res.send({
                    success:false,
                    status:500,
                    message:"Data doesnot exists"
                })
            }
            else{
                if(bcrypt.compareSync(req.body.password,data.password)){
                    if(data.status){
                        let payload = {
                            _id : data._id,
                            name : data.name,
                            email:data.email,
                            userType:data.userType
                        }
                        let token = jwt.sign(payload,SECRET)
                        res.send({
                            success:true,
                            status:200,
                            message:"Account exist",
                            data : data,
                            token : token
                        })
                    }
                    else{
                        res.send({
                            success:false,
                            status:500,
                            message:"account inactive"
                        })
                    }
                }
                else{
                    res.send({
                        success:false,
                        status:500,
                        message:"Invalid accredentials"
                    })
                }
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
const changeStatus = (req,res)=>{
    let validation = ""
    if(!req.body._id)
        validation += "_id is required"
    if(!req.body.status)
        validation += "status is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        user.findOne({_id:req.body._id}).exec()
        .then(data=>{
            if(data == null){
                res.send({
                    success:false,
                    status:500,
                    message:"Data doesnot exist"
                })
            }
            else{
                data.status = req.body.status
                data.save()
                .then(data=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Status is changed",
                        data:data
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
    }
}
const changePassword =(req,res)=>{
    let validation = ""
    if(!req.body._id)
        validation += "_id is required"
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
        user.findOne({_id:req.body._id}).exec()
        .then(data =>{
            if(data == null){
                res.send({
                    success:false,
                    status:500,
                    message:"_id doesnot exist so cannot change password"
                })
            }
            else{
                        data.password = bcrypt.hashSync(req.body.password,10)
                        data.save()
                        .then(data=>{
                            res.send({ success:true,
                                status:200,
                                message:"Password is changed successfully",
                                data:data})        
                        })
                        .catch(err=>{
                            res.send({success:false,
                                status:500,
                                message:err.message})
                        })
           }
        })
        .catch(err=>{
            res.send({ success:false,
                status:500,
                message:err.message
            })
        })

    }
}
const userSingle = (req,res)=>{
    let validation =""
    if(!req.body._id)
        validation += "_id is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        user.findOne({_id:req.body._id}).exec()
        .then((userData)=>{
            if(userData==null){
                res.send({
                    success:false,
                    status:500,
                    message:"Data doesnot exist"
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"Single data is loaded",
                    data:userData
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
const userDelete = (req,res)=>{
    let validation =""
    if(!req.body._id)
        validation ="_id is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        user.findOne({_id:req.body._id}).exec()
        .then((userData)=>{
            if(userData== null){
                res.send({
                    success:false,
                    status:500,
                    message:" User Data doesnot exists"
                })
            }
            else{
                userData.status = false
                userData.save()
                .then(()=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"User data is deleted",
                        data:_id
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
const userUpdate = (req,res)=>{ 
    const validation = ""
   if(!req.body._id)
    validation = "Id is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation})
    }
    else{
        user.findOne({_id:req.body._id}).exec()
        .then((userData)=>{
            if(userData == null)
            {
                res.send({success:false,
                    status:500,
                message:"Data doesnot exist"})
            }
            else{
                if(!!req.body.name) 
                userData.name = req.body.name
                if(!!req.body.email)
                userData.email = req.body.email
                userData.save()
                .then((savedUser)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Data is saved",
                        userData : savedUser
                    })
                })
                .catch((err=>{
                    res.send({
                        success:false,
                        status:500,
                        message:err.message})
                }))
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
module.exports = {login,userSingle,userDelete,userUpdate,changeStatus,changePassword}