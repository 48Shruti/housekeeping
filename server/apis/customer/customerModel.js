const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    autoId: {type:Number,default:0},
    name :{type:String,default:""},
    email : {type:String,default:""},
    address :{type:String,default:""},
    phoneNumber:{type:Number,default:0},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})
module.exports = mongoose.model("customer",customerSchema)