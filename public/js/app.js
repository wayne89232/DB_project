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
      templateUrl: 'partials/game_list',
      controller: 'Game'
    }).
    when('/School', {
      templateUrl: 'partials/school',
      controller: 'School'
    }).
    when('/City', {
      templateUrl: 'partials/city',
      controller: 'City'
    }).
    when('/Field', {
      templateUrl: 'partials/field',
      controller: 'Field'
    })
    .when('/Ban', {
      templateUrl: 'partials/ban',
      controller: 'Ban'
    })
    .when('/Umpire', {
      templateUrl: 'partials/umpire',
      controller: 'Umpire'
    })
    .when('/Broadcast', {
      templateUrl: 'partials/broadcast',
      controller: 'Broadcast'
    })
    .when('/add_school', {
      templateUrl: 'partials/add_school',
      controller: 'School'
    })
    .when('/add_city', {
      templateUrl: 'partials/add_city',
      controller: 'City'
    })
    .when('/add_ban', {
      templateUrl: 'partials/add_ban',
      controller: 'Ban'
    })
    .when('/add_field', {
      templateUrl: 'partials/add_field',
      controller: 'Field'
    })
    .when('/add_umpire', {
      templateUrl: 'partials/add_umpire',
      controller: 'Umpire'
    })
    .otherwise({
      redirectTo: '/'
    });

  
});
