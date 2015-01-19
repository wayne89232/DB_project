
var League = require('../models').League;
var Team = require('../models').Team;
var City = require('../models').City;
var School = require('../models').School;
var Player = require('../models').Player;
var Coach = require('../models').Coach;
var Prize = require('../models').Prize;
var Umpire = require('../models').Umpire;
var B_F_record = require('../models').B_F_record;
var Pitching_record = require('../models').Pitching_record;
var Ban = require('../models').Ban;
var Field = require('../models').Field;
var Broadcast = require('../models').Broadcast;
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



exports.add_coach = function(req, res){
	Team.find({ where: { team_name: req.body.team } }).then(function(result){
		if(_.size(result) != 0){
			Coach.create({
				//adding coach team relation not yet
				coach_name: req.body.name
			}).then(function(coach){
				res.json({ msg: "Success on adding Coach " + coach.coach_name });
			});
		}
		else{
			res.json({ msg: "No such team " });
		}
	});
}

exports.add_prize = function(req, res){
	League.find({ where: { league_name: req.body.league } }).then(function(result){
		if(_.size(result) != 0){
			Prize.create({
				prize_name: req.body.name
			}).then(function(prize){
				res.json({ msg: "Success on adding Prize " + prize.prize_name });
			});
		}
		else{
			res.json({ msg: "No such league " });
		}
	});
}

exports.add_umpire = function(req, res){
	Game.find({ where: { game_name: req.body.game } }).then(function(result){
		if(_.size(result) != 0){
			Umpire.create({
				//adding umpire game relation not yet
				umpire_name: req.body.name
			}).then(function(umpire){
				res.json({ msg: "Success on adding Umpire " + umpire.umpire_name });
			});
		}
		else{
			res.json({ msg: "No such Game " });
		}
	});
}

exports.add_B_F_record = function(req, res){
	Game.find({ where: { league_name: req.body.league } }).then(function(result1){
		Player.find({ where: { league_name: req.body.league } }).then(function(result2){
			if(_.size(result1) != 0 && _.size(result2) != 0 ){
				B_F_record.create({
					game_id: result1.game_id, 
					player_id: result2.player_id,
					position: req.body.position,
    				TC: req.body.TC,
    				A: req.body.A,
    				DP: req.body.DP,
    				E: req.body.E,
    				PA: req.body.PA,
    				H: req.body.H,
    				AVG: req.body.AVG,
    				BB_HP: req.body.BB_HP,
    				HR: req.body.HR,
    				RBI: req.body.RBI,
    				R: req.body.R,
    				SB: req.body.SB,
    				PSS: req.body.PSS
				}).then(function(){
					res.json({ msg: "Success on adding B_F_record "});
				});
			}
			else{
				res.json({ msg: "No such game or player " });
			}
		});
	});
}

exports.add_pitching_record = function(req, res){
	Game.find({ where: { league_name: req.body.game } }).then(function(result1){
		Player.find({ where: { league_name: req.body.player } }).then(function(result2){
			if(_.size(result1) != 0 && _.size(result2) != 0 ){
				Pitching_record.create({
					game_id: result1.game_id, 
    				player_id: result2.player_id,
    				IP: req.body.IP,
    				W: req.body.W,
    				L: req.body.L,
    				H: req.body.H,
    				SV: req.body.SV,
    				BB_HP: req.body.BB_HP,
    				ER: req.body.ER
   				}).then(function(){
					res.json({ msg: "Success on adding Pitching_record "});
				});
			}
			else{
				res.json({ msg: "No such game or player " });
			}
		});
	});
}

exports.add_ban = function(req, res){
	Game.find({ where: { league_name: req.body.game } }).then(function(result1){
		Player.find({ where: { league_name: req.body.player } }).then(function(result2){
			if(_.size(result1) != 0 && _.size(result2) != 0 ){
				Ban.create({
					game_id: result1.game_id, 
    				player_id: result2.player_id,
					game_num: req.body.num,
					description: req.body.description
   				}).then(function(){
					res.json({ msg: "Success on adding Ban "});
				});
			}
			else{
				res.json({ msg: "No such game or player " });
			}
		});
	});
}

exports.add_field = function(req, res){
	City.find({ where: { city_name: req.body.city } }).then(function(result){
		if(_.size(result) == 0){
			City.create({ city_name: req.body.city }).then(function(result2){
					Field.create({
						city_id: result2.city_id,
						type: req.body.type, 
						center_distance: req.body.distance
					}).then(function(){
						res.json({ msg: "Success on adding field "});
					});
			});
		}
		else{
			Field.create({
				city_id: result2.city_id,
				type: req.body.type, 
				center_distance: req.body.distance
			}).then(function(){
				res.json({ msg: "Success on adding field "});
			});			
		}
	});

}

exports.list_school = function(req, res){
	School.findAll().then(function(result){
		school = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: school });
	});
}

exports.list_field = function(req, res){
	Field.findAll().then(function(result){
		field = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: field });
	});
}

exports.list_city = function(req, res){
	City.findAll().then(function(result){
		city = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: city });
	});
}

exports.list_ban = function(req, res){
	Ban.findAll().then(function(result){
		ban = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: ban });
	});
}

exports.list_umpire = function(req, res){
	Umpire.findAll().then(function(result){
		umpire = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: umpire });
	});
}

exports.list_broadcast = function(req, res){
	Broadcast.findAll().then(function(result){
		broadcast = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: broadcast });
	});
}