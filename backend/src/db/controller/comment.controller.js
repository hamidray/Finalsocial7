const Comment = require("../model/Comment");
const User = require("../model/User");

exports.addComment = async (userId, postId, comment) =>
  await Comment.create({
    userId,
    postId,
    comment,
  });

exports.getAllCommentsOfPost = async (postId) =>
  await Comment.findAll({
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
    attributes: ["id", "comment", "createdAt", "updatedAt"],
    order: [["updatedAt", "DESC"]],
  });
