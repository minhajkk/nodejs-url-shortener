var mongoose = require('mongoose');
var urlSchema = mongoose.Schema({
    url: {type: String, required:true},
    slug:String,
    ip: String,
    time: { type: Date, default: Date.now }
});
// NOTE: methods must be added to the schema before compiling it with mongoose.model()

var Url = mongoose.model('Url', urlSchema);
module.exports = Url;