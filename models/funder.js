exports.Funder = function(Sequelize, sequelize){
  return sequelize.define('Funder', {
    funder_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    funder_name: Sequelize.STRING,
    industry: Sequelize.STRING,
    address: Sequelize.INTEGER
  },{
    tableName: 'funder'
  });
}