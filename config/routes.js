// we are requiring a controller file that will do stuff when a route is triggered
var home = require('./../server/controllers/home.js');

module.exports = function(app) {

	
	app.get('/home/getTodaysCustomers', function(req, res){
		home.getTodaysCustomers(req, res);
	});

	app.post('/home/addCustomer', function(req, res){
		home.addCustomer(req, res);
	});

	app.post("/home/updateWaitTime", function(req, res){
		home.updateWaitTime(req, res);
	});

	app.post("/home/startStandBy", function(req, res){
		home.startStandBy(req, res);
	});

	app.post("/home/undoStandBy", function(req, res){
		home.undoStandBy(req, res);
	});

	app.post("/home/checkIn", function(req, res){
		home.checkIn(req, res);
	})

	

	

	


	

}