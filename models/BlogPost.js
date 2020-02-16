const mongoose =require('mongoose');

//Schema
const Schema=mongoose.Schema;
const PostSchema=new Schema({
    title:String,
    date: String,
    newItem:String,

});
//Model
const BlogPost = mongoose.model('BlogPost',PostSchema);

module.exports= BlogPost;