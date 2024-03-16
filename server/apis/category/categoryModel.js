const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    autoId:{type :Number,default:0},
    name :{type:String,default:''},
    image :{type:String,default:'category/noimg.jpg'},
    description :{type:String,default:''},
    createdAt :{type:Date,default:Date.now()},
    status:{type:Boolean,default:true}
})
module.exports = mongoose.model('category',categorySchema)