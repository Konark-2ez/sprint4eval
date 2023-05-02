const express = require("express")
require("dotenv").config()
//const  {CityModel} = require("../model/city.model")
const {regex} = require("../controller/regex.contoller")
const cityRouter = express.Router()

//

cityRouter.get("/enterIP/:IP",regex,async(req,res)=>{
  const ip =  req.params.IP
  const url = `https://ipapi.co/${ip}/{city}/`
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>{res.send(data)

    client.mset(ip,data,'EX',21600000)
})
  .catch(err=>console.log(err))
})


module.exports = {cityRouter}