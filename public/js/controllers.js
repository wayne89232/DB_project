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
    $http({ method:"GET", url:'/team/list_team' }).success(function(teams){
        $scope.teams = teams.msg;
    });
    $http({ method:"GET", url:'/league/list_league' }).success(function(leagues){
        $scope.leagues = leagues.msg;
    });    
    $http({ method:"GET", url:'/game/list_game' }).success(function(result){
        $scope.games = result.msg;
        var game_stat = [];
        _.map($scope.games, function(game){
            var arr = [];
            arr.push(game);
            arr.push( _.find($scope.teams, function(go){ return  go.team_id == game.home_team_id; }));
            arr.push( _.find($scope.teams, function(go){ return  go.team_id == game.away_team_id; }));
            game_stat.push(arr);
        });
        $scope.games = game_stat;
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
        $location.path('/game/'+id);
    }
}).controller('game_stat', function ($scope, $http, $location, $window, $routeParams) {
    $scope.enumOptions = ['P', 'C', "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"];
    $scope.hide_stat = true;
    $scope.add_stat = true;
    $http({ method:"GET", url:'/game/show_game/' + $routeParams.id }).success(function(result){
        $scope.game = result.msg;
        $http({ method:"GET", url:'/team/show_team/' + $scope.game.home_team_id }).success(function(result){
            $scope.home_team = result.msg;
            $http({ method:"GET", url:'/player/list_player/' + $scope.game.home_team_id }).success(function(result2){
                $scope.home_players = result2.msg;
            });
        });
        $http({ method:"GET", url:'/team/show_team/' + $scope.game.away_team_id }).success(function(result){
            $scope.away_team = result.msg;
            $http({ method:"GET", url:'/player/list_player/' + $scope.game.away_team_id }).success(function(result2){
                $scope.away_players = result2.msg;
            });
        });
    }); 
    $scope.stats = function(id){
        $scope.add_stat = true;
        $scope.cur_player = id;
        if($scope.hide_stat == true){
            $http({ method:"GET", url:'/records/show_stat/' + $scope.cur_player+'/'+$routeParams.id }).success(function(result){
                $scope.stat_bf = result.msg;
            });
            $http({ method:"GET", url:'/records/show_stat2/' + $scope.cur_player+'/'+$routeParams.id }).success(function(result){
                $scope.stat_p = result.msg;
            });                    
        }
        $scope.hide_stat = !($scope.hide_stat);
    }
    $scope.stats2 = function(id){
        $scope.hide_stat = true;
        $scope.cur_player = id;
        if($scope.add_stat == true){
            $http({ method:"GET", url:'/records/show_stat/' + $scope.cur_player+'/'+$routeParams.id }).success(function(result){
                if(result.msg != "No record"){
                    $scope.stat_bf = result.msg;
                }
            });
            $http({ method:"GET", url:'/records/show_stat2/' + $scope.cur_player+'/'+$routeParams.id }).success(function(result){
                if(result.msg != "No record"){
                    $scope.stat_p = result.msg;
                }
            });                  
        }
        $scope.add_stat = !($scope.add_stat);
    }
    $scope.add_stats = function(){
        if($scope.stat_bf.position != null ){
            var data = {
                position: $scope.stat_bf.position,
                TC: $scope.stat_bf.TC,
                A: $scope.stat_bf.A,
                DP: $scope.stat_bf.DP,
                E: $scope.stat_bf.E,
                PA: $scope.stat_bf.PA,
                H: $scope.stat_bf.H,
                AVG: $scope.stat_bf.AVG,
                BB_HP: $scope.stat_bf.BB_HP,
                HR: $scope.stat_bf.HR,
                RBI: $scope.stat_bf.RBI,
                R: $scope.stat_bf.R,
                SB: $scope.stat_bf.SB,
                PSS: $scope.stat_bf.PSS
            };
            var data2 = {
                IP: $scope.stat_p.IP,
                W: $scope.stat_p.W,
                L: $scope.stat_p.L,
                H2: $scope.stat_p.H2,
                SV: $scope.stat_p.SV,
                BB_HP2: $scope.stat_p.BB_HP2,
                ER: $scope.stat_p.ER
            };
            $http({
                method: "POST", 
                url: '/records/add_stat/' + $scope.cur_player+'/'+$routeParams.id, 
                data: data
            }).then(function(result){
                $http({
                    method: "POST", 
                    url: '/records/add_stat2/' + $scope.cur_player+'/'+$routeParams.id, 
                    data: data2
                }).then(function(result){
                    $window.location.reload();
                });
            });
        }
        else{
            alert("Fill in position!");
        }        
    }  
});