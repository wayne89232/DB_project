exports.Umpire_game = function(Sequelize, sequelize){
  return sequelize.define('Umpire_game', {
    umpire_game_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    umpire_id: { type: Sequelize.INTEGER }, 
    game_id: { type: Sequelize.INTEGER },
    
  },{
    tableName: 'umpire_game'
  });
}