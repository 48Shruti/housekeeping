const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('.server/public'))
const db = require('./server/config/db')
const seed = require('./server/config/seeder')

const customerRoutes = require('./server/routes/customerRoutes')
app.use("/customer",customerRoutes)

const adminRoutes = require('./server/routes/adminRoutes')
app.use("/admin",adminRoutes)

const vendorRoutes = require('./server/routes/vendorRoutes')
app.use("/vendor",vendorRoutes)

app.get('/',(req, res)=>{
    res.send("Welcome to Server")
})

app.listen(PORT, (err)=>{
    if(err){
        console.log("Error Occured", err);
    }
    else console.log("Server Is Running")
})