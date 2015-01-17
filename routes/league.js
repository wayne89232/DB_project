var League = require('../models').League;
var Team = require('../models').Team;
var City = require('../models').City;
var _ = require('underscore');


exports.list_league = function(req, res){
	League.findAll().then(function(result){
		leagues = _.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: leagues });
	});
}

exports.show_league = function(req, res){
	League.find({ where:{ league_id: req.params.league_id } }).then(function(result){
		res.json({ msg: result.dataValues });
	});
}