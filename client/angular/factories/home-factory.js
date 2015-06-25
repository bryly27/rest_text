table.factory('homeFactory', function($http) {
	var factory= {};


	factory.getTodaysCustomers = function(callback){
		$http.get("/home/getTodaysCustomers").success(function(results){
			callback(results);
		})
	}


	factory.addCustomer = function(data, callback){
		data.name = data.name.replace(/\w\S*/g, function(txt){
		  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
		if(data.phone){
			data.phone = "+1" + data.phone;
		};
		data.show = true;
		data.completed = false;
		data.status = "waiting";
		$http.post("/home/addCustomer", data).success(function(results){
			callback(results);
		})
	}

	factory.updateWaitTime = function(callback){
		$http.post("/home/updateWaitTime").success(function(){
			callback();
		})
	}

	factory.startStandBy = function(data, callback){
		$http.post("/home/startStandBy", data).success(function(results){
			callback(results);
		})
	}

	factory.undoStandBy = function(data, callback){
		$http.post("/home/undoStandBy", data).success(function(){
			callback();
		})
	}

	factory.checkIn = function(data, callback){
		$http.post("/home/checkIn", data).success(function(){
			callback();
		})
	}

	factory.undoCheckIn = function(data, callback){
		$http.post("/home/undoCheckIn", data).success(function(){
			callback();
		})
	}

	factory.removeCustomer = function(data, callback){
		$http.post("/home/removeCustomer", data).success(function(){
			callback();
		})
	}

	factory.undoRemove = function(data, callback){
		$http.post("/home/undoRemove", data).success(function(){
			callback();
		})
	}

	factory.getAverageTime = function(callback){
		$http.get("/home/getAverageTime").success(function(results){
			callback(results);
		})
	}








	return factory;
})

