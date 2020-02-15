var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    username: String,
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply"
        }
       ]
    }
);
 
module.exports = mongoose.model("Comment", commentSchema);
