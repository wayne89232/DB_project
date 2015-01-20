var League = require('../models').League;
var Team = require('../models').Team;
var School = require('../models').School;
var League_team = require('../models').League_team;
var _ = require('underscore');


exports.list_team = function(req, res){
	Team.findAll().then(function(result){
		teams = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: teams });
	});
}

exports.list_team_by_league = function(req, res){
	League_team.findAll({
		where: {
			league_id: req.params.league_id
		}, 
		include: [Team]
	}).then(function(result){
		teams = _.map(result, function(result){
			return result.dataValues.Team.dataValues; 
		});
		res.json({ msg: teams });
	});
}

exports.out_league = function(req, res){
	console.log(req.params.league_id);
	League_team.destroy({
		where: {
			league_id: req.params.league_id,
			team_id: req.params.team_id			
		}
	}).then(function(result){
		res.json({msg: "Get out of league!"});
	});
}

exports.show_team = function(req, res){
	Team.find({ where:{ team_id: req.params.team_id } }).then(function(result){
		res.json({ msg: result.dataValues });
	});
}

exports.add_to_league = function(req, res){
	League_team.create({
		league_id: req.params.league_id,
		team_id: req.params.team_id
	}).then(function(result){
		res.json({msg: "Team"+req.params.team_id +" add to League"+ req.params.league_id});
	});
	
}

exports.team_league = function(req, res){
	League_team.findAll({ 
		where: { team_id: req.params.team_id }, 
		include: [League] 
	}).then(function(result){
		leagues = _.map(result, function(result){
			return result.dataValues.League.dataValues; 
		});
		res.json({msg: leagues });
	});
}

exports.add_team = function(req, res){
	School.find({ where: { school_name: req.body.school } }).then(function(result){
		if(_.size(result) == 0){
			School.create({ 
				school_name: req.body.school
			}).then(function(result2){
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
