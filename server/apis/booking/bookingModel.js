const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    autoId:{type :Number,default:0},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,reg:'user'},
    vendorId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'vendor'},
    serviceId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'service'},
    price:{type:Number,default:0},
    bookingDate:{type:String,default:""}, 
    timings:{type:String,default:""} 
})
module.exports = mongoose.model('booking',bookingSchema)