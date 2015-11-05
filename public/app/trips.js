var app = angular.module('trips', []);

app.directive('tripSearchform', function() {
	return {
		restrict: 'E',
		templateUrl: '/html/trip-searchform.html'
	}
});

app.directive('tripElements', function() {
	return {
		restrict: 'E',
		templateUrl: '/html/trip-elements.html',
		controller: ['$http', function($http) {
			var trips = this;
			$http.get("http://localhost:3000/ws/trips/trip/7018749").success(function(data) {
				trips.tripsData = data;
			});
		}],
		controllerAs: 'tripCtrl'
	}
});