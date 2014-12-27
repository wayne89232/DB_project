exports.Injury = function(Sequelize, sequelize){
  return sequelize.define('Injury', {
    injury_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    player_id: Sequelize.INTEGER,
    day: Sequelize.INTEGER
  },{
    tableName: 'injury'
  });
}