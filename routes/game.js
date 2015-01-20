var Games = require("../models").Games;
var Team = require("../models").Team;
var _ = require('underscore');
var async = require('async');

exports.add_game = function(req, res){
	Games.create({
	    league_id: req.body.league_id,
	    home_team_id: req.body.home_team_id,
	    away_team_id: req.body.away_team_id,
	    field_id: req.body.field_id,
	    home_team_score:req.body.home_team_score,
	    away_team_score: req.body.away_team_score		
	}).then(function(result){
		res.json({ msg: "Success on creating game. Result: " +
		result.home_team_score + " : " + result.away_team_score });
	});
}

exports.list_game = function(req, res){
	Games.findAll().then(function(game){
		games = _.map(game, function(result_t){
			var game_stat = result_t.dataValues;
			return game_stat;
		});
		res.json({ msg: games });
	});
}
exports.show_game = function(req, res){
	console.log(req.params.game_id);
	Games.find( {where:{ game_id: req.params.game_id} }).then(function(game){
		res.json({ msg: game.dataValues });
	});
}


			// var end = false;
			// async.parallel(
			// 	[
			// 		function(callback){
			// 			Team.find({where: { team_id: game_stat.home_team_id }}).then(function(result2){
			// 				callback(null, result2.dataValues);
			// 			});
			// 		},
			// 		function(callback){
			// 			Team.find({where: { team_id: game_stat.away_team_id }}).then(function(result3){
			// 				callback(null, result3.dataValues);
			// 			});
			// 		}
			// 	],
			// 	function(err, result){
			// 		game_rec.push(game_stat);
			// 		game_rec.push(result[0]);
			// 		game_rec.push(result[1]);
			// 		end = true;
			// 	}
			// );
			// while(end == false){console.log(123);};
			// console.log(game_rec);