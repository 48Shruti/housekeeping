const mongoose = require('mongoose')
const vendorSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    email:{type:String,default:""},
    address:{type:String,default:""},
    phoneNumber:{type:Number,default:0},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true},
    image:{type:String,default:'noimg.jpg'}
})
module.exports = mongoose.model('vendor',vendorSchema)