
var League = require('../models').League;
var Team = require('../models').Team;
var City = require('../models').City;
var School = require('../models').School;
var Player = require('../models').Player;
var _ = require('underscore');


exports.add_league = function(req, res){
	City.find({ where: { city_name: req.body.city } }).then(function(result){
		if(_.size(result) == 0){
			City.create({ city_name: req.body.city }).then(function(result2){
					League.create({
						league_name: req.body.name,
						city_id: result2.city_id,
						year: req.body.year
					}).then(function(league){
						res.json({ msg: "Success on adding league " + league.league_name });
					});
			});
		}
		else{
				League.create({
					league_name: req.body.name,
					city_id: result.city_id,
					year: req.body.year
				}).then(function(league){
					res.json({ msg: "Success on adding league " + league.league_name });
				});			
		}
	});

}

exports.add_team = function(req, res){
	School.find({ where: { school_name: req.body.school } }).then(function(result){
		if(_.size(result) == 0){
			School.create({ school_name: req.body.school, city_id: req.body.city}).then(function(result2){
				Team.create({
					team_name: req.body.name,
					school_id: result2.school_id
				}).then(function(team){
					res.json({ msg: "Success on adding team " + team.team_name });
				});
			});
		}
		else{
			Team.create({
				team_name: req.body.name,
				school_id: result.school_id
			}).then(function(team){
				res.json({ msg: "Success on adding team " + team.team_name });
			});			
		}
	});
}

exports.add_player = function(req, res){
	Team.find({ where: { team_name: req.body.team } }).then(function(result){
		if(_.size(result) == 0){
				Player.create({
					player_name: req.body.name,
    				team_id: result.city_id,
	    			position: req.body.position,
    				age: req.body.age,
					height: req.body.height,
    				weight: req.body.weight,
    				batting: req.body.batting
				}).then(function(player){
					res.json({ msg: "Success on adding player " + player.player_name });
				});
		}
		else{
				res.json({ msg: "Fail on adding player " + player.player_name });
		}
	});
}