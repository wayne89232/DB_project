
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



