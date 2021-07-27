const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("..");
const User = require("./User");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "post",
    tableName: "post",
  }
);

Post.belongsTo(User, {
  foreignKey: { allowNull: false, name: "userId" },
  onDelete: "CASCADE",
});

module.exports = Post;
