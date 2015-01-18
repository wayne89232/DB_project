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
      templateUrl: 'partials/home',
      controller: 'AppCtrl'
    }).
    when('/League', {
      templateUrl: 'partials/add_league',
      controller: 'League'
    }).
    when('/Team', {
      templateUrl: 'partials/team',
      controller: 'Team'
    }).
    when('/league/:id', {
      templateUrl: 'partials/show_league',
      controller: 'show_league'
    }).
    when('/team/:id', {
      templateUrl: 'partials/show_team',
      controller: 'show_team'
    }).
    when('/Game', {
      templateUrl: 'partials/game',
      controller: 'Game'
    })
    .when('/teat', {
      templateUrl: 'partials/league',
      controller: 'League'
    .otherwise({
      redirectTo: '/'
    });

  
});
