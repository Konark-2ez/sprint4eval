const jwt = require("jsonwebtoken")
const Redis = require("ioredis")
require("dotenv").config()
const {client} = require("../config/redis")

const auth = (req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]

    if(token){
        const decoded = jwt.verify(token,process.env.Token)
        if(decoded){
           
            next()
        }
        else{
            res.status(400).send({"msg":"Unauthorized"})
        }
       
    }
    else{
        res.status(400).send({"msg":"Please Login again"})
    }
  
}

module.exports = {auth}