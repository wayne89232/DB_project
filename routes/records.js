var League = require('../models').League;
var Team = require('../models').Team;
var School = require('../models').School;
var League_team = require('../models').League_team;
var B_F_record = require('../models').B_F_record;
var Pitching_record = require('../models').Pitching_record;
var _ = require('underscore');


exports.add_stat = function(req, res){
	B_F_record.findOrCreate({
		where: {
			game_id: req.params.game_id,
			player_id: req.params.player_id		
		},
		default: {
			game_id: req.params.game_id,
			player_id: req.params.player_id,
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
		}
	}).then(function(result){
		result[0].updateAttributes({
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
			res.json({ msg: "Success on creating record "});	
		});
		
	});
}

exports.show_stat = function(req, res){
	B_F_record.findOrCreate({
		where: {
			game_id: req.params.game_id,
			player_id: req.params.player_id		
		},
		default: {
			game_id: req.params.game_id,
			player_id: req.params.player_id,
		}
	}).then(function(result){
		res.json({msg: result[0].dataValues});
	});	
}

exports.show_stat2 = function(req, res){
	Pitching_record.findOrCreate({
		where: {
			game_id: req.params.game_id,
			player_id: req.params.player_id		
		},
		default: {
			game_id: req.params.game_id,
			player_id: req.params.player_id,
		}
	}).then(function(result){
		res.json({msg: result[0].dataValues})
	});	
}

exports.add_stat2 = function(req, res){
	Pitching_record.findOrCreate({
		where: {
			game_id: req.params.game_id,
			player_id: req.params.player_id		
		},
		default: {
			game_id: req.params.game_id,
			player_id: req.params.player_id,
			IP: req.body.IP,
			W: req.body.W,
			L: req.body.L,
			H: req.body.H,
			SV: req.body.SV,
			BB_HP: req.body.BB_HP,
			ER: req.body.ER	
	}}).then(function(result){
		result[0].updateAttributes({
			IP: req.body.IP,
			W: req.body.W,
			L: req.body.L,
			H: req.body.H,
			SV: req.body.SV,
			BB_HP: req.body.BB_HP,
			ER: req.body.ER			
		}).then(function(){
			res.json({ msg: "Success on creating record "});	
		});
		
	});
}

exports.remove_stat = function(req, res){
	B_F_record.destroy({
		where: {
			player_id: req.params.player_id,
			game_id: req.params.game_id			
		}
	}).then(function(result){
		res.json({msg: "Clear stat!"});
	});
}

exports.remove_stat2 = function(req, res){
	Pitching_record.destroy({
		where: {
			player_id: req.params.player_id,
			game_id: req.params.game_id			
		}
	}).then(function(result){
		res.json({msg: "Clear stat!"});
	});
}