const express = require("express")

const {UserModel} = require("../model/user.model")
const jwt = require("jsonwebtoken")

const {client} = require("../config/redis")
require("dotenv").config()

const userRouter = express.Router()

//register user

userRouter.post("/register",async(req,res)=>{
    const {email,password} =req.body
    try {
        const userEx = await UserModel.findOne({email})
        if(userEx){
            res.status(400).send({"msg":"User already present"})
        }
        
       
        const user = new UserModel({email,password})
        await user.save()
        res.status(200).send({"msg":"User succesfully registered"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
//login
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const userExist = await UserModel.findOne({email})
        if(!userExist){
            res.status(400).send({"msg":"User doesnot exist, register first"})
        }
        const token = jwt.sign({userid:userExist._id},process.env.Token,{expiresIn:240})
        

        res.status(200).send({"msg":"Login Successfull",token})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//logout
userRouter.get("/logout",async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try {
        if(!token){
            res.status(400).send({"msg":"Unaccesible try again"})
        }
        const decoded =jwt.verify(token,process.env.Token)
        if(!decoded){
            res.status(400).send({"msg":"Forbidden"})
        }
        console.log(decoded)
        client.mset("blackListed",decoded)
        res.status(200).send({"msg":"Logout Succesful"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {userRouter}
