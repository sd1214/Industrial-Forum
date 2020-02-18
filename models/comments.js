const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    parent_id:String,
    child_id:String,
    comment_by:String,
    newItem:String,
    n_date:String,
    replied_to:String
});
//Model
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;