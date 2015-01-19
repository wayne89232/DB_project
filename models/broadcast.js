exports.Broadcast = function(Sequelize, sequelize){
  return sequelize.define('Broadcast', {
    broadcast_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    broadcast_URL: Sequelize.STRING,
  	type: {
    	type:   Sequelize.ENUM,
    	values: ["TV", "Online", "Text", "Broadcast"]
    }
  },{
    tableName: 'broadcast'
  });
}