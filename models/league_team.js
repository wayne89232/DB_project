exports.League_team = function(Sequelize, sequelize){
  return sequelize.define('League_team', {
    league_team_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    league_id: { type: Sequelize.INTEGER }, 
    team_id: { type: Sequelize.INTEGER },
    
  },{
    tableName: 'league_team'
  });
}