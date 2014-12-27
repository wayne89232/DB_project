exports.City = function(Sequelize, sequelize){
  return sequelize.define('City', {
    city_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    city_name: Sequelize.STRING
  },{
    tableName: 'city'
  });
}