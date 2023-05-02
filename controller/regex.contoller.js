const jwt = require("jsonwebtoken")
//const Redis = require("ioredis")
require("dotenv").config()
//const {client} = require("../config/redis")

const regex = (req,res,next) =>{
    console.log(req.headers)
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if(token){
        const decoded = jwt.verify(token,process.env.Token)

        if(decoded){
            const reg =/^(25[0-5]|2[0-4][0-9]|[01]?[0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]?)/
            const IP = decoded.IP
            if(reg.test(IP)){
                next()
            }
            else{
                res.status(400).send({"msg":"IP address not valid"})
            }
        }
        res.status(400).send({"msg":"Forbiden...."})


    }
    else{
        res.status(400).send({"msg":"Please Login again..."})
    }

   
}

module.exports = {regex}