var mongoose = require('mongoose');
var Customers = mongoose.model('Customers');
var twilio = require('twilio')('AC4d99d349185f14364eaf7b3aca938fe5', '6b7ea64cebd0434fb846ecd1c68eb0d8');
var twilioNumber = "+14152879680";

module.exports = (function() {
	return {

		getTodaysCustomers: function(req, res){
		 var today = new Date();
		 today.setHours(0,0,0,0);
		 var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
		 Customers.find({startTime: {
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
			var newCustomer = new Customers(req.body);
			var result = {};
			console.log(req.body);
			console.log(req.body.phone);
			if(req.body.phone){
				// req.body.phone = "+1"+req.body.phone;
				if(req.body.callType === 'text'){
					twilio.messages.create({
						to: req.body.phone,
						from: twilioNumber,
						body: "This is a message from 'Restaurant Name', we will notify you when your table is ready. Thank you",	
					}, function(err, message){
						if(err){
							console.log('error', err);
							result.callStatus = "Text did not go through";
						}else{
							result.callStatus = "Text has been sent";
						}
							save();
					})
				}else{
					twilio.calls.create({
						url: "http://54.153.106.234/rest_text",
						to: req.body.phone,
						from: twilioNumber,
					}, function(err, call){
						if(err){
							console.log('error', err);
							result.callStatus = "Call did not go through";
						}else{
							result.callStatus = "Call has been sent";
						}
							save();
					})
				}
			}else{
				result.callStatus = "No number was entered";
				save();
			}

			function save(){			
				newCustomer.save(function(err, results){
					if(err){
						console.log('error', err);
						result.saveStatus = false;
					}else{
						result.saveStatus = true;
						res.json(result);
					}
				})
			}

		}, 

		updateWaitTime: function(req, res){
			var now = new Date();
			var today = new Date();
		  today.setHours(0,0,0,0);
		  var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

		  Customers.update({completed:false, startTime:{$gte:today, $lt: tomorrow}}, 
		  	{$set: {waitTime: now}}, {multi: true}, function(err, results){
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


