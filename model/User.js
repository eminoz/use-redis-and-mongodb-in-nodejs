const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    address: String

})
module.exports = mongoose.model("redisuser", UserSchema)