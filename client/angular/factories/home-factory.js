table.factory('homeFactory', function($http) {
	var factory= {};


	factory.getTodaysCustomers = function(callback){
		$http.get('/home/getTodaysCustomers').success(function(results){
			callback(results);
		})
	}


	factory.addCustomer = function(data, callback){
		$http.post('/home/addCustomer', data).success(function(results){
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

	// factory.get_news = function(callback){
	// 	$http.get('/news/get_news').success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.delete_news = function(data, callback){
	// 	$http.post('/news/delete_news', data).success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.add_blog = function(data, callback){
	// 	$http.post('/admin/add_blog', data).success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.get_blogs = function(callback){
	// 	$http.get('/news/get_blogs').success(function(results){
	// 		callback(results);
	// 	});
	// };

	// factory.delete_blog = function(data, callback){
	// 	$http.post('/news/delete_blog', data).success(function(results){
	// 		callback(results);
	// 	});
	// };



	return factory;
})

