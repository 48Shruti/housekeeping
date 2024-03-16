const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    serviceReview:{type:String,default:""}, //comment
    image:{type:String,default:"review/noimg.jpg"},
    ratings:{type:Number,default:0},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    vendorId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'vendor'},
    serviceId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'service'},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true}
})
module.exports = mongoose.model('review', reviewSchema)