var local = require("./setting/db.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
	);


var Team = require('./models/team').Team(Sequelize,sequelize);
var Umpire = require('./models/umpire').Umpire(Sequelize,sequelize);
var School = require('./models/school').School(Sequelize,sequelize);
var Prize = require('./models/prize').Prize(Sequelize,sequelize);
var Player = require('./models/player').Player(Sequelize,sequelize);
var Pitching_record = require('./models/pitching_record').Pitching_record(Sequelize,sequelize);
var League = require('./models/league').League(Sequelize,sequelize);
var Injury = require('./models/injury').Injury(Sequelize,sequelize);
var Games = require('./models/games').Games(Sequelize,sequelize);
var Funder = require('./models/funder').Funder(Sequelize,sequelize);
var Field = require('./models/field').Field(Sequelize,sequelize);
var Coach = require('./models/coach').Coach(Sequelize,sequelize);
var City = require('./models/city').City(Sequelize,sequelize);
var Broadcast = require('./models/broadcast').Broadcast(Sequelize,sequelize);
var Ban = require('./models/ban').Ban(Sequelize,sequelize);
var B_F_record = require('./models/B_F_record').B_F_record(Sequelize,sequelize);



sequelize.sync({force:true}).complete(function(err){
	console.log(err);
});
