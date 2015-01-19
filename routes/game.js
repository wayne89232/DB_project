var Games = require("../models").Games;
var _ = require('underscore');

exports.add_game = function(req, res){
	Games.create({
	    league_id: req.body.league_id,
	    home_team_id: req.body.home_team_id,
	    away_team_id: req.body.away_team_id,
	    field_id: req.body.field,
	    broadcast_id: req.body.broadcast,
	    home_team_score:req.body.home_team_score,
	    away_team_score: req.body.away_team_score		
	}).then(function(result){
		res.json({ msg: "Success on creating game. Result: " +
		result.home_team_score + " : " + result.away_team_score });
	});
}

exports.list_game = function(req, res){
	Games.findAll().then(function(result){
		games = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: games });
	});
}