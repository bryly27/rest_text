var table = angular.module('table_wait', ['ngRoute', 'LocalStorageModule']);

table.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

table.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
		})
		.when('/reserved',{
			templateUrl: '../static/xml/reserved.xml',
		})
		.otherwise({
			redirectTo: '/'
		})

		$locationProvider.html5Mode(true);
})