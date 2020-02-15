const mongoose =require('mongoose');

//Schema
const Schema=mongoose.Schema;
const PostSchema=new Schema({
    title:String,
    body:String,
    date: {
        type:String,
        default: Date.now()
    },
       comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
       ]
});
//Model
const BlogPost = mongoose.model('BlogPost',PostSchema);

module.exports= BlogPost;