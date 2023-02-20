const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/posts.route")
const {authenticate} = require("./user.authentication.middleware")
const  cors=require("cors")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({"msg":"Home Page"})
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)











app.listen(process.env.port,async()=>{
    await connection
    console.log(`server is running at port ${process.env.port}`)
})