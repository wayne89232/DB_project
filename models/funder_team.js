exports.Funder_team = function(Sequelize, sequelize){
  return sequelize.define('Funder_team', {
    funder_team_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    funder_id: { type: Sequelize.INTEGER }, 
    team_id: { type: Sequelize.INTEGER },
    
  },{
    tableName: 'funder_team'
  });
}