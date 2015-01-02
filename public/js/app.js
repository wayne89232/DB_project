'use strict';

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/add_league',
      controller: 'AppCtrl'
    }).
    when('/view1', {
      templateUrl: 'partials/add_league',
      controller: 'League'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/view3', {
      templateUrl: 'partials/partial3',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/'
    });

  
});
