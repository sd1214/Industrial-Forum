var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    parent_id:Object_Id[],
    username: String,
    text: String,
});
 
module.exports = mongoose.model("Comment", commentSchema);
