var Games = require("../models").Games;
var Team = require("../models").Team;
var Umpire_game = require("../models").Umpire_game;
var Umpire = require("../models").Umpire;
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
exports.list_game_by_league = function(req, res){
	Games.findAll({ where:{ league_id: req.params.league_id } }).then(function(game){
		games = _.map(game, function(result_t){
			var game_stat = result_t.dataValues;
			return game_stat;
		});
		res.json({ msg: games });
	});
}
exports.show_game = function(req, res){
	Games.find( {where:{ game_id: req.params.game_id} }).then(function(game){
		res.json({ msg: game.dataValues });
	});
}
exports.add_umpire = function(req, res){
	Umpire_game.create({
		umpire_id: req.params.umpire_id,
		game_id: req.params.game_id
	}).then(function(result){
		res.json({msg: "Umpire"+req.params.umpire_id +" add to Game"+ req.params.game_id});
	});
}
exports.remove_umpire = function(req, res){
	Umpire_game.destroy({
		where:{
			umpire_id: req.params.umpire_id,
			game_id: req.params.game_id
		}
	}).then(function(result){
		res.json({msg: "Umpire"+req.params.umpire_id +" remove from Game"+ req.params.game_id});
	});
}
exports.show_umpire = function(req, res){
	Umpire_game.findAll({
		where: {
			game_id: req.params.game_id
		}, 
		include: [Umpire]
	}).then(function(result){
		umpires = _.map(result, function(result){
			return result.dataValues.Umpire.dataValues; 
		});
		res.json({ msg: umpires });
	});
}
exports.list_umpire = function(req, res){
	Umpire.findAll().then(function(result){
		umpires = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: umpires });
	});
}