exports.B_F_record = function(Sequelize, sequelize){
  return sequelize.define('B_F_record', {
    game_id: { type: Sequelize.INTEGER, primaryKey: true }, 
    player_id: { type: Sequelize.INTEGER, primaryKey: true },
    position: {
      type:   Sequelize.ENUM,
      values: ['P', 'C', "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"]
    },
    TC: Sequelize.INTEGER,
    A: Sequelize.INTEGER,
    DP: Sequelize.INTEGER,
    E: Sequelize.INTEGER,
    PA: Sequelize.INTEGER,
    H: Sequelize.INTEGER,
    AVG: Sequelize.INTEGER,
    BB_HP: Sequelize.INTEGER,
    HR: Sequelize.INTEGER,
    RBI: Sequelize.INTEGER,
    R: Sequelize.INTEGER,
    SB: Sequelize.INTEGER,
    PSS: Sequelize.INTEGER
  },{
    tableName: 'B_F_record'
  });
}