const Sequelize = require("sequelize");

class Position extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        positionId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        role: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Position",
        tableName: "positions",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //하나의 직급은 여러 유저를 가질수있다
    db.Position.hasMany(db.User, {
      foreignKey: {
        name: "positionId",
        onDelete: "SET NULL",
        as: "User",
      },
    });
    //여러 직급(사장, 매니저)은 전체공지권한이 있다
    db.Position.hasMany(db.FullNoticeAuthority, {
      foreignKey: "positionId",
      onDelete: "CASCADE",
      as: "FullNoticeAuthorities",
    });
  }
}

module.exports = Position;
