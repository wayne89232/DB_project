exports.Team = function(Sequelize, sequelize){
  return sequelize.define('Team', {
    team_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    team_name: Sequelize.STRING ,
    school_id: Sequelize.INTEGER ,
    coach_name: Sequelize.STRING
  },{
    tableName: 'team'
  });
}