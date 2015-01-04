'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($scope, $http) {

}).controller('League', function ($scope, $http, $location, $window) {
    // write Ctrl here
    $scope.add_league = function(){
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
            $location.path('/view1');
        });
    }
});
