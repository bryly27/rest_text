var mongoose = require('mongoose');
var Table = mongoose.model('Tables');

module.exports = (function() {
	// return because we want to put an object into the variable for whatever requires this
	return {


		getTodaysCustomers: function(req, res){
		 var today = new Date();
		 today.setHours(0,0,0,0);
		 var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
		 console.log('today', today);
		 console.log('tomorrow', tomorrow);
		 Table.find({startTime: {
        $gte: today,
        $lt: tomorrow
    }}, function(err, results){
		 	if(err){
		 		console.log('error', err);
		 	}else{
		 		res.json(results);
		 	}
		 })	
		},



		addCustomer: function(req, res){
			var newCustomer = new Table(req.body);
			newCustomer.save(function(err, results){
				if(err){
					console.log('error', err);
				}else{
					res.json();
				}
			})

		}



		// get_cons: function(req, res){
		// 	Con.find({}, function(err, results){
		// 		if(err){
		// 			console.log('error', err);
		// 		}else{
		// 			res.json(results)
		// 		}
		// 	})
		// },


	




		

	}
})();


