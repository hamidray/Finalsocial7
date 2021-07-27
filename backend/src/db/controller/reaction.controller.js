const Reaction = require("../model/Reaction");
const User = require("../model/User");

exports.react = async (userId, postId, like) =>
  await Reaction.upsert({
    userId,
    postId,
    like,
  });

exports.getAllReactionsOfPost = async (postId) =>
  await Reaction.findAll({
    where: {
      postId,
    },
    include: {
      model: User,
      attributes: [
        "id",
        "email",
        "firstName",
        "lastName",
        "isAdmin",
        "createdAt",
        "updatedAt",
      ],
    },
    attributes: ["id", "like", "createdAt", "updatedAt"],
    order: [["updatedAt", "DESC"]],
  });
