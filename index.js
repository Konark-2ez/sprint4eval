const express = require("express")
require("dotenv").config()
const {connection} =require("./config/db")
const {auth} =require("./controller/auth.controller")
const {userRouter} = require("./route/userRoute")
const {cityRouter} = require("./route/cityRoute")
const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(auth)
app.use("/city",cityRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is listening to port 3050")
})