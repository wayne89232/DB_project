exports.Pitching_record = function(Sequelize, sequelize){
  return sequelize.define('Pitching_record', {
    game_id: { type: Sequelize.INTEGER, primaryKey: true }, 
    player_id: { type: Sequelize.INTEGER, primaryKey: true },
    IP: Sequelize.INTEGER,
    W: Sequelize.INTEGER,
    L: Sequelize.INTEGER,
    H: Sequelize.INTEGER,
    SV: Sequelize.INTEGER,
    BB_HP: Sequelize.INTEGER,
    ER: Sequelize.INTEGER
  },{
    tableName: 'pitching_record'
  });
}