var local = require("../setting/db");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
	);
var Team = require('./team').Team(Sequelize,sequelize);
var Umpire = require('./umpire').Umpire(Sequelize,sequelize);
var School = require('./school').School(Sequelize,sequelize);
var Prize = require('./prize').Prize(Sequelize,sequelize);
var Player = require('./player').Player(Sequelize,sequelize);
var Pitching_record = require('./pitching_record').Pitching_record(Sequelize,sequelize);
var League = require('./league').League(Sequelize,sequelize);
var Injury = require('./injury').Injury(Sequelize,sequelize);
var Games = require('./games').Games(Sequelize,sequelize);
var Funder = require('./funder').Funder(Sequelize,sequelize);
var Field = require('./field').Field(Sequelize,sequelize);
var Coach = require('./coach').Coach(Sequelize,sequelize);
var City = require('./city').City(Sequelize,sequelize);
var Broadcast = require('./broadcast').Broadcast(Sequelize,sequelize);
var Ban = require('./ban').Ban(Sequelize,sequelize);
var B_F_record = require('./B_F_record').B_F_record(Sequelize,sequelize);

//add some relations here




exports.Team = Team;
exports.Umpire = Umpire;
exports.School = School;
exports.Prize = Prize;
exports.Player = Player;
exports.Pitching_record = Pitching_record;
exports.League = League;
exports.Injury = Injury;
exports.Games = Games;
exports.Funder = Funder;
exports.Field = Field;
exports.Coach = Coach;
exports.City = City;
exports.Broadcast = Broadcast;
exports.Ban = Ban;
exports.B_F_record = B_F_record;