var mongoose = require("mongoose");
 
var ReplySchema = new mongoose.Schema({
    parent_id:String,
    title: String,
    date: String,
    newItem: String,
    }
);
 
module.exports = mongoose.model("Reply", ReplySchema);
