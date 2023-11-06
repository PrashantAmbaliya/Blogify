const { Schema , model} = require('mongoose')

const blogSchema = Schema({
    title : {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true,
    },
    coverIMG : {
        type: String,
        required: false,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"users"
    },
    createdTime:{
        type: Number,
        default: Date.now(),
    }

},{timestamps:true})

const blogModel = model("blog", blogSchema)

module.exports = blogModel;