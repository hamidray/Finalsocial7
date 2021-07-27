const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("..");
const Post = require("./Post");
const User = require("./User");

class Reaction extends Model {}

Reaction.init(
  {
    like: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "reaction",
    tableName: "reaction",
    indexes: [
      {
        unique: true,
        fields: ["userId", "postId"],
      },
    ],
  }
);
Reaction.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "CASCADE",
});
Reaction.belongsTo(Post, {
  foreignKey: { allowNull: false, name: "postId" },
  onDelete: "CASCADE",
});

module.exports = Reaction;
