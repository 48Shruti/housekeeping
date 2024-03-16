const booking = require('./bookingModel')
const bookingAdd = async(req,res)=>{
    let validation =""
    if(!req.body.serviceId)
        validation += "service Id is required"
    if(!req.body.vendorId)
        validation +="vendor Id is required"
    if(!req.body.userId)
        validation += "user Id is required"
    if(!req.body.price)
        validation += "price is required"
    if(!req.body.bookingDate)
        validation += "bookingDate is required"
    if(!req.body.timings)
        validation += "timings is required"
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
    let newBooking = new booking()
    let total = await booking.countDocuments()
    newBooking.autoId = total + 1
    newBooking.vendorId = req.body.vendorId
    newBooking.serviceId = req.body.serviceId
    newBooking.userId = req.body.userId
    newBooking.price = req.body.price
    newBooking.bookingDate = req.body.bookingDate
    newBooking.timings = req.body.timings
    newBooking.save()
    .then((bookingData)=>{
        res.send({
            success:true,
            status:200,
            message:"Account Created",
            data:bookingData
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
const bookingAll = (req,res)=>{
    booking.find()
    .populate('vendorId')
    .populate('serviceId')
    .populate('userId')
    .exec()
    .then((bookingData)=>{
        res.send({
            success:true,
            status:200,
            message:"All bookings are loaded",
            data:bookingData
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
const bookingSingle = (req,res)=>{
    let validation = ""
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
        booking.findOne({_id:req.body._id}).exec()
        .then((bookingData)=>{
            if(bookingData == null){
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
                    message:"Single booking data is loaded",
                    data:bookingData
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
const bookingDelete = (req,res)=>{
    let validation = ""
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
        booking.findOne({_id:req.body._id}).exec()
        .then((bookingData)=>{
            if(bookingData == null){
                res.send({
                    success:false,
                    status:500,
                    message:"Data doesnot exist"
                })
            }
            else{
                bookingData.status = false
                bookingData.save()
                .then((autoId)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Booking data is deleted",
                        data:autoId
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
                success:true,
                status:500,
                message:err.message
            })
        })
    }
}
module.exports = {bookingAdd,bookingAll,bookingSingle,bookingDelete}