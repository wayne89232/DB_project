exports.Umpire = function(Sequelize, sequelize){
  return sequelize.define('Umpire', {
    umpire_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    umpire_name: Sequelize.STRING,
  	position: {
    	type:   Sequelize.ENUM,
    	values: ["HP", "1B", "2B", "3B", "LF", "RF"]
    }
  },{
    tableName: 'umpire'
  });
}