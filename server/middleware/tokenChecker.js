const jwt = require('jsonwebtoken')
const SECRET = "housekeeping"

const check = (req,res, next)=>{
    let token = req.headers['authorization']
    if(!!token){
        jwt.verify(token , SECRET,(err,decoded)=>{
            if(err){
                res.send({
                    success:false,
                    status:403,
                    message:"Unauthorized"
                })
            }
            else{
                req.decoded = decoded //info of person
                next()
            }
        })
    }
    else{
        res.send({
            success:false ,
            status:403,
            message:"No token found"
        })
    }
}
module.exports= check