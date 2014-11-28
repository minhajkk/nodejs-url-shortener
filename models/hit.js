var mongoose = require('mongoose');
var hitSchema = mongoose.Schema({
    url: String,
    ip: String,
    time: { type: Date, default: Date.now }
});
var Hit = mongoose.model('Hit', hitSchema);
module.exports = Hit;