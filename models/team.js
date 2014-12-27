exports.Team = function(Sequelize, sequelize){
  return sequelize.define('Team', {
    team_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    team_name: { type: Sequelize.STRING },
    school_id:Sequelize.INTEGER
  },{
    tableName: 'team'
  });
}