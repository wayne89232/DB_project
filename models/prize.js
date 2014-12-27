exports.Prize = function(Sequelize, sequelize){
  return sequelize.define('Prize', {
    prize_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    prize_name: Sequelize.STRING ,
    player_id: Sequelize.INTEGER, 
    league_id: Sequelize.INTEGER
  },{
    tableName: 'prize'
  });
}