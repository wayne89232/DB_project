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
    when('/add', {
      templateUrl: 'partials/add',
      controller: 'Add'
    }).
    when('/League', {
      templateUrl: 'partials/league',
      controller: 'League'
    }).
    when('/Team', {
      templateUrl: 'partials/team',
      controller: 'Team'
    }).
    when('/Game', {
      templateUrl: 'partials/game_list',
      controller: 'Game'
    }).
    when('/Details', {
      templateUrl: 'partials/details',
      controller: 'Details'
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
    .when('/game/:id', {
      templateUrl: 'partials/game_stat',
      controller: 'game_stat'
    })
    .when('/team/:id', {
      templateUrl: 'partials/show_team',
      controller: 'show_team'
    })
    .when('/add_league', {
      templateUrl: 'partials/add_league',
      controller: 'League'
    })
    .when('/league/:id', {
      templateUrl: 'partials/show_league',
      controller: 'show_league'
    })    
    .when('/add_team', {
      templateUrl: 'partials/add_team',
      controller: 'Team'
    })
    .otherwise({
      redirectTo: '/home'
    });

  
});
