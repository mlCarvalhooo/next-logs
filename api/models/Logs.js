      
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	id: String,
    logs: [{
        message: String,
        time: Number
    }]
});

module.exports = mongoose.model('Device', deviceSchema);