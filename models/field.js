exports.Field = function(Sequelize, sequelize){
  return sequelize.define('Field', {
    field_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    city_id: Sequelize.INTEGER,
    type: {
    	type:   Sequelize.ENUM,
    	values: ['type1', 'type2']
    }, 
    center_distance: Sequelize.INTEGER
  },{
    tableName: 'field'
  });
}