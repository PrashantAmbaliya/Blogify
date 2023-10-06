const { Schema , Model} = require('mongoose')

const userSchema = new Schema({
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
        default: "/image/default.png"
    },
    role:{
        type : String,
        enum: ["USER","ADMIN"],
        default: "USER"
    }
})

const UserModel = Model("users", UserSchema)

module.exports = UserModel;