'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($scope, $http) {

}).controller('League', function ($scope, $http, $location, $window) {
    // write Ctrl here
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
});
