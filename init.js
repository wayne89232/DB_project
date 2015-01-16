var local = require("./setting/db.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
	);

var Team = require('./models').Team;
var Umpire = require('./models').Umpire;
var School = require('./models').School;
var Prize = require('./models').Prize;
var Player = require('./models').Player;
var Pitching_record = require('./models').Pitching_record;
var League = require('./models').League;
var Injury = require('./models').Injury;
var Games = require('./models').Games;
var Funder = require('./models').Funder;
var Field = require('./models').Field;
var Coach = require('./models').Coach;
var City = require('./models').City;
var Broadcast = require('./models').Broadcast;
var Ban = require('./models').Ban;
var B_F_record = require('./models').B_F_record;
var Coach_team =  require('./models').Coach_team;
var Funder_team =  require('./models').Funder_team;
var League_team =  require('./models').League_team;
var Umpire_game =  require('./models').Umpire_game;



Team.sync({force: true});
Umpire.sync({force: true});
School.sync({force: true});
Prize.sync({force: true});
Player.sync({force: true});
Pitching_record.sync({force: true});
League.sync({force: true});
Injury.sync({force: true});
Games.sync({force: true});
Funder.sync({force: true});
Field.sync({force: true});
Coach.sync({force: true});
City.sync({force: true});
Broadcast.sync({force: true});
Ban.sync({force: true});
B_F_record.sync({force: true});
Coach_team.sync({force: true});
Funder_team.sync({force: true});
League_team.sync({force: true});
Umpire_game.sync({force: true});