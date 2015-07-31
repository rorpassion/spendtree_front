var spendtreeControllers = angular.module('spendtreeControllers', []);
var loginAppControllers = angular.module('loginAppControllers', []);


spendtreeControllers.controller('clientsCtrl', ['$scope',
	function($scope){
	}]);
	
spendtreeControllers.controller('propertiesCtrl', ['$scope',
function($scope){
	Metronic.unblockUI();
	
	 $scope.units = [
        { id : 100, name : "upper" },
        { id : 101, name : "lower" },
        { id : 102, name : "middle" },
      ];
	  
	 
}]);	
spendtreeControllers.controller('dashboardCtrl', ['$scope','$http',
function($scope, $http){
	Metronic.unblockUI();
	
	//Get dashboard info
	//$http.get("./Controller.php")
//    .success(function(response) {$scope.units = response;});

	  
	 
}]);
