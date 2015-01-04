exports.Coach_team = function(Sequelize, sequelize){
  return sequelize.define('Coach_team', {
    coach_team_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    coach_id: { type: Sequelize.INTEGER }, 
    team_id: { type: Sequelize.INTEGER },
    
  },{
    tableName: 'coach_team'
  });
}