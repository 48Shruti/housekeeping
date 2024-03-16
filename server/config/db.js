//connections
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/housekeeping')
.then(()=>{
    console.log("dB connected")
})
.catch((err)=>{
    console.log("error in db connection",err)
})