'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($scope, $http) {

}).controller('League', function ($scope, $http, $location, $window) {
    $scope.leagues = [];
    $http({ method:"GET", url:'/league/list_league' }).success(function(leagues){
        $scope.leagues = leagues.msg;
        _.map($scope.leagues, function(league){
            $http({ method:"GET", url:'/team/list_team_by_league/' + league.league_id }).success(function(teams){
                league = _.extend(league, {team_num: teams.msg.length});
            });
        });
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
                $location.path('/add_league');
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
    $scope.team_list = [];
    $scope.team_add = true;
    $http({ method:"GET", url:'/team/list_team' }).success(function(teams){
        $scope.team_list = teams.msg;
    });
    $scope.show_add_team = function(){
        $scope.team_add = !($scope.team_add);
    }
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
                $location.path('/add_team');
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
    $http({ method:"GET", url:'/team/list_team_by_league/' + $routeParams.id }).success(function(teams){
        $scope.teams = teams.msg;
    });
    $http({ method:"GET", url:'/league/show_league/' + $routeParams.id }).success(function(result){
        var league = result.msg;
        $scope.league_name = league.league_name;
    });
    $scope.view = function(id){
        $location.path('/team/'+id);
    }
}).controller('show_team', function ($scope, $http, $location, $window, $routeParams) {
    $scope.player_add = true;
    $http({ method:"GET", url:'/team/show_team/' + $routeParams.id }).success(function(result){
        var team = result.msg;
        $scope.team_name = team.team_name;
    });
    $http({ method:"GET", url:'/player/list_player/' + $routeParams.id }).success(function(result){
        // console.log(result.msg);
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
    $scope.out = function(league){
        $http({ method:"GET", url:'/team/out_league/' + $routeParams.id + '/' + league}).success(function(result){
            $window.location.reload();
        });
    }
}).controller('Game', function ($scope, $http, $location, $window, $routeParams) {
    $scope.leagues = [];
    $scope.games = [];    
    $scope.game_add = true;
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
    $scope.show_add_team = function(){
        $scope.game_add = !($scope.game_add);
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
                $scope.stat_bf = result.msg;
            });
            $http({ method:"GET", url:'/records/show_stat2/' + $scope.cur_player+'/'+$routeParams.id }).success(function(result){
                $scope.stat_p = result.msg;
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
    $scope.remove = function(num){
        if(num == 1){
            $http({ method:"GET", url:'/records/remove_stat/' + $scope.cur_player+'/'+$routeParams.id }).success(function(result){
                $window.location.reload();
            });
        }
        else{
            $http({ method:"GET", url:'/records/remove_stat2/' + $scope.cur_player+'/'+$routeParams.id }).success(function(result){
                $window.location.reload();
            });
        }
    }  
}).controller('Add', function ($scope, $http, $location, $window) {
    $scope.current = 0;
    $scope.show = [false, true, true, true, true, true, true, true];
    $scope.league_pick = true;
    $scope.leagues = [];
    $http({ method:"GET", url:'/league/list_league' }).success(function(leagues){
        $scope.leagues = leagues.msg;
    });
    $scope.fields = [];
    $http({ method:"GET", url:'/field/list_field' }).success(function(fields){
        $scope.fields = fields.msg;
    });
    $scope.show_change = function(num){
        if(num != $scope.current){
            $scope.show[$scope.current] = true;
            $scope.show[num] = false;
            $scope.current = num;
        }
    }
    $scope.league_change = function(){
        $scope.league_pick = false;
        $http({ method:"GET", url:'/team/list_team_by_league/' + $scope.in_league }).success(function(teams){
            $scope.teams = teams.msg;
        });            
    }
    $scope.add_league = function(){
        if($scope.league != null && $scope.city0 != null && $scope.year != null ){
            var data = {
                name: $scope.league, 
                city: $scope.city0,
                year: $scope.year
            };
            $http({
                method: "POST", 
                url: '/api/add_league', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.add_team = function(){
        if($scope.team1 != null && $scope.school1 != null){
            var data = {
                name: $scope.team1, 
                school: $scope.school1
            };
            $http({
                method: "POST", 
                url: '/team/add_team', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.add_game = function(){
        if($scope.home_team == $scope.away_team){
            alert("Teams should be different!");
        }
        else if($scope.home_team != null && $scope.away_team != null && 
            $scope.home_team_score != null && $scope.away_team_score != null && $scope.type2 != null && $scope.URL != null){
            var data1 = {
                league_id: $scope.in_league,
                home_team_id: $scope.home_team,
                away_team_id: $scope.away_team,
                field_id: $scope.field,
                home_team_score: $scope.home_team_score,
                away_team_score: $scope.away_team_score
            };
            $http({
                method: "POST", 
                url: '/game/add_game', 
                data: data1
            }).then(function(result){
                var data2 = {
                    game: result.game_id,
                    type: $scope.type2,
                    URL: $scope.URL
                };
                $http({
                method: "POST", 
                url: '/broadcast/add_broadcast', 
                data: data2
                })
            }).then(function(result){
                $window.location.reload();
                $location.path('/add');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.add_city = function(){
        if($scope.city3 != null){
            var data = {
                name: $scope.city3
            };
            $http({
                method: "POST", 
                url: '/api/add_city', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.add_school = function(){
        if($scope.school4 != null){
            var data = {
                name: $scope.school4
            };
            $http({
                method: "POST", 
                url: '/api/add_school', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.add_field = function(){
        if($scope.city5 != null && $scope.type5 != null && $scope.distance != null ){
            var data = {
                city: $scope.city5, 
                type: $scope.type5,
                distance: $scope.distance
            };
            $http({
                method: "POST", 
                url: '/api/add_field', 
                data: data
            }).then(function(result){
                $window.location.reload();
                $location.path('/add');
            });
        }
        else{
            alert("Fill in all entities!");
        }
    }
    $scope.add_ban = function(){
        if($scope.player6 != null && $scope.game6 != null && $scope.num != null && $scope.description != null ){
            var data = {
                player: $scope.player6,
                game: $scope.game6,
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
}).controller('Details', function ($scope, $http, $location, $window) {
    $scope.current = 0;
    $scope.show = [false, true, true, true, true, true];

    $scope.cities = [];
    $http({ method:"GET", url:'/city/list_city' }).success(function(cities){
        $scope.cities = cities.msg;
    });

    $scope.schools = [];
    $http({ method:"GET", url:'/school/list_school' }).success(function(schools){
        $scope.schools = schools.msg;
    });

    $scope.fields = [];
    $http({ method:"GET", url:'/field/list_field' }).success(function(fields){
        $scope.fields = fields.msg;
    });

    $scope.bans = [];
    $http({ method:"GET", url:'/ban/list_ban' }).success(function(bans){
        $scope.bans = bans.msg;
    });

    $scope.umpires = [];
    $http({ method:"GET", url:'/umpire/list_umpire' }).success(function(umpires){
        $scope.umpires = umpires.msg;
    });

    $scope.broadcasts = [];
    $http({ method:"GET", url:'/broadcast/list_broadcast' }).success(function(broadcasts){
        $scope.broadcasts = broadcasts.msg;
    });

    $scope.show_change = function(num){
        if(num != $scope.current){
            $scope.show[$scope.current] = true;
            $scope.show[num] = false;
            $scope.current = num;
        }
    }
});
