

var League = require('../models').League;
var Team = require('../models').Team;



exports.add_league = function(req, res){
	League.create({
		league_name: req.body.name,
		city_id: req.body.city,
		year: req.body.year
	}).then(function(league){
		res.json({ msg: "Success on adding league " + league.league_name });
	});
}

exports.add_team = function(req, res){
	Team.create(req.body).then(function(team){
		//create relations with league    (league_team)
		if(req.body.league == null){
			// League_team.create({
			// 	team_id: team.team_id,
			// 	league_id: req.body.league 
			// }).then(function(lt){
			// 	console.log("Success on adding team" + team.team_name + " to league "+lt.league_id);
			// }).error(function(err){
			// 	console.log(err+": fail on adding team, maybe no league there");
			// });
		}
		else{
			console.log("Success on adding team " + team.team_name + " not in any league");
		}
	});
	res.json({
		team: req.body.name,
		league: req.body.league
	});
}