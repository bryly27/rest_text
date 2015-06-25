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
			// console.log(req.body);
			// console.log(req.body.phone);
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
						url: "http://54.153.106.234/rest_text/reserved",
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

		  // Customers.update({$or:[{status:"waiting"}, {status:"standBy"}], startTime:{$gte:today, $lt: tomorrow}}, 
		  // 	{$set: {waitTime: now, standByWaitTime: now}}, {multi: true}, function(err, results){
		  // 	if(err){
		  // 		console.log('error', err);
		  // 	}else{
		  // 		res.json();
		  // 	}
		  // })

		  Customers.update({$and:[{$or:[{status:"waiting"}, {status:"standBy"}]}, {startTime:{$gte:today, $lt: tomorrow}}, {show:true}]}, {$set: {waitTime: now, standByWaitTime: now}}, {multi: true}, function(err, results){
		  	if(err){
		  		console.log("error", err);
		  	}else{
		  		res.json();
		  	}
		  })


	
		},

		startStandBy: function(req, res){
			var result = {};
			if(req.body.phone){
				if(req.body.callType === 'text'){
					twilio.messages.create({
						to: req.body.phone,
						from: twilioNumber,
						body: "Your table is now ready at 'Restaurant Name'. Please check in at the front counter. Thank you",	
					}, function(err, message){
						if(err){
							console.log('error', err);
							result.callStatus = "Text did not go through";
						}else{
							result.callStatus = "Text has been sent";
						}
						update(result);
					})
				}else{
					twilio.calls.create({
						url: "http://54.153.106.234/rest_text/standBy",
						to: req.body.phone,
						from: twilioNumber,
					}, function(err, call){
						if(err){
							console.log('error', err);
							result.callStatus = "Call did not go through";
						}else{
							result.callStatus = "Call has been sent";
						}
						update(result);
					})
				}
			}else{
				update();
			}

			function update(){
				var now = new Date();
				Customers.update({_id: req.body._id}, {$set: {standByStartTime: now, status:"standBy"}}, function(err, results){
					if(err){
						console.log('error', err);
					}else{
						res.json(result);
					}
				})
			}
		},

		undoStandBy: function(req, res){
			Customers.update({_id: req.body._id}, {$set:{status:"waiting"}, $unset: {standByStartTime: ""}}, function(err, results){
				if(err){
					console.log("error", err);
				}else{
					res.json();
				}
			})
		}, 

		checkIn: function(req, res){
			Customers.update({_id: req.body._id}, {$set: {status: "complete", completed: true}}, function(err, results){
				if(err){
					console.log("error", err);
				}else{
					res.json();
				}
			})
		}, 

		undoCheckIn: function(req, res){
			Customers.update({_id: req.body._id}, {$set: {status: "standBy", completed: false}}, function(err, results){
				if(err){
					console.log("error", err);
				}else{
					res.json();
				}
			})
		},

		removeCustomer: function(req, res){
			Customers.update({_id: req.body._id}, {$set: {show: false}}, function(err, results){
				if(err){
					console.log("error", err);
				}else{
					res.json();
				}
			})
		}, 

		undoRemove: function(req, res){
			Customers.update({_id: req.body._id}, {$set: {show: true}}, function(err, results){
				if(err){
					console.log("error", err);
				}else{
					res.json();
				}
			})
		}, 

		getAverageTime: function(req, res){
			var today = new Date();
		  today.setHours(0,0,0,0);
		  var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
			Customers.find({$and: [{completed: true}, {startTime:{$gte:today, $lt: tomorrow}}]}, function(err, results){
				if(err){
					console.log("error", err);
				}else{
					res.json(results);
				}
			})
		}



	




		

	}
})();


