var mongoose = require("mongoose");
 
var ReplySchema = new mongoose.Schema({
    username: String,
    text: String,
    created_date:String
    }
);
 
module.exports = mongoose.model("Reply", ReplySchema);
