const booking = require('../booking/bookingModel')
const customer = require('../customer/customerModel')
const review = require('../review/reviewModel')


const dashboard = async(req,res)=>{

    let start = new Date()
    start.setHours(0,0,0,0)

    let end = new Date()
    end.setHours(29,59,59,999)

    let dateFilter = {createdAt :{ $gt:start ,$lt:end}}
    let totalBooking = await booking.countDocuments(dateFilter)
    let totalCustomers = await customer.countDocuments()
    let totalReview = await review.countDocuments(dateFilter)
    res.send({
        success:true,
        status:200,
        message : "Vendor Dashboard loaded",
        data:{
            totalBooking:totalBooking,
            totalCustomers:totalCustomers,
            totalReview:totalReview
        }
    })
}
module.exports= {dashboard}