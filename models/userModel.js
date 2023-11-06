const { Schema , model} = require('mongoose')

const userSchema = Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String,
        default: "/images/default.png"
    },
    role:{
        type : String,
        enum: ["USER","ADMIN"],
        default: "USER"
    }
},{timestamps:true})

const UserModel = model("users", userSchema)

module.exports = UserModel;