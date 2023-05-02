require("dotenv").config()

const Redis =require("ioredis")

let configuration = {
    host:"redis-14336.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port:14336,
    username:"default",
    password:process.env.REDIS_PASSWORD
}
const client = new Redis(configuration)
module.exports = {client}