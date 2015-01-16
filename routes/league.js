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