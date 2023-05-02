const mongoose = require("mongoose")

const citySchema = mongoose.Schema({
 
  city:String,
  IP:String
},
{
    versionKey:false
})

const CityModel = mongoose.model("city",citySchema)

module.exports = {CityModel}