var mongoose = require('mongoose');

var CustomersSchema = new mongoose.Schema({
	name: String,
	phone: String,
	size: String,
	note: String, 
	callType: String, 
	startTime: {type: Date, default: Date.now},
	waitTime: {type: Date, default: Date.now},
	standByStartTime: Date,
	standByWaitTime: {type: Date, default: Date.now},
	endTime: Date,
	completed: String,
});

mongoose.model('Customers', CustomersSchema);
