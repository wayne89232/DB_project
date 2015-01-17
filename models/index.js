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
var Coach_team = require('./coach_team').Coach_team(Sequelize,sequelize);
var Funder_team = require('./funder_team').Funder_team(Sequelize,sequelize);
var League_team = require('./league_team').League_team(Sequelize,sequelize);
var Umpire_game = require('./umpire_game').Umpire_game(Sequelize,sequelize);

//add some relations here

Team.hasMany(Player, {foreignKey: 'team_id'});
Player.belongsTo(Team, {foreignKey: 'team_id'});
School.hasMany(Team, {foreignKey: 'school_id'});
Team.belongsTo(School, {foreignKey: 'school_id'});
Team.hasMany(Games, {foreignKey: 'team_id'});
Games.belongsTo(Team, {foreignKey: 'home_team_id'});
Team.hasMany(Games, {foreignKey: 'team_id'});
Games.belongsTo(Team, {foreignKey: 'away_team_id'});

Coach.hasMany(Coach_team, {foreignKey: 'coach_id'});
Team.hasMany(Coach_team, {foreignKey: 'team_id'});
Funder.hasMany(Funder_team, {foreignKey: 'funder_id'});
Team.hasMany(Funder_team, {foreignKey: 'team_id'});
League.hasMany(League_team, {foreignKey: 'league_id'});
Team.hasMany(League_team, {foreignKey: 'team_id'});
Umpire.hasMany(Umpire_game, {foreignKey: 'umpire_id'});
Games.hasMany(Umpire_game, {foreignKey: 'game_id'});

City.hasMany(League, {foreignKey: 'league_id'});
League.belongsTo(City, {foreignKey: 'league_id'});
League.hasMany(Prize, {foreignKey: 'league_id'});
Prize.belongsTo(League, {foreignKey: 'league_id'});

Games.hasMany(B_F_record, {foreignKey: 'game_id'});
B_F_record.belongsTo(Games, {foreignKey: 'game_id'});
Games.hasMany(Pitching_record, {foreignKey: 'game_id'});
Pitching_record.belongsTo(Games, {foreignKey: 'game_id'});
Broadcast.hasMany(Games, {foreignKey: 'broadcast_id'});
Games.belongsTo(Broadcast, {foreignKey: 'broadcast_id'});
Field.hasMany(Games, {foreignKey: 'field_id'});
Games.belongsTo(Field, {foreignKey: 'field_id'});

Player.hasMany(Injury, {foreignKey: 'player_id'});
Injury.belongsTo(Player, {foreignKey: 'player_id'});
Player.hasMany(Prize, {foreignKey: 'player_id'});
Prize.belongsTo(Player, {foreignKey: 'player_id'});
Player.hasMany(B_F_record, {foreignKey: 'player_id'});
B_F_record.belongsTo(Player, {foreignKey: 'player_id'});
Player.hasMany(Pitching_record, {foreignKey: 'player_id'});
Pitching_record.belongsTo(Player, {foreignKey: 'player_id'});
Player.hasMany(Ban, {foreignKey: 'player_id'});
Ban.belongsTo(Player, {foreignKey: 'player_id'});

City.hasMany(School, {foreignKey: 'city_id'});
School.belongsTo(City, {foreignKey: 'city_id'});
City.hasMany(Field, {foreignKey: 'city_id'});
Field.belongsTo(City, {foreignKey: 'city_id'});

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
exports.Coach_team = Coach_team;
exports.Funder_team = Funder_team;
exports.League_team = League_team;
exports.Umpire_game = Umpire_game;