exports.School = function(Sequelize, sequelize){
  return sequelize.define('School', {
    school_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    school_name: Sequelize.STRING ,
    city_id: Sequelize.INTEGER
  },{
    tableName: 'school'
  });
}