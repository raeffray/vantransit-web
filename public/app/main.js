var app = angular.module('main-transit', ['trips','routes']);

app.directive('pageHead', function() {
	return {
		restrict: 'E',
		templateUrl: '/html/page-head.html'
	}
});

app.directive('pageBottom', function() {
	return {
		restrict: 'E',
		templateUrl: '/html/page-bottom.html'
	}
});

