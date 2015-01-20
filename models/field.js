exports.Field = function(Sequelize, sequelize){
  return sequelize.define('Field', {
    field_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    city_id: Sequelize.INTEGER,
    type: {
    	type:   Sequelize.ENUM,
    	values: ['Wooden', 'Jewel box', 'Multi-purpose', 'Modern','Temporary and converted',
        'Indoor', 'Retractable-roof', 'Retro-classic', 'Retro-modern', 'Contemporary']
    }, 
    center_distance: Sequelize.INTEGER
  },{
    tableName: 'field'
  });
}