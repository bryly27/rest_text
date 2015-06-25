table.controller('homeController', function($scope, $location, $route, homeFactory, localStorageService) {
var socket = io.connect();

  getTodaysCustomers();

  function getTodaysCustomers(){
    homeFactory.getTodaysCustomers(function(results){
      $scope.customers = results;
      console.log(results);
    })
  }; 

  $scope.onlyNumbers = /^[0-9]+$/;
  $scope.onlyLetters = /^[a-zA-Z ]+$/;

  $scope.addCustomer = function(data){
    homeFactory.addCustomer(data, function(results){
      // console.log(results);
      $scope.newCustomer = null;
      $scope.callStatus = results.callStatus;
      getTodaysCustomers();
    })
  };

  socket.on('checkTime', function(){
    console.log('checking');
    homeFactory.updateWaitTime(function(results){
      getTodaysCustomers();
    })
  });

  $scope.getTimeWaited = function(startTime, waitTime){
    // console.log('here');
    // console.log('start time', startTime);
    // console.log('wait time', waitTime);
    var date1 = new Date(startTime);
    var date2 = new Date(waitTime);
    var diff = Math.abs(date1 - date2);
    var minutes = Math.floor((diff/1000)/60);
    return minutes;
  };

  $scope.getStandByTime = function(startTime, waitTime){
    console.log('hello there');
    var date1 = new Date(startTime);
    var date2 = new Date(waitTime);
    var diff = Math.abs(date1 - date2);
    var minutes = Math.floor((diff/1000)/60);
    return minutes;
  }


  $scope.startStandBy = function(data){
    console.log(data);
    homeFactory.startStandBy(data, function(results){
      console.log('ljdklfjsdlf', results);
      getTodaysCustomers();
    })
  };

  $scope.undoStandBy = function(data){
    homeFactory.undoStandBy(data, function(){
      getTodaysCustomers();
    })
  };

  $scope.checkIn = function(data){
    homeFactory.checkIn(data, function(){
      getTodaysCustomers();
    })
  }

  // $scope.add_con = function(data){
  // 	admin_factory.add_con(data,function(results){
  //     $route.reload();
  // 	});
  // };

  // $scope.con = {url_link: 'http://'};

  // admin_factory.get_cons(function(results){
  // 	$scope.cons = results;
  // });

  // $scope.delete_con = function(data){
  // 	admin_factory.delete_con(data, function(results){
  // 		$route.reload();
  // 	});
  // };

  // $scope.new_news = {photo_link: 'http://', date: new Date()};
  // $scope.new_blog = {photo_link: 'http://', date: new Date()};

  // $scope.add_news = function(data){
  //   data.type = 'news';
  //   admin_factory.add_news(data, function(results){
  //     $route.reload();
  //   });
  // };

  // admin_factory.get_news(function(results){
  //   $scope.news = results;
  // });

  // $scope.delete_news = function(data){
  //   admin_factory.delete_news(data, function(results){
  //     $route.reload();
  //   });
  // };

  // $scope.add_blog = function(data){
  //   data.type = 'blog';
  //   admin_factory.add_blog(data, function(results){
  //     $route.reload();
  //   });
  // };

  // admin_factory.get_blogs(function(results){
  //   $scope.blogs = results;
  // });

  // $scope.delete_blog = function(data){
  //   admin_factory.delete_blog(data, function(results){
  //     $route.reload();
  //   });
  // };

  // $scope.video_link = function(data){
  //   return data;
  // };

  // $scope.convert_html = function(data){
  //   return $sce.trustAsHtml(data);
  // };




})

