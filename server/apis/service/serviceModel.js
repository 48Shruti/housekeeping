const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema({
    autoId:{type :Number,default:0},
    vendorId:{type :mongoose.Schema.Types.ObjectId,default:null,ref:'vendor'},
    categoryId:{type :mongoose.Schema.Types.ObjectId,default:null,ref:'category'},
    name :{type:String,default:''},
    description:{type:String,default:''},
    image :{type:String,default:''},
    status:{type:Boolean,default:true},
    price :{type:Number,default:0},
    createdAt:{type:Date,default:Date.now()}
    
})
module.exports = mongoose.model('service',serviceSchema)