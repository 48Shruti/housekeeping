const review = require('./reviewModel')
const reviewAdd = async(req,res)=>{
    let validation = ""
    if(!req.body.serviceReview)
    validation += "Enter a review serviceReview"
    if(!req.body.ratings)
    validation += "Enter a review ratings"
    if(!req.body.userId)
    validation += "Enter a review userId"
    if(!req.body.serviceId)
    validation += "Enter serviceId"
    if(!!validation){
        res.send({
            status : 500,
            success : false,
            message : validation
        })
    }
    else{
    let newReview = new review()
    let total = await review.countDocuments()
    newReview.serviceReview = req.body.serviceReview
    newReview.ratings = req.body.ratings
    newReview.vendorId = req.body.vendorId
    newReview.serviceId = req.body.serviceId
    newReview.userId = req.body.userId
    newReview.image = "review/"+req.file.filename
    newReview.autoId = total + 1

    newReview.save()
    .then((reviewData)=>{
    res.send({
        success:true,
        status:200,
        message:"Account Created",
        data:reviewData
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
const reviewAll = (req,res)=>{
    review.find()
    .populate('vendorId')
    .populate('serviceId')
    .populate('userId')
    .exec()
    .then((reviewData)=>{
        res.send({
        success:true,
        status:200,
        message:"All documents loaded",
        data:reviewData
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
const reviewSingle = (req,res)=>{
    let validation = ''
    if(!req.body._id){
        validation += "_id is required"
    }
    if(!!validation){
        res.send({success:false,
            status:500,
            message:validation})
    }
    else{
        review.findOne({_id:req.body._id}).exec()
        .then((reviewData)=>{
            if(reviewData == null){
                res.send({success:false,
                    status:500,
                    message:validation})
            }
            else{
            res.send({
                success:true,
                status:200,
                message:" Single Review loaded",
                data: reviewData
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
const reviewDelete = (req,res)=>{
    let validation = ''
    if(!req.body._id){
        validation += "_id is required"
    }
    if(!!validation){
        res.send({success:false,
            status:500,
            message:validation})
    }
    else{
    review.findOne({_id:req.body._id}).exec()
    .then((reviewData)=>{
        if(reviewData == null){
            res.send({success:false,
            status:500,
            message:"Data doesnot exist"})
        }
        else{
            reviewData.status = false
            reviewData.save()
            .then((autoId)=>{
                res.send({success:true,
                    status:200,
                    message:"review data deleted",
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
const reviewUpdate = (req,res)=>{ 
    let validation = ""
    if(!req.body._id)
       validation += "_id is required"
    if(!req.body.serviceReview)
        validation += "serviceReview is required"
    if(!req.body.ratings)
        validation += "ratings is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation})
    }
    else{
        review.findOne({_id:req.body._id}).exec()
        .then((reviewData)=>{
            if(reviewData == null)
            {
                res.send({success:false,
                    status:500,
                message:"Data doesnot exist"})
            }
            else{
                if(!!req.body.serviceReview) 
                reviewData.serviceReview = req.body.serviceReview
                reviewData.ratings = req.body.ratings
                if(!!req.file)
                reviewData.image = "review/" + req.file.filename
                reviewData.save()
                .then((savedData)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Data is saved",
                        reviewData : savedData
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
module.exports ={reviewAdd,reviewAll,reviewSingle,reviewDelete,reviewUpdate}