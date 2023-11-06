const { Schema , model} = require('mongoose')

const CommentSchema = Schema({
    content : {
        type: String,
        required: true
    },
    BlogId:{
        type: Schema.Types.ObjectId,
        ref:"blog"
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"users"
    },
},{timestamps:true})

const commentModel = model("comments", CommentSchema)

module.exports = commentModel;