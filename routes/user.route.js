const express = require("express")
const {UserModel} = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()


userRouter.post("/register",async(req,res)=>{

const {name,email,gender,password,age,city} = req.body

  let checkuser =  await UserModel.find({email:email})
  if(checkuser.length>0){
    res.send({"msg":"User already exist, please login"})
  }
   else{

    try{
   
        bcrypt.hash(password,5,async(err,hash)=>{

        if(err){
            res.send({"msg":"Something went wrong"})
        }

        else{

           const user = new UserModel({name,email,gender,password:hash,age,city})
                 await user.save()
                 res.send({"msg":"Account created"})
        }


        })
   


    }

catch(err){
       res.send({"msg":"something went wrong"})

}

   }

})



userRouter.post("/login",async(req,res)=>{

const {email,password} = req.body;

try{

const user = await UserModel.find({email})

if(user.length>0){

bcrypt.compare(password,user[0].password,(err,result)=>{

if(result){

let token = jwt.sign({userID:user[0]._id},"masai")

res.send({"msg":"Logged In","token":token})

}
else{
    res.send("Wrong Credentials")
}


})




}else{
    res.send({"msg":"Login first"})
}


}
catch(err){

    res.send({"error":err.message})
}

})

module.exports={
    userRouter
}



// {
//     "name":"keerti",
//     "email":"keerti@gmail.com",
//     "gender":"male",
//     "password":"keerti",
//      "age":22,
//     "city":"sarni"
//   }