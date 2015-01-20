exports.Games = function(Sequelize, sequelize){
  return sequelize.define('Games', {
    game_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    league_id: Sequelize.INTEGER,
    home_team_id: Sequelize.INTEGER,
    away_team_id: Sequelize.INTEGER,
    field_id: Sequelize.INTEGER,
    home_team_score: Sequelize.INTEGER,
    away_team_score: Sequelize.INTEGER
  },{
    tableName: 'games'
  });
}