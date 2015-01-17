var Games = require("../models").Games;

exports.add_game = function(req, res){
	Games.create({
	    league_id: req.params.league,
	    home_team_id: req.body.h_id,
	    away_team_id: req.body.a_id,
	    field_id: req.body.field,
	    broadcast_id: req.body.broadcast,
	    home_team_score:req.body.h_score,
	    away_team_score: req.body.a_score		
	}).then(function(result){
		res.json({ msg: "Success on creating game. Result: " +
		result.home_team_score + " : " + result.away_team_score });
	});
}