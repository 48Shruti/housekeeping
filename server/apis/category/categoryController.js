const category = require('./categoryModel')

const categoryAdd = async(req,res)=>{
    let validation = ""
    if(!req.body.name)
    validation +="Category name is required"
    if(!req.body.description)
    validation += "Category description is required"
    if(!req.file)
    validation += "Category image is required"
    if(!!validation)
    res.send({
        success : false,
        status : 500,
        message : validation
}) 
else{
    let total = await category.countDocuments()
    let newCategory = new category()
    newCategory.autoId =  total + 1
    newCategory.name = req.body.name
    newCategory.description = req.body.description
    newCategory.image =  "category/" + req.file.filename
    newCategory.save()
    .then((categoryData)=>{
    res.send({
        success:true,
        status:200,
        message:"Account Created",
        data:categoryData
    })
})
    .catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:err.message
    })
})
}
}
const categoryAll = (req,res)=>{
    category.find(req.body).exec()
    .then((categoryData)=>{
        res.send({
        success:true,
        status:200,
        message:"All documents loaded",
        data:categoryData
    })
})
    .catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:err.message
        })
    })
}

const categorySingle = (req,res)=>{
    let validation = ''
    if(!req.body._id){
        validation += "_id is required"
    }
    if(!!validation){
        res.send({success:false,
            status:500,
            message:validation})
    }
    else{
        category.findOne({_id:req.body._id}).exec()
        .then((categoryData)=>{
            if(categoryData == null){
                res.send({success:false,
                    status:500,
                    message:"Data doesnot exist"})
            }
            else{
            res.send({
                success:true,
                status:200,
                message:" Single Category loaded",
                data: categoryData
            })
        }
        })
        .catch(err=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    }  
}
const categorydelete = (req,res)=>{
    let validation = ''
    if(!req.body._id){
        validation += " _id is required"
    }
    if(!!validation){
        res.send({success:false,
            status:500,
            message:validation})
    }
    else{
    category.findOne({_id:req.body._id}).exec()
    .then((categoryData)=>{
        if(categoryData == null){
            res.send({success:false,
            status:500,
             message:"Data doesnot exist"})
        }
        else{
    
            categoryData.status = false
            categoryData.save()
            .then((autoId)=>{
                res.send({success:true,
                    status:200,
                    message:"category data deleted",
                   data:autoId
            })
        })
            .catch((err=>{
                res.send({
                    success:false,
                    status:500,
                    message:err.message
                })
            }))
        }
    })
    .catch(err=>{
        res.send({
            success:false,
            status:500,
            message:err.message
        })
    })
}
}
const categoryUpdate = (req,res)=>{ 
    let validation = ""
   if(!req.body._id)
    validation += "_id is required"

    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation})
    }
    else{
        category.findOne({_id:req.body._id}).exec()
        .then((categoryData)=>{
            if(categoryData == null)
            {
                res.send({success:false,
                    status:500,
                message:"Data doesnot exist"})
            }
            else{
                if(!!req.body.name) 
                categoryData.name = req.body.name
                if(!!req.body.description)
                categoryData.description = req.body.description
                if(!!req.file)
                categoryData.image = "category"+req.file.filename
                categoryData.save()
                .then((savedData)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Data is saved",
                        categoryData : savedData
                    })
                })
                .catch((err=>{
                    res.send({
                        success:false,
                        status:500,
                        message:err.message})
                }))
            }
        })
        .catch(err=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
        
    }
}
module.exports = {categoryAdd,categoryAll,categorySingle,categorydelete,categoryUpdate}