const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    parent_id:String,
    title: String,
    date: String,
    newItem: String,

});
//Model
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;