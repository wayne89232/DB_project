var _ = require('underscore');
var Player = require('../models').Player;

exports.add_player = function(req, res){
	Player.create({
		player_name: req.body.player_name, 
		team_id: req.body.team_id, 
		position: req.body.position, 
		age: req.body.age, 
		height: req.body.height, 
		weight: req.body.weight, 
		batting: req.body.batting	
	}).then(function(result){
		res.json({ msg: "Success on adding player " + result.player_name });
	});
}

exports.list_player = function(req, res){
	Player.findAll({ where:{ team_id: req.params.team_id } }).then(function(result){
		_.map(result, function(result){
			return result.dataValues; 
		});
		res.json({ msg: result });
	});
}

// exports.add_player = function(req, res){
// 	Team.find({ where: { team_name: req.body.team } }).then(function(result){
// 		if(_.size(result) == 0){
// 				Player.create({
// 					player_name: req.body.name,
//     				team_id: result.city_id,
// 	    			position: req.body.position,
//     				age: req.body.age,
// 					height: req.body.height,
//     				weight: req.body.weight,
//     				batting: req.body.batting
// 				}).then(function(player){
// 					res.json({ msg: "Success on adding player " + player.player_name });
// 				});
// 		}
// 		else{
// 				res.json({ msg: "Fail on adding player " + player.player_name });
// 		}
// 	});
// }