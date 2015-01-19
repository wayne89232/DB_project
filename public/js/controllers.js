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
}).controller('City', function ($scope, $http, $location, $window) {
    $scope.cities = [];
    $http({ method:"GET", url:'/city/list_city' }).success(function(cities){
        $scope.cities = cities.msg;
    });
    $scope.add_city = function(){
        if($scope.name != null){
            var data = {
                name: $scope.name
            };
            $http({
                method: "POST", 
                url: '/api/add_city', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add_city');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
}).controller('Field', function ($scope, $http, $location, $window) {
    $scope.fields = [];
    $http({ method:"GET", url:'/field/list_field' }).success(function(fields){
        $scope.fields = fields.msg;
    });
    $scope.add_field = function(){
        if($scope.city != null && $scope.type != null && $scope.distance != null ){
            var data = {
                city: $scope.city, 
                type: $scope.type,
                distance: $scope.distance
            };
            $http({
                method: "POST", 
                url: '/api/add_field', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add_field');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
}).controller('School', function ($scope, $http, $location, $window) {
    $scope.schools = [];
    $http({ method:"GET", url:'/school/list_school' }).success(function(schools){
        $scope.schools = schools.msg;
    });
    $scope.add_school = function(){
        if($scope.name != null){
            var data = {
                name: $scope.name
            };
            $http({
                method: "POST", 
                url: '/api/add_school', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add_school');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
}).controller('Ban', function ($scope, $http, $location, $window) {
    $scope.bans = [];
    $http({ method:"GET", url:'/ban/list_ban' }).success(function(bans){
        $scope.bans = bans.msg;
    });
    $scope.add_ban = function(){
        if($scope.player != null && $scope.game != null && $scope.num != null && $scope.description != null ){
            var data = {
                player: $scope.player,
                game: $scope.game,
                num: $scope.num,
                description: $scope.description
            };
            $http({
                method: "POST", 
                url: '/api/add_ban', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add_ban');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
}).controller('Umpire', function ($scope, $http, $location, $window) {
    $scope.umpires = [];
    $http({ method:"GET", url:'/umpire/list_umpire' }).success(function(umpires){
        $scope.umpires = umpires.msg;
    });
    $scope.add_umpire = function(){
        if($scope.umpire != null && $scope.position != null){
            var data = {
                umpire: $scope.umpire, 
                position: $scope.position
            };
            $http({
                method: "POST", 
                url: '/api/add_umpire', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add_umpire');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
}).controller('Broadcast', function ($scope, $http, $location, $window) {
    $scope.broadcasts = [];
    $http({ method:"GET", url:'/broadcast/list_broadcast' }).success(function(broadcasts){
        $scope.broadcasts = broadcasts.msg;
    });
    $scope.add_broadcast = function(){
        if($scope.id != null && $scope.game != null && $scope.type != null && $scope.URL != null){
            var data = {
                id: $scope.id, 
                game: $scope.game,
                type: $scope.type,
                URL: $scope.URL
            };
            $http({
                method: "POST", 
                url: '/api/add_broadcast', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add_broadcast');
            });
        }
        else{
            alert("Fill in all entities!");
        }
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
    $scope.player_add = true;
    $http({ method:"GET", url:'/team/show_team/' + $routeParams.id }).success(function(result){
        var team = result.msg;
        $scope.team_name = team.team_name;
    });
    $http({ method:"GET", url:'/player/list_player/' + $routeParams.id }).success(function(result){
        console.log(result.msg);
        $scope.players = result.msg;
    });
    $scope.enumOptions = ['P', 'C', "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"];
    $scope.enumOptions2 = ['L', 'R'];
    $scope.leagues = [];
    $http({ method:"GET", url:'/team/team_league/' + $routeParams.id }).success(function(result){
        $scope.par_leagues = result.msg;
        $http({ method:"GET", url:'/league/list_league' }).success(function(leagues){
            $scope.leagues = leagues.msg;
            var temp = [];
            _.map($scope.leagues, function(league){
                if( _.pluck($scope.par_leagues, 'league_id').indexOf(league.league_id) == -1 ){ 
                    temp.push(league);
                }
            });
            $scope.leagues = temp;
        });
    });    
    $scope.add_to_league = function(){
        if($scope.add_league != null){
            $http({ method:"POST", url:'/team/add_to_league/' + $routeParams.id + '/' + $scope.add_league }).success(function(result){
                $window.location.reload();
            });
        }
        else{
            alert("Select league to enter");
        }        
    }
    $scope.add_player = function(){
        if(($scope.player_name != null)&&($scope.position != null)){
            var data = {
                player_name: $scope.player_name, 
                team_id: $routeParams.id, 
                position: $scope.position, 
                age: $scope.age, 
                height: $scope.height, 
                weight: $scope.weight, 
                batting: $scope.batting   
            };
            $http({ method:"POST", url:'/player/add_player', data: data}).success(function(result){
                $window.location.reload();
            });        
        }
        else{
            alert("Fill in name team position");
        }
        
    }
    $scope.reveal_add_player = function(){
        $scope.player_add = !($scope.player_add);
    }
}).controller('Game', function ($scope, $http, $location, $window, $routeParams) {
    $scope.leagues = [];
    $scope.games = [];
    $scope.league_pick = true;
    $http({ method:"GET", url:'/league/list_league' }).success(function(leagues){
        $scope.leagues = leagues.msg;
    });    
    $http({ method:"GET", url:'/game/list_game' }).success(function(result){
        $scope.games = result.msg;
    });
    $scope.league_change = function(){
        $scope.league_pick = false;
        $http({ method:"GET", url:'/team/list_team_by_league/' + $scope.in_league }).success(function(teams){
            $scope.teams = teams.msg;
        });            
    }
    $scope.add_game = function(){
        if($scope.home_team == $scope.away_team){
            alert("Teams should be different!");
        }
        else if($scope.home_team != null && $scope.away_team != null && 
            $scope.home_team_score != null  && $scope.away_team_score != null){
            var data = {
                league_id: $scope.in_league,
                home_team_id: $scope.home_team,
                away_team_id: $scope.away_team,
                field_id: $scope.field,
                broadcast_id: $scope.broadcast,
                home_team_score: $scope.home_team_score,
                away_team_score: $scope.away_team_score
            };
            $http({
                method: "POST", 
                url: '/game/add_game', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/Game');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.view = function(id){
        $location.path('/league/'+id);
    }
});
