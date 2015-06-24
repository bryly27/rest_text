var mongoose = require('mongoose');

var TablesSchema = new mongoose.Schema({
	name: String,
	phone: String,
	size: String,
	note: String, 
	startTime: {type: Date, default: Date.now},
	standByTime: Date,
	endTime: Date,
	completed: Boolean,
});

mongoose.model('Tables', TablesSchema);
