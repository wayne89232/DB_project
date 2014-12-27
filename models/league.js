exports.League = function(Sequelize, sequelize){
  return sequelize.define('League', {
    league_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    league_name: Sequelize.STRING ,
    city_id: Sequelize.INTEGER, 
    year: Sequelize.INTEGER
  },{
    tableName: 'league'
  });
}