var mongoose = require("mongoose");
 
var ReplySchema = new mongoose.Schema({
    text: String,
    username: String
    }
);
 
module.exports = mongoose.model("Reply", ReplySchema);
