var mongoose = require('mongoose');

var CustomersSchema = new mongoose.Schema({
	name: String,
	phone: String,
	size: String,
	note: String, 
	startTime: {type: Date, default: Date.now},
	waitTime: {type: Date, default: Date.now},
	minutesWaited: String, 
	standByTime: Date,
	endTime: Date,
	completed: Boolean,
});

mongoose.model('Customers', CustomersSchema);
