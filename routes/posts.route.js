const express = require("express")
const {PostModel} = require("../model/posts.model")


const postRouter = express.Router()



postRouter.get("/",async(req,res)=>{
console.log(req.body)
const userid = req.body.user
const posts = await PostModel.find({user:userid})

res.send(posts)


})

postRouter.post("/create",async(req,res)=>{

try{

const payload = req.body;
console.log(payload)
const post = new PostModel(payload)
     await post.save()
     res.send(payload)
}
catch(err){

    res.send({"msg":"Cannot add the data"})

}


})



postRouter.patch("/update/:id",async(req,res)=>{

const id = req.params.id

const payload = req.body;
const loginid  =payload.user

const  datapresentindb = await PostModel.findOne({_id:id})

const idfromdb  = datapresentindb.user

try{


if(loginid!=idfromdb){
    res.send({"msg":"you are not authorized"})
}
else{
    await PostModel.findByIdAndUpdate({_id:id},payload)
    res.send({"msg":"data has been updated"})

}

}
catch(err){

    res.send({"msg":"you are not authorized"})


}

})




postRouter.delete("/delete/:id",async(req,res)=>{

    const id = req.params.id
    
    const payload = req.body;
    const loginid  =payload.user
    
    const  datapresentindb = await PostModel.findOne({_id:id})
    
    const idfromdb  = datapresentindb.user
    
    try{
    
    
    if(loginid!=idfromdb){
        res.send({"msg":"you are not authorized"})
    }
    else{
        await PostModel.findByIdAndDelete({_id:id})
        res.send({"msg":"data has been deleted"})
    
    }
    
    }
    catch(err){
    
        res.send({"msg":"you are not authorized"})
    
    
    }
    
    })
    
    



    postRouter.get("/device",async(req,res)=>{
        console.log(req.query)
      
        const {device} = req.query
        const posts = await PostModel.find({device:device})

res.send(posts)
        
        })


        postRouter.get("/getdevices",async(req,res)=>{
            console.log(req.query)
          
            const {device1,device2} = req.query
            console.log(device1,device2)
            const posts = await PostModel.find({device:device1,device:device2})
    
    res.send(posts)
            
            })




module.exports={
    postRouter
}


// {
//     "title":"third",
//     "body":"post",
//     "device":"Tablet",
//     "no_if_comments":2
  
//   }

