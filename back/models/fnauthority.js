const Sequelize = require("sequelize");

class FullNoticeAuthority extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        fnauthorityId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        authority: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "FullNoticeAuthority",
        tableName: "fullNoticeAuthorites",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  //유저는 전체공지 권한이 있을수있고, 없을수있다
  static associate(db) {
    db.FullNoticeAuthority.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        onDelete: "CASCADE",
        as: "User",
      },
    });

    //하나의 전체공지 권한이 어떤 직급에 속하는지
    db.FullNoticeAuthority.belongsTo(db.Position, {
      foreignKey: {
        name: "positionId",
        onDelete: "CASCADE",
        as: "Position",
      },
    });
    //전체공지는 해당하는 전체공지권한을 가진 사용자에 의해 작성
    db.FullNoticeAuthority.hasMany(db.FullNotice, {
      foreignKey: {
        name: "fnauthorityId",
        onDelete: "SET NULL",
        as: "FullNotices",
      },
    });
  }
}

module.exports = FullNoticeAuthority;
