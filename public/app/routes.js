var app = angular.module('routes', []);

app.controller('SearchTripController', ['$http','$scope','$filter', function($http,$scope,$filter) {
	var ctrl = this;
	this.search = function() {
		$http.get("http://172.25.97.133:3000/ws/trips/route/" + $filter('uppercase')(this.routeCode)).success(function(data) {
		}).success(function(data){
			ctrl.trips = data;
		});
	};
}]);

app.controller('ShowRouteTripsController', ['$scope', function($scope) {
	console.log('Controller loaded');
	this.trips = $scope.routeTrips;
	console.log('trips at target: ' + $scope.routeTrips);
}]);

app.directive('routeSearchform', function() {
	return {
		restrict: 'E',
		templateUrl: '/html/route-searchform.html',
		controller: 'SearchTripController',
		controllerAs: 'searchTripCtrl'
	}
});

app.directive('routeTrips', function() {
	return {
		restrict: 'E',
		templateUrl: '/html/route-trip-elements.html',
		controller: 'SearchTripController',
		controllerAs: 'searchTripCtrl'
	}
});


