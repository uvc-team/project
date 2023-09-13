const Sequelize = require("sequelize");

class FullNotice extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        noticeId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        readCount: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "FullNotice",
        tableName: "fullNotices",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //권한이 있는 유저는 여러 전체공지를 쓸수있다
    db.FullNotice.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        onDelete: "CASCADE",
        as: "User",
      },
    });
    // 전체공지는 전체공지권한을 가진 사용자에 의해 작성
    db.FullNotice.belongsTo(db.FullNoticeAuthority, {
      foreignKey: {
        name: "fnauthorityId",
        onDelete: "SET NULL",
        as: "FullNoticeAuthority",
      },
    });
    //전체공지엔 여러 답글이 달린다
    db.FullNotice.hasMany(db.Answer, {
      foreignKey: {
        name: "noticeId",
        onDelete: "CASCADE",
        as: "Answer",
      },
    });
  }
}

module.exports = FullNotice;
