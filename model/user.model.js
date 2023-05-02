const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:String,
    password:String,
    ip:String
},
{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}