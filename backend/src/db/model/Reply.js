const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("..");
const User = require("./User");
const Comment = require("./Comment");

class Reply extends Model {}

Reply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reply: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "reply",
    tableName: "reply",
  }
);
Reply.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "CASCADE",
});
Reply.belongsTo(Comment, {
  foreignKey: { allowNull: false, name: "commentId" },
  onDelete: "CASCADE",
});

module.exports = Reply;
