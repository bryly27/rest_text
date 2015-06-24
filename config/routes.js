// we are requiring a controller file that will do stuff when a route is triggered
var tables = require('./../server/controllers/table.js');

module.exports = function(app) {

	
	app.get('/home/getTodaysCustomers', function(req, res){
		tables.getTodaysCustomers(req, res);
	});

	app.post('/home/addCustomer', function(req, res){
		tables.addCustomer(req, res);
	});

	

	

	


	

}