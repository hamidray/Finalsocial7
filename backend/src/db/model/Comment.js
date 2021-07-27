const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("..");
const Post = require("./Post");
const User = require("./User");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "comment",
    tableName: "comment",
  }
);
Comment.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "CASCADE",
});
Comment.belongsTo(Post, {
  foreignKey: { allowNull: false, name: "postId" },
  onDelete: "CASCADE",
});

module.exports = Comment;
