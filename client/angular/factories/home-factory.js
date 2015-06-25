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
		data.completed = "waiting";
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
	// factory.register = function(data, callback){
	// 	$http.post('/users/register', data).success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.login = function(data, callback){
	// 	$http.post('/users/login', data).success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.add_con = function(data, callback){
	// 	$http.post('/admin/add_con', data).success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.get_cons = function(callback){
	// 	$http.get('/news/get_cons').success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.delete_con = function(data, callback){
	// 	$http.post('/admin/delete_con', data).success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.add_news = function(data, callback){
	// 	$http.post('/admin/add_news', data).success(function(results){
	// 		callback(results);
	// 	});
	// };




	return factory;
})

