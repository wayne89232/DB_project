'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($scope, $http) {

}).controller('League', function ($scope, $http, $location, $window) {
    $scope.leagues = [];
    $http({ method:"GET", url:'/league/list_league' }).success(function(leagues){
        $scope.leagues = leagues.msg;
    });
    $scope.add_league = function(){
        if($scope.name != null && $scope.city != null && $scope.year != null ){
            var data = {
                name: $scope.name, 
                city: $scope.city,
                year: $scope.year
            };
            $http({
                method: "POST", 
                url: '/api/add_league', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/League');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.view = function(id){
        $location.path('/league/'+id);
    }
}).controller('Team', function ($scope, $http, $location, $window) {
    $scope.teams = [];
    $http({ method:"GET", url:'/team/list_team' }).success(function(teams){
        $scope.teams = teams.msg;
    });
    $scope.add_team = function(){
        if($scope.name != null && $scope.school != null){
            var data = {
                name: $scope.name, 
                school: $scope.school
            };
            $http({
                method: "POST", 
                url: '/team/add_team', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/Team');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.view = function(id){
        $location.path('/team/'+id);
    }
}).controller('show_league', function ($scope, $http, $location, $window, $routeParams) {
    $http({ method:"GET", url:'/league/show_league/' + $routeParams.id }).success(function(result){
        var league = result.msg;
        $scope.league_name = league.league_name;
    });
}).controller('show_team', function ($scope, $http, $location, $window, $routeParams) {
    $http({ method:"GET", url:'/team/show_team/' + $routeParams.id }).success(function(result){
        var team = result.msg;
        $scope.team_name = team.team_name;
    });
    $scope.leagues = [];
    $http({ method:"GET", url:'/league/list_league' }).success(function(leagues){
        $scope.leagues = leagues.msg;
    });
    $scope.add_to_league = function(){
    $http({ method:"POST", url:'/team/add_to_league/' + $routeParams.id + '/' + $scope.add_league }).success(function(result){
        console.log(result.msg);
    });        
    }
});
