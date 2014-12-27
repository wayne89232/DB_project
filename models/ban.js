exports.Ban = function(Sequelize, sequelize){
  return sequelize.define('Ban', {
    ban_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    player_id: Sequelize.INTEGER,
    game_id: Sequelize.INTEGER,
    game_num: Sequelize.INTEGER,
  	description: Sequelize.TEXT
  },{
    tableName: 'ban'
  });
}