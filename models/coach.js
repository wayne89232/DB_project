exports.Coach = function(Sequelize, sequelize){
  return sequelize.define('Coach', {
    coach_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    coach_name: Sequelize.STRING
  },{
    tableName: 'coach'
  });
}