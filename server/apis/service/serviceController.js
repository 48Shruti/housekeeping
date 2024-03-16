const service = require('./serviceModel')
const serviceAdd = async(req,res)=>{
    let validation = ""
    if(!req.body.name)
    validation += "Enter a service name"
    if(!req.body.price)
    validation += "Enter a service price"
    if(!req.body.description)
    validation += "Enter a service description"
    if(!req.body.vendorId)
    validation += "Enter vendor Id"
    if(!req.body.categoryId)
    validation += "Enter categroy Id"
    if(!!validation){
        res.send({
            status : 500,
            success : false,
            message : validation
        })
    }
    else{
    let newService = new service()
    let total = await service.countDocuments()
    newService.name = req.body.name
    newService.price = req.body.price
    newService.description = req.body.description
    newService.categoryId = req.body.categoryId
    newService.autoId = req.body.autoId
    newService.vendorId = req.body.vendorId
    newService.autoId = total + 1
    newService.image = req.body.image

    newService.save()
    .then((serviceData)=>{
    res.send({
        success:true,
        status:200,
        message:"Account Created",
        data:serviceData
    })
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
const serviceAll = (req,res)=>{
    service.find()
    .populate('vendorId')
    .populate('categoryId')
    .exec()
    .then((serviceData)=>{
        res.send({
        success:true,
        status:200,
        message:"All documents loaded",
        data:serviceData
    })
})
    .catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:err.message
        })
    })
}
const serviceSingle = (req,res)=>{
    let validation = ''
    if(!req.body._id){
        validation += "Service id is required"
    }
    if(!!validation){
        res.send({success:false,
            status:500,
            message:validation})
    }
    else{
        service.findOne({_id:req.body._id}).exec()
        .then((serviceData)=>{
            if(serviceData == null){
                res.send({success:false,
                    status:500,
                    message:validation})
            }
            else{
            res.send({
                success:true,
                status:200,
                message:" Single Service loaded",
                data: serviceData
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
const serviceDelete = (req,res)=>{
    let validation = ''
    if(!req.body._id){
        validation += "Service id is required"
    }
    if(!!validation){
        res.send({success:false,
            status:500,
            message:validation})
    }
    else{
        service.findOne({_id:req.body._id}).exec()
    .then((serviceData)=>{
        if(serviceData == null){
            res.send({success:false,
            status:500,
        message:"Data doesnot exist"})
        }
        else{
            serviceData.status = false
            serviceData.save()
            .then((autoId)=>{
                res.send({success:true,
                    status:200,
                    message:"service data deleted",
                    data : autoId 
            })
        })
            .catch((err=>{
                res.send({
                    success:false,
                    status:500,
                    message:err.message
                })
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
const serviceUpdate = (req,res)=>{ 
    let validation = ""
    if(!req.body._id)
    validation += "_id is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation})
    }
    else{
        service.findOne({_id:req.body._id}).exec()
        .then((serviceData)=>{
            if(serviceData == null)
            {
                res.send({
                    success:false,
                    status:500,
                    message:"Data doesnot exist"})
            }
            else{
                if(!!req.body.name) 
                serviceData.name = req.body.name
                serviceData.price = req.body.price
                serviceData.save()
                .then((savedData)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Data is saved",
                        serviceData : savedData
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

module.exports = {serviceAdd,serviceAll,serviceSingle,serviceSingle,serviceUpdate,serviceDelete}