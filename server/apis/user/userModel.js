//create schema
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    autoId:{type :Number,default:0},
    name :{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    userType:{type:Number,default:2},//user or customer 1 for admin and 2 for customer 3 for vendor
    createAt:{type:Date,default:Date.now},//date of create account
    status:{type:Boolean,default:true}
   // _id:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'} //use to find status of user that if it is false then use cannot used
})
module.exports = mongoose.model('user',userSchema)